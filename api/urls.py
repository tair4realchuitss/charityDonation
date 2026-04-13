from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_view),
    path('logout/', logout_view),
    path('campaigns/', CampaignListCreateView.as_view()),
    path('donate/', DonationView.as_view()),
]