from django.db import models


class VendorReturnDetail(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.TextField(blank=True, null=True)
    week_of = models.TextField(blank=True, null=True)
    vr_units = models.FloatField(blank=True, null=True)
    tph = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_vendor_return_detail'
