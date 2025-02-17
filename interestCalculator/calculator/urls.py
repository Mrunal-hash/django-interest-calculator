from . import views
from django.urls import path

urlpatterns = [
    path('',views.index,name='index'),
    path('simple_interest/',views.simple,name='simple'),
    path('compound_interest/',views.compound,name='compound'),
    path('emi_calculator/',views.emi,name='emi'),
    path('fd_calculator/',views.fd,name='fd'),
    path('lumpsum_calculator/',views.lumpsum,name='lumpsum'),
    path('ppf_calculator/',views.ppf,name='ppf'),
    path('rd_calculator/',views.rd,name='rd'),
    path('sip_calculator/',views.sip,name='sip'),
]
