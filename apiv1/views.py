from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from shop.models import Book
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticated,)


from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import BookSerializer


class BookCreateAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
