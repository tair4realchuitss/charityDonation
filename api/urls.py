from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_view),
    path('register/', register_view),
    path('logout/', logout_view),

    path('categories/', categories_view),

    path('campaigns/', CampaignListCreateView.as_view()),
    path('campaigns/<int:pk>/', CampaignDetailView.as_view()),

    path('donations/', DonationView.as_view()),
    path('comments/', CommentView.as_view()),

    path('profile/', ProfileView.as_view()),
    path('top-donors/', top_donors),
]