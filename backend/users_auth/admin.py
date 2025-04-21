from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserDetails

@admin.register(UserDetails)
class CustomUserAdmin(UserAdmin):
    model = UserDetails
    list_display = ['username', 'email', 'is_staff', 'is_active']
    search_fields = ['username', 'email']
    ordering = ['username']
# Register your models here.
