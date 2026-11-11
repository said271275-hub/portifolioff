from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'stars_count', 'is_pinned', 'is_hidden', 'order', 'live_url', 'created_at')
    list_filter = ('is_pinned', 'is_hidden')
    list_editable = ('is_pinned', 'is_hidden', 'order', 'stars_count')
    search_fields = ('title', 'description', 'tech')
    fieldsets = (
        ("Asosiy Ma'lumotlar", {
            'fields': ('title', 'description', 'tech', 'stars_count')
        }),
        ("Havolalar va Media", {
            'fields': ('live_url', 'github_url', 'image', 'custom_screenshot_url')
        }),
        ("Boshqaruv Sozlamalari", {
            'fields': ('is_pinned', 'is_hidden', 'order')
        }),
    )

