from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Category, Campaign, Donation, Comment, Profile
from .serializers import *


# AUTH

@api_view(['POST'])
def login_view(request):
    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )

    if not user:
        return Response({'error': 'Invalid credentials'}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    })


@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = User.objects.create_user(
            username=serializer.validated_data['username'],
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )

        Profile.objects.create(user=user)

        return Response({'message': 'Registered successfully'})

    return Response(serializer.errors, status=400)


@api_view(['POST'])
def logout_view(request):
    return Response({'message': 'Logged out'})


# CATEGORY

@api_view(['GET'])
def categories_view(request):
    data = CategorySerializer(Category.objects.all(), many=True)
    return Response(data.data)


# CAMPAIGNS

class CampaignListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = CampaignSerializer(Campaign.objects.all(), many=True)
        return Response(data.data)

    def post(self, request):
        profile = Profile.objects.get(user=request.user)

        if profile.role not in ['manager', 'admin']:
            return Response({'error': 'Only manager can create campaign'}, status=403)

        serializer = CampaignSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


class CampaignDetailView(APIView):
    def get(self, request, pk):
        campaign = Campaign.objects.get(id=pk)
        return Response(CampaignSerializer(campaign).data)

    def put(self, request, pk):
        campaign = Campaign.objects.get(id=pk)
        serializer = CampaignSerializer(campaign, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    def delete(self, request, pk):
        campaign = Campaign.objects.get(id=pk)
        campaign.delete()
        return Response({'message': 'Deleted'})


# DONATION

class DonationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = float(request.data['amount'])
        campaign_id = request.data['campaign']

        profile = Profile.objects.get(user=request.user)
        campaign = Campaign.objects.get(id=campaign_id)

        if profile.balance < amount:
            return Response({'error': 'Not enough balance'}, status=400)

        profile.balance -= amount
        profile.total_donated += amount

        if profile.total_donated >= 50000:
            profile.role = 'manager'

        profile.save()

        campaign.current_amount += amount
        campaign.save()

        Donation.objects.create(
            user=request.user,
            campaign=campaign,
            amount=amount
        )

        return Response({'message': 'Donation successful'})


# COMMENTS

class CommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)

        return Response(serializer.errors)


# PROFILE

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        return Response(ProfileSerializer(profile).data)


# DASHBOARD

@api_view(['GET'])
def top_donors(request):
    profiles = Profile.objects.order_by('-total_donated')[:5]
    data = ProfileSerializer(profiles, many=True)
    return Response(data.data)