from django.contrib import admin
from .models import *

admin.site.register(Category)
admin.site.register(Profile)
admin.site.register(Campaign)
admin.site.register(Donation)
admin.site.register(Comment)