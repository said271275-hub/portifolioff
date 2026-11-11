from rest_framework import serializers
from .models import Profile, Experience

class ProfileSerializer(serializers.ModelSerializer):
    """
    Profil ma'lumotlarini JSON formatiga o'tkazish.
    CV va Avatar URL manzillarini to'liq formatda taqdim etadi.
    """
    cv_url = serializers.SerializerMethodField()
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'full_name',
            'age',
            'city',
            'role',
            'jersey_number',
            'team_badge',
            'bio',
            'skills',
            'languages',
            'interests',
            'telegram',
            'github',
            'email',
            'linkedin',
            'cv_file',
            'cv_url',
            'avatar',
            'avatar_url',
            'signature_text',
        ]

    def get_cv_url(self, obj):
        if obj.cv_file:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.cv_file.url) if request else obj.cv_file.url
        return None

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.avatar.url) if request else obj.avatar.url
        return None


class ExperienceSerializer(serializers.ModelSerializer):
    """
    Tajriba / Ta'lim (Mavsumlar) serializatori
    """
    class Meta:
        model = Experience
        fields = '__all__'

