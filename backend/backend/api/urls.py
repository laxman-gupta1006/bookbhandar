'''urls'''
from django.urls import path
from backend.api.views import *
app_name = 'backend'
urlpatterns = [
    path('booklist/', api_user_details, name='userdetails'),
    path('user_booklist/', api_user_book_details, name='userbookdetails'),
    path('check/', login_check , name='logincheck'),
    path('login/', login_auth , name='login'),
    path('signin/', Signin , name='Signin'),
    path('usercheck/', checkusername , name='usernamecheck'),
    path('useremailcheck/', checkuseremail , name='usernamecheck'),
    path('update/', update , name='update'),
    path('logout/', logout_view , name='logout'),
    path('addbook/', add_book , name='addbook'),
    path('<bookid>/<msg>/addchat/', add_chat , name='chat'),
    path('<bookid>/send_request/', request_book , name='send_request'),
    path('<request_id>/accept_request/', accept_request , name='accept_request'),
    path('your_sended_request/', your_sended_request , name='your_sended_request'),
    path('city/<city>/booklist/',getbooklistbycity ,name='getbooklistbycity'),
    path('college/<college>/booklist/',getbooklistbycollege ,name='getbooklistbycollege'),
    path('send_mail/',send_email ,name='send_mail'),
    path('<ValidationId>/verify_email/',verify_email ,name='send_mail'),
    # path('<bookid>/chat',get_chat,name='getchat')
]