"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from .views import *
# from backend.api.views import logout_view
from django.conf.urls.static import static
from django.conf.urls import url
from django.conf import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.api.urls', 'api')),
    # path('logout/', logout_view , name='logout')
    # path('',index,name='index')
]
# urlpatterns += static(settings.MEDIA_URL,document_root= settings.MEDIA_ROOT)
urlpatterns += [
    path('', index, name='index'),
    path('login/', index, name='index'),
    path('signin/', index, name='index'),
    path('addbook/', index, name='index'),
     path('account/', index, name='index'),
    # path('account/profile/', index, name='index'),
    # path('account/yourbook/', index, name='index'),
    # path('account/sentrequest/', index, name='index'),
]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)