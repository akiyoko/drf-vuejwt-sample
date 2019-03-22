from django.contrib import admin
from django.urls import path, include                  # 修正
from apiv1 import views

from django.urls import path, include
from rest_framework import routers
from apiv1 import views

router = routers.DefaultRouter()
router.register('books', views.BookViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls')),      # 追加
    path('api/v1/auth/', include('djoser.urls.jwt')),  # 追加
    path('api/v1/', include(router.urls)),
    # path('api/v1/', include('apiv1.urls')),            # 追加
    # path('api/v1/books/', views.BookCreateAPIView.as_view())
]
