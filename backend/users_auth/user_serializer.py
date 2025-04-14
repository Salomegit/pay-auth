from rest_framework import serializers
from .models import UserDetails
import uuid


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model=UserDetails
        fields = ['username','email','password','id']
        read_only_fields = ['id']

    def create(self, validated_data):
        user = UserDetails (
            username = validated_data['username'],
            email = validated_data['email'],
        
            id = str(uuid.uuid4()) 

        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def validate_email(self, value):
        if UserDetails.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value