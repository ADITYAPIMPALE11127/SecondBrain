from django.urls import path
from .views import (
    NoteListCreateView,
    NoteUpdateView,
    NoteDeleteView
)

urlpatterns = [
    path("", NoteListCreateView.as_view()),
    path("update/<int:pk>/", NoteUpdateView.as_view()),
    path("<int:pk>/", NoteDeleteView.as_view()),
]