''' register your model'''
from django.contrib import admin

from .models import BookDetails,BookStatus,BookRequest
# Register your models here.
admin.site.register(BookDetails)
admin.site.register(BookStatus)
admin.site.register(BookRequest)
