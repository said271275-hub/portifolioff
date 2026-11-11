from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle
from django.utils import timezone
from datetime import timedelta
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from .telegram_service import send_telegram_notification

class ContactRateThrottle(AnonRateThrottle):
    rate = '5/hour'

class ContactMessageCreateView(APIView):
    """
    POST /api/contact/
    Sayt tashrif buyuruvchisi yuborgan xabarni qabul qilish.
    - Rate limit: bitta IP dan 1 soatda eng ko'pi bilan 5 ta xabar.
    - Honeypot spamdan himoyasi.
    - Telegram botga bildirishnoma.
    """
    throttle_classes = [ContactRateThrottle]

    def post(self, request):
        # Tashrif buyuruvchining IP manzilini aniqlash
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')

        # Qo'shimcha qattiq tekshiruv: oxirgi 1 soatda ushbu IP dan nechta xabar kelgan
        one_hour_ago = timezone.now() - timedelta(hours=1)
        recent_count = ContactMessage.objects.filter(ip_address=ip, created_at__gte=one_hour_ago).count()
        if recent_count >= 5:
            return Response(
                {
                    "error": "Siz bir soatda juda ko'p xabar yubordingiz. Iltimos, hakam hushtagini kuting (1 soatdan so'ng qayta urinib ko'ring)."
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            # Honeypot maydonini chiqarib tashlab saqlaymiz
            data = serializer.validated_data
            data.pop('honeypot', None)
            
            contact_msg = ContactMessage.objects.create(
                name=data['name'],
                email=data['email'],
                message=data['message'],
                ip_address=ip
            )

            # Telegram xabarnomasini yuboramiz (xato bersa ham foydalanuvchiga muammo tug'dirmaydi)
            send_telegram_notification(
                name=contact_msg.name,
                email=contact_msg.email,
                message_text=contact_msg.message
            )

            return Response(
                {
                    "success": True,
                    "message": "Xabar yuborildi, gol! ⚽ Sizning xabaringiz jamoa shtabiga muvaffaqiyatli yetkazildi."
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

