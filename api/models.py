from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.FloatField(default=100000)
    total_donated = models.FloatField(default=0)
    role = models.CharField(max_length=20, default='user')

    def __str__(self):
        return self.user.username


class Campaign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    goal_amount = models.FloatField()
    current_amount = models.FloatField(default=0)
    image = models.URLField(blank=True, null=True)

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Donation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    amount = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)