from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
# from django.contrib.auth import logout

catchall = TemplateView.as_view(template_name='index.html')
# @login_required(login_url='/login')
def index(request):
    return render(request,'index.html')

@login_required(login_url='/login')
def login_index(request):
    return render(request,'index.html')
# def logout_view(request):
#     logout(request)
#     return redirect('/login')