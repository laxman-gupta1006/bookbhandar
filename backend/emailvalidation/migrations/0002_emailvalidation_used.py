# Generated by Django 3.1.1 on 2020-10-13 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('emailvalidation', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailvalidation',
            name='Used',
            field=models.BooleanField(default=False),
        ),
    ]
