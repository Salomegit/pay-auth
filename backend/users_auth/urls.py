from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    
)

from .views import BuildAccessTokenCookies, CustomRefreshToken, logout, is_authenticated
from django.urls import path
urlpatterns = [
    path('login/', BuildAccessTokenCookies.as_view(), name='token_obtain'),
    path('token/refresh/', CustomRefreshToken.as_view(), name='token_refresh'),
    path('logout/', logout, name='token_logout'),
    path('is_authenticated/',is_authenticated, name='is_authenticated')
    
]