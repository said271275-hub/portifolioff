"""
URL Configuration for Football Portfolio.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.utils import timezone

admin.site.site_header = "Portfolio Boshqaruv (Futbol Arena)"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "O'yin Boshqaruv Markazi"


def health_check(request):
    """Backend salomatlik tekshiruvi — /api/health/"""
    return JsonResponse({
        "status": "ok",
        "timestamp": timezone.now().isoformat(),
        "service": "football-portfolio-backend",
        "version": "1.0.0",
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health-check'),
    path('api/', include('apps.profile_app.urls')),
    path('api/', include('apps.projects.urls')),
    path('api/', include('apps.contact.urls')),
    path('api/', include('apps.stats.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
