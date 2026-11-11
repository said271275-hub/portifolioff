from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_read', 'created_at', 'ip_address')
    list_filter = ('is_read', 'created_at')
    list_editable = ('is_read',)
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('name', 'email', 'message', 'ip_address', 'created_at')

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Tanlangan xabarlarni 'O'qilgan' deb belgilash"

    actions = [mark_as_read]

