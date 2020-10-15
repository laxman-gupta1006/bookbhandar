from rest_framework import serializers
from books_details.models import BookDetails,BookStatus,BookRequest
from userinfo.models import Userinfo
class BookDetailsSerializer(serializers.ModelSerializer):
    '''books details serializer'''
    class Meta:
        model = BookDetails
        fields = ['book_name','book_id','user_name','city','time','book_img','about','college','availibility']


class BookStatusSerializer(serializers.ModelSerializer):
    '''books Status serializer'''
    class Meta:
        model = BookStatus
        fields = ['book_id','sold_to_username','chats','requests','accepted_request_id']

class BookRequestSerializer(serializers.ModelSerializer):
    '''books Status serializer'''
    class Meta:
        model = BookRequest
        fields = ['request_id','user_name','requested_book_id','time','accepted']

class UserdetailsSerializer(serializers.ModelSerializer):
    '''user details seriailizer '''
    class Meta:
        model = Userinfo
        fields = ['user_name','full_name','user_email','college_name','city','country','profile_img','varified_user']
    # def get_profile_img(self, obj):
    #     request = self.context.get('request')
    #     profile_img = obj.get_image_url()
    #     return request.build_absolute_uri(profile_img)