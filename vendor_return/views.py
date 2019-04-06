import json

from django.http import HttpResponse
from django.template import loader

from vendor_return.models import VendorReturnDetail


def get_dashboard_page(request):
    template = loader.get_template('dashboard.html')
    data = list(VendorReturnDetail.objects.all().values())
    data = json.dumps(data, default=date_handler)
    return HttpResponse(template.render({'data': data}, request))


def date_handler(obj):
    return obj.isoformat() if hasattr(obj, 'isoformat') else str(obj)
