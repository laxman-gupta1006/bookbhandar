''' views '''
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from books_details.models import BookDetails
from backend.api.serializers import BookDetailsSerializer, UserdetailsSerializer, BookStatusSerializer , BookRequestSerializer
from userinfo.models import Userinfo
from django.views.decorators.csrf import csrf_protect,csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from books_details.models import BookDetails, BookStatus ,BookRequest
from datetime import datetime
import uuid
from collections import defaultdict
from django.db.models import Q
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from emailvalidation.models import EmailValidation
from django.template.loader import render_to_string
from django.utils.html import strip_tags
@api_view(['GET'])
def api_user_details(request):
    ''' Book list'''
    data = []
    if request.user.is_authenticated:
        username=request.user.username
    else:
        username=''
    try:
        userinfo = BookDetails.objects.all().filter(availibility=True).filter(~Q(user_name=username)).order_by('-time')
    except Exception:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        for x in userinfo:
            serializer = BookDetailsSerializer(x)
            data.append(serializer.data)
        return Response(data)
@api_view(['GET'])
def getbooklistbycity(request,city):
    data = []
    if request.user.is_authenticated:
        username=request.user.username
        userdet=Userinfo.objects.get(user_name=username)
        city=userdet.city.upper()
    else:
        username=''
    try:
        userinfo = BookDetails.objects.all().filter(availibility=True,city__contains=city.upper()).filter(~Q(user_name=username)).order_by('-time')
    except Exception:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        for x in userinfo:
            serializer = BookDetailsSerializer(x)
            data.append(serializer.data)
        return Response(data)

@api_view(['GET'])
def getbooklistbycollege(request,college):
    data = []
    if request.user.is_authenticated:
        username=request.user.username
        userdet=Userinfo.objects.get(user_name=username)
        college=userdet.college_name.upper().strip()
    else:
        username=''
    try:
        userinfo = BookDetails.objects.all().filter(availibility=True,college__contains=college).filter(~Q(user_name=username)).order_by('-time')
    except Exception:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        for x in userinfo:
            serializer = BookDetailsSerializer(x)
            data.append(serializer.data)
        return Response(data)


@api_view(['GET'])
@login_required(login_url='http://127.0.0.1/login')
def api_user_book_details(request):
    ''' Book list'''
    data = []
    bookstatus = []
    try:
        userinfo = BookDetails.objects.filter(
            user_name=request.user.username).all().order_by('-time')
    except Exception:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        for x in userinfo:
            y = BookStatus.objects.get(book_id=x.book_id)
            bookstat = BookStatusSerializer(y)
            serializer = BookDetailsSerializer(x)
            data.append({'bookdetails': serializer.data,
                         'status': bookstat.data})
        return Response(data)

@api_view(['POST'])
@csrf_exempt
def login_auth(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            # A backend authenticated the credentials
            login(request, user)
            userdetails = Userinfo.objects.get(user_name=username)
            serializer = UserdetailsSerializer(userdetails)
            return Response({'user': 'exist', 'password': 'valid', 'userdetails': serializer.data})
        else:
            return JsonResponse({'user': 'invalid', 'password': 'invalid'})

@api_view(['GET'])
def login_check(request):
    if request.user.is_authenticated:
        userdetails = Userinfo.objects.get(user_name=request.user.username)
        serializer = UserdetailsSerializer(userdetails)
        return Response({'logged': True,'userdetails': serializer.data})
    else:
        return Response({'logged': False,'userdetails': {}})

@api_view(['POST'])
def Signin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        passw = request.POST.get('password')
        email = request.POST.get('email')
        fullname = request.POST.get('fullname')
        college = request.POST.get('college_name')
        city = request.POST.get('city')
        country = request.POST.get('country')
        User.objects.create_user(
            username=username, password=passw, email=email).save()
        Userinfo.objects.create(
            user_name=username, full_name=fullname, user_email=email, college_name=college, city=city, country=country , varified_user=False).save()
        print('Executed till here')
        return Response({'status': 'created'})


@api_view(['POST'])
def checkusername(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        try:
            User.objects.get(username=username)
            return Response({'status': 'exist'})
        except User.DoesNotExist:
            return Response({'status': 'notexist'})

@api_view(['POST'])
def checkuseremail(request):
    if request.method == 'POST':
        useremail = request.POST.get('useremail')
        try:
            User.objects.get(email=useremail)
            return Response({'status': 'exist'})
        except User.DoesNotExist:
            return Response({'status': 'notexist'})


@api_view(['POST'])
@csrf_protect
@login_required(login_url='http://127.0.0.1/login')
def update(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            username = request.user.username
            try:
                q = Userinfo.objects.get(user_name=username)
            except Userinfo.DoesNotExist:
                return Response({'status': 'unsuccessfull'})
            q.full_name = request.POST.get('fullname')
            q.city = request.POST.get('city').strip()
            q.college_name = request.POST.get('collegename').strip()
            q.country = request.POST.get('country').strip()
            if request.FILES.get('profileimg') is not None:
                q.profile_img = request.FILES.get('profileimg')
            q.save()
            serializer = UserdetailsSerializer(q)
            return Response({'user': 'exist', 'password': 'valid', 'userdetails': serializer.data})

@login_required(login_url='http://127.0.0.1:8000/login')
@api_view(['GET'])
def logout_view(request):
    try:
        logout(request)
        return Response({'Logout':'successfull'})
    except:
        return Response({'Logout':'unsuccessfull'})


@login_required(login_url='http://127.0.0.1:8000/login')
@api_view(['POST'])
def add_book(request):
    if request.user.is_authenticated:
        username = request.user.username
        q = Userinfo.objects.get(user_name=username)
        bookname = request.POST.get("bookname")
        about = request.POST.get("about")
        category = request.POST.get("category")
        price = request.POST.get("price")
        bookimg = request.FILES.get('bookimg')
        x = BookDetails.objects.create(book_id=uuid.uuid4().hex, book_name=bookname, user_name=username, city=q.city.upper().strip(), time=datetime.now(
        ), book_img=bookimg, about=about, college=q.college_name.upper().strip(),availibility='True')
        p = BookStatus.objects.create(
            book_id=x, sold_to_username='none')
        p.save()
        return Response({'book': 'added'})


@login_required(login_url='http://127.0.0.1:8000/login')
@api_view(['GET'])
def add_chat(request, bookid, msg):
    if request.user.is_authenticated:
        q = BookStatus.objects.get(book_id=bookid)
        if q.chats is None:
            q.chats = {}
            q.save()
        q.chats[str(datetime.now())] = [request.user.username, msg]
        q.save()
        return Response({'update': 'done'})

@login_required(login_url='http://127.0.0.1:8000/login')
@api_view(['GET'])
def request_book(request,bookid):
    if request.user.is_authenticated:
        q = BookRequest()
        q.user_name = request.user.username
        q.requested_book_id = bookid
        q.time=datetime.now()
        request_id=uuid.uuid4()
        q.request_id=str(request_id)
        q.save()
        p = BookStatus.objects.get(book_id=bookid)
        if p.requests == None:
            p.requests={}
            p.save()
        try:
            x=p.requests[request.user.username]
            return Response({'Request': 'already'})
        except Exception:
            p.requests[request.user.username] = [str(datetime.now()),str(request_id)]
        p.save()
        return Response({'Request': 'sended'})
    else:
        return Response({'Request':'NotLogged'})

@login_required(login_url='http://127.0.0.1:8000/login')
@api_view(['GET'])
def accept_request(request,request_id):
    if request.user.is_authenticated:
        q=BookRequest.objects.get(request_id=request_id)
        q.accepted=True
        q.save()
        p=BookStatus.objects.get(book_id=q.requested_book_id)
        p.accepted_request_id=request_id
        p.sold_to_username=q.user_name
        p.save()
        r=BookDetails.objects.get(book_id=q.requested_book_id)
        r.availibility=False
        r.save()
        return Response({'Request': 'Accepted'})
@login_required(login_url='http://127.0.0.1:8000/login')
@api_view(['GET'])
def your_sended_request(request):
    if request.user.is_authenticated:
        serreq=[]
        req = BookRequest.objects.filter(user_name=request.user.username)
        for x in req:
            reqdet=BookRequestSerializer(x).data
            y=BookDetails.objects.get(book_id=reqdet['requested_book_id'])
            bookdet=BookDetailsSerializer(y).data
            y = BookStatus.objects.get(book_id=reqdet['requested_book_id'])
            bookstat = BookStatusSerializer(y).data
            serreq.append({'request_details':reqdet,'request_book_details':bookdet,'status':bookstat})
        return Response(serreq)
from django.core import mail
from emailvalidation.models import EmailValidation
@api_view(['GET'])
@login_required(login_url='http://127.0.0.1:8000/login')
def send_email(request):
    user=Userinfo.objects.get(user_name=request.user.username)
    email=user.user_email
    vid=uuid.uuid4().hex
    EmailValidation.objects.create(ValidationId=vid,Email=email)
    link="127.0.0.1:8000/api/"+str(vid)+"/verify_email"
    print(link)
    html_message = render_to_string('VerificationEmailTemplate.html', {'name': 'Laxman','link':link})
    plain_message = strip_tags(html_message)
    email1 = EmailMultiAlternatives(
    'Varification Email',
    plain_message,
    settings.EMAIL_HOST_USER,
    [email],
    )
    email1.attach_alternative(html_message, "text/html")
    email1.send() 
    return Response({'Email':'Sended'})

@api_view(['GET'])
def verify_email(request,ValidationId):
    if request.method=='GET':
        try:
            q=EmailValidation.objects.get(ValidationId=ValidationId)
            email=q.Email
            x=Userinfo.objects.get(user_email=email)
            x.varified_user=True
            x.save()
            q.delete()
            return Response({'Email':'VerificationConfirm'})
        except:
            return Response({'Email':'NotVerified'})