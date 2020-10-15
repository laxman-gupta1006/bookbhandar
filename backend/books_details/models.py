'''models '''
from django.db import models
from userinfo.models import Userinfo
import os
# Create your models here.

# from django.conf import settings


def bookimage(instance, filename):
    exe = filename.split('.')[-1]
    filename = instance.book_id+'.'+str(exe)
    return os.path.join('book_img', instance.user_name, filename)


class BookDetails(models.Model):
    ''' Book details '''
    book_id = models.CharField(primary_key=True, unique=True, max_length=120)
    book_name = models.CharField(max_length=100)
    user_name = models.CharField(max_length=30)
    city = models.CharField(max_length=60)
    time = models.DateTimeField()
    about = models.TextField()
    book_img = models.ImageField(upload_to=bookimage)
    college= models.CharField(max_length=60)
    availibility = models.BooleanField(default=True)
class BookStatus(models.Model):
    book_id = models.OneToOneField(
        BookDetails,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    sold_to_username = models.CharField(max_length=30,primary_key=False)
    accepted_request_id = models.CharField(max_length=100,primary_key=False,null=True)
    chats = models.JSONField(null=True)
    requests = models.JSONField(null=True)

class BookRequest(models.Model):
    request_id = models.CharField(primary_key=True,max_length=100)
    user_name = models.CharField(max_length=60)
    requested_book_id = models.CharField(null=True,max_length=60)
    time = models.DateTimeField()
    accepted = models.BooleanField(default=False)