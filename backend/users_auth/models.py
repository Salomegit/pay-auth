from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.

class UserDetails(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
   
    
    

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)