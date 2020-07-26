from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import UserSerializer, TaskSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import Task

# Create your views here.
class UserCreate(APIView):
    """ 
    Creates the user. 
    """

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                tokenr = TokenObtainPairSerializer().get_token(user)  
                tokena = AccessToken().for_user(user)
                return Response({'access': str(tokenr), 'refresh': str(tokena)}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateTask(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
