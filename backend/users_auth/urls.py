from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    
)

from .views import BuildAccessTokenCookies
from django.urls import path
urlpatterns = [
    path('login/', BuildAccessTokenCookies.as_view(), name='token_obtain'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]