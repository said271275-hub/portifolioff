from django.urls import path
from .views import VisitRecordView, StatsSummaryView

urlpatterns = [
    path('visit/', VisitRecordView.as_view(), name='record-visit'),
    path('stats/', StatsSummaryView.as_view(), name='stats-summary'),
]

