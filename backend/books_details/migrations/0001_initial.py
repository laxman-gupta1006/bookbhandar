# Generated by Django 3.1 on 2020-09-28 04:49

import books_details.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BookDetails',
            fields=[
                ('book_id', models.CharField(max_length=120, primary_key=True, serialize=False, unique=True)),
                ('book_name', models.CharField(max_length=100)),
                ('user_name', models.CharField(max_length=30)),
                ('city', models.CharField(max_length=60)),
                ('time', models.DateTimeField()),
                ('about', models.TextField()),
                ('book_img', models.ImageField(upload_to=books_details.models.bookimage)),
                ('college', models.CharField(max_length=60)),
                ('availibility', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='BookRequest',
            fields=[
                ('request_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=60)),
                ('requested_book_id', models.CharField(max_length=60, null=True)),
                ('time', models.DateTimeField()),
                ('accepted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='BookStatus',
            fields=[
                ('book_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='books_details.bookdetails')),
                ('sold_to_username', models.CharField(max_length=30)),
                ('accepted_request_id', models.CharField(max_length=100, null=True)),
                ('chats', models.JSONField(null=True)),
                ('requests', models.JSONField(null=True)),
            ],
        ),
    ]