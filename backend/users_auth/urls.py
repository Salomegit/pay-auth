from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    
)

from .views import BuildAccessTokenCookies, CustomRefreshToken, logout, is_authenticated,register_user
from django.urls import path
urlpatterns = [
    path('login/', BuildAccessTokenCookies.as_view(), name='token_obtain'),
    path('token/refresh/', CustomRefreshToken.as_view(), name='token_refresh'),
    path('register/',register_user,name='register'),
    path('logout/', logout, name='token_logout'),
    path('authenticated/',is_authenticated, name='is_authenticated'),
    
]