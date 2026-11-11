from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from .models import Visit
from apps.projects.models import Project
from apps.contact.models import ContactMessage

class VisitRecordView(APIView):
    """
    POST /api/visit/
    Har gal foydalanuvchi sahifaga kirganda tashrifni xotiraga yozadi.
    """
    def post(self, request):
        path = request.data.get('path', '/')
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')

        user_agent = request.META.get('HTTP_USER_AGENT', '')

        Visit.objects.create(
            path=path,
            ip_address=ip,
            user_agent=user_agent[:500] if user_agent else ''
        )

        return Response({"status": "recorded"}, status=status.HTTP_201_CREATED)


class StatsSummaryView(APIView):
    """
    GET /api/stats/
    Stadion tablosi uchun umumiy statistik ko'rsatkichlar.
    """
    def get(self, request):
        now = timezone.now()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

        total_fans = Visit.objects.count()
        today_fans = Visit.objects.filter(created_at__gte=today_start).count()
        total_projects = Project.objects.filter(is_hidden=False).count()
        total_messages = ContactMessage.objects.count()

        return Response({
            "total_visits": max(total_fans, 142), # Chiroyli stadion hisobi
            "today_visits": today_fans,
            "total_projects": total_projects,
            "total_messages": total_messages,
            "stadium_capacity": "55,000",
            "atmosphere": "100% Elektr"
        }, status=status.HTTP_200_OK)

