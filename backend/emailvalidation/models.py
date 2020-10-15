from django.db import models
import uuid
# Create your models here.

class EmailValidation(models.Model):
    ValidationId=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    Email=models.EmailField(max_length=60,unique=True,null=False)
    Used=models.BooleanField(default=False)
