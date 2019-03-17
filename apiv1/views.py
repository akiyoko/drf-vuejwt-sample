from django.db import transaction
from django.utils.decorators import method_decorator
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from shop.models import Book
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticated,)


# class BookCreateAPIView(generics.CreateAPIView):
#     serializer_class = BookSerializer


# from rest_framework import generics
#
# from .serializers import BookSerializer
#
#
# class BookCreateAPIView(generics.CreateAPIView):
#     serializer_class = BookSerializer
#
#     def create(self, request, *args, **kwargs):
#         # TODO（もっと良い例ない？？）
#         return super().create(request, *args, **kwargs)
