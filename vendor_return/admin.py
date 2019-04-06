from django.contrib import admin

from vendor_return.models import VendorReturnDetail

admin.site.site_header = 'Vendor Return Administration'
admin.site.site_title = 'Vendor Return Admin'
admin.site.index_title = 'Vendor Return'


@admin.register(VendorReturnDetail)
class TblVendorReturnDetailAdmin(admin.ModelAdmin):
    list_display = ('company', 'week_of', 'vr_units', 'tph')
    search_fields = ('company',)
    list_filter = ('company',)
    ordering = ('company',)
    # date_hierarchy = 'created_at'
    fields = ('company', 'week_of', 'vr_units', 'tph')
    # readonly_fields = ('project_id',)
    actions = None
