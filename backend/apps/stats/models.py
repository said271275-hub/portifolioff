from django.db import models

class Visit(models.Model):
    """
    Saytga qilingan har bir tashrif (stadion muxlislari soni).
    """
    path = models.CharField(max_length=255, default="/", verbose_name="Sahifa yo'li")
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name="IP manzil")
    user_agent = models.TextField(blank=True, null=True, verbose_name="Brauzer ma'lumoti")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Tashrif vaqti")

    class Meta:
        verbose_name = "Tashrif (Muxlis)"
        verbose_name_plural = "Tashriflar (Muxlislar)"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.path} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"

