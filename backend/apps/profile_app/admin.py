from django.contrib import admin
from .models import Profile, Experience

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'role', 'jersey_number', 'city', 'email', 'telegram')
    fieldsets = (
        ("Asosiy Ma'lumotlar", {
            'fields': ('full_name', 'age', 'city', 'role', 'jersey_number', 'team_badge')
        }),
        ("Bio va Imzo", {
            'fields': ('bio', 'signature_text', 'avatar', 'cv_file')
        }),
        ("Statistika va Qobiliyatlar (JSON)", {
            'fields': ('skills', 'languages', 'interests')
        }),
        ("Kontaktlar", {
            'fields': ('telegram', 'github', 'email', 'linkedin')
        }),
    )

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'place', 'start', 'end', 'role_type', 'order')
    list_editable = ('order',)
    list_filter = ('role_type',)
    search_fields = ('title', 'place', 'description')

