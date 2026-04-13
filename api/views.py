from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def login_view(request):
    user = authenticate(
        username=request.data['username'],
        password=request.data['password']
    )

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    })


@api_view(['POST'])
def logout_view(request):
    return Response({'message': 'Logged out'})

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Campaign, Donation
from .serializers import CampaignSerializer, DonationSerializer


class CampaignListCreateView(APIView):
    def get(self, request):
        campaigns = Campaign.objects.all()
        serializer = CampaignSerializer(campaigns, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)
class CampaignListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    

class DonationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors)