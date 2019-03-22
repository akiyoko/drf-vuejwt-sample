from rest_framework import serializers

from shop.models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'title', 'price')
        extra_kwargs = {
            'title': {
                'error_messages': {
                    'required': "タイトルは必須です。",
                },
            },
        }

    def validate_title(self, value):
        if 'django' not in value.lower():
            raise serializers.ValidationError("Blog post is not about Django")
        return value

    def validate(self, data):
        if data['price'] > 2000:
            raise serializers.ValidationError("2000円以上するのはダメよん")
        return data


class BookListSerializer(serializers.ListSerializer):
    child = BookSerializer()
