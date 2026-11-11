from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    """
    Loyiha (Match card) serializatori.
    Agar maxsus rasm yuklanmagan bo'lsa, live_url asosida
    https://image.thum.io/get/{live_url} orqali skrinshot manzilini shakllantiradi.
    """
    image_url = serializers.SerializerMethodField()
    screenshot_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'tech',
            'live_url',
            'github_url',
            'image',
            'image_url',
            'custom_screenshot_url',
            'screenshot_url',
            'stars_count',
            'is_pinned',
            'is_hidden',
            'order',
            'created_at',
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    def get_screenshot_url(self, obj):
        if obj.custom_screenshot_url:
            return obj.custom_screenshot_url
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        if obj.live_url:
            return f"https://image.thum.io/get/{obj.live_url}"
        return None

