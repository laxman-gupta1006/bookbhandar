''' models '''
from django.db import models
import os
# from django.conf import settings
def upload_rename(instance,filename):
    exe=filename.split('.')[-1]
    filename=instance.user_name+'.'+exe
    try:
        os.remove(os.path.join('images','profile_image',instance.user_name,filename))
    except:
        pass
    return os.path.join('profile_image',instance.user_name,filename)

class Userinfo(models.Model):
    ''' User info '''
    user_name = models.CharField(max_length=30, unique=True, null=False,primary_key=True)
    full_name = models.CharField(max_length=50, null=False)
    user_email = models.EmailField(max_length=254,unique=True)
    college_name = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    profile_img = models.ImageField(upload_to=upload_rename, blank=True)
    varified_user =models.BooleanField(default=False)


