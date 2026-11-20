from django.urls import path
from .views import ProfileDetailView, ExperienceListView

urlpatterns = [
    path('profile/', ProfileDetailView.as_view(), name='profile-detail'),
    path('experience/', ExperienceListView.as_view(), name='experience-list'),
]

