from django.urls import path
from .views import ProjectCombinedListView

urlpatterns = [
    path('projects/', ProjectCombinedListView.as_view(), name='project-list'),
]

