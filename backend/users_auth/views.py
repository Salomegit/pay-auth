
# Create your views here.
from django.shortcuts import render
from django.http import HttpRequest,HttpResponse,JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsNot
from rest_framework.permissions import BasePermission
from .user_serializer import UserRegistrationSerializer
from rest_framework.exceptions import ValidationError

class BuildAccessTokenCookies(TokenObtainPairView):
    def post(self, request, *args,**kwargs):

        try:
            response = super().post(request,*args,**kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            res = Response()

            res.data = {'success':"Successfully logged in",
            
            }

            res.set_cookie(
                key = 'access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key = 'refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )

              # Include CSRF Token
            # csrf_token = get_token(request)
            # res.data['csrf_token'] = csrf_token

            return res
            
        except KeyError as e:
            return Response({'success': False, 'error': str(e)}, status=400)
        except Exception as e:
            return Response({'success': False, 'error': 'Something went wrong'}, status=500)






@api_view(['Post'])
def logout(request):
    try:
        res = Response()
        res.data = {'success':'User is successfully Logged Out'}
        res.delete_cookie('access_token',path='/', samesite='None')
        res.delete_cookie('refresh_token',path='/', samesite='None')
        return res
    except:
        return Response({'success':'User is not logged out'})


# class IsNotAuthenticated(BasePermission):
#     def has_permission(self,request,view):
#         return not request.user.is_authenticated


# @api_view(['POST'])
# @permission_classes([IsNotAuthenticated])
# def is_not_authenticated(request):
#     return Response({ "authenticated":'User is not Authenticated' })

class isNotAuthenticated(BasePermission):
     def has_permission(self, request, view):
        return not request.user.is_authenticated

@api_view(['POST'])
@permission_classes([isNotAuthenticated])
def isnotauthenticated(request):
    return Response({"unautheticated user"})           

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    if IsAuthenticated:

        return Response({ "authenticated":True })


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
       user_data =  serializer.save()
       user_data = {
           "id":user_data.id,
           "username":user_data.username,
           "first_name":user_data.first_name,
           "email":user_data.email,
        }

       return  Response( {'authenticated':'user is created'},status=201)
    
    return Response(serializer.errors,status=400)
class CustomRefreshToken(TokenRefreshView):
    def post(self,request,*args,**kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token
    
            if not refresh_token:
                return Response({'refreshed': False, 'error': 'Refresh token not found'}, status=400)

            response = super().post(request,*args,**kwargs)

            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed':True}

            res.set_cookie(
                key = 'access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )

            print(refresh_token)
            return res


        except ValidationError as e:
            return Response(
                {'refreshed': False, 'error': str(e)}, 
                status=400
            )
        except Exception as e:
            return Response(
                {'refreshed': False, 'error': 'An unexpected error occurred'},
                status=500
            )