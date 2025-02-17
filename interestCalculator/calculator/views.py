from django.shortcuts import render

# home page
def index(request):
    return render(request,'index.html')

# simple interest
def simple(request):
    return render(request,'simple_interest.html')

# compound interest
def compound(request):
    return render(request,'compound_interest.html')

# emi calculator
def emi(request):
    return render(request,'emi_calculator.html')

# fd calculator
def fd(request):
    return render(request,'fd_calculator.html')

# lumpsum calculator
def lumpsum(request):
    return render(request,'lumpsum_calculator.html')

# ppf calculator
def ppf(request):
    return render(request,'ppf_calculator.html')

# rd calculator
def rd(request):
    return render(request,'rd_calculator.html')

# sip calculator
def sip(request):
    return render(request,'sip_calculator.html')
