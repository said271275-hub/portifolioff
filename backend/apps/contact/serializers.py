from rest_framework import serializers
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Aloqa xabari serializatori.
    Spam botlarga qarshi 'honeypot' maydoni bilan himoyalangan.
    """
    # Honeypot: inson bu maydonni ko'rmaydi va to'ldirmaydi, avtomat botlar esa to'ldiradi
    honeypot = serializers.CharField(required=False, write_only=True, allow_blank=True)

    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'honeypot', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        val = value.strip()
        if len(val) < 2:
            raise serializers.ValidationError("Ism kamida 2 ta belgidan iborat bo'lishi kerak.")
        return val

    def validate_message(self, value):
        val = value.strip()
        if len(val) < 5:
            raise serializers.ValidationError("Xabar matni kamida 5 ta belgidan iborat bo'lishi kerak.")
        return val

    def validate(self, attrs):
        # Agar bot honeypot maydonini to'ldirgan bo'lsa
        if attrs.get('honeypot'):
            raise serializers.ValidationError({"honeypot": "Spam bot aniqlandi!"})
        return attrs

