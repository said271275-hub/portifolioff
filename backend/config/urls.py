"""
URL Configuration for Football Portfolio.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Admin panel sarlavhalarini o'zgartirish
admin.site.site_header = "Portfolio Boshqaruv (Futbol Arena)"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "O'yin Boshqaruv Markazi"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.profile_app.urls')),
    path('api/', include('apps.projects.urls')),
    path('api/', include('apps.contact.urls')),
    path('api/', include('apps.stats.urls')),
]

# Lokal serverda media fayllarni ko'rsatish
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

