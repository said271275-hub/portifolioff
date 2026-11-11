from django.contrib import admin
from .models import Visit

@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ('path', 'ip_address', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('path', 'ip_address', 'user_agent')
    readonly_fields = ('path', 'ip_address', 'user_agent', 'created_at')

