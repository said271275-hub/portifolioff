from django.db import models

class ContactMessage(models.Model):
    """
    Sayt tashrif buyuruvchilari yuborgan xabarlar modeli (Final hushtak / Scoreboard).
    """
    name = models.CharField(max_length=120, verbose_name="Muxlis / Jamoa nomi (Ism)")
    email = models.EmailField(verbose_name="Email manzili")
    message = models.TextField(verbose_name="Taktik xabar / Taklif")
    ip_address = models.GenericIPAddressField(verbose_name="IP manzil", null=True, blank=True)
    is_read = models.BooleanField(default=False, verbose_name="O'qilgan deb belgilash")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yuborilgan vaqti")

    class Meta:
        verbose_name = "Aloqa xabari"
        verbose_name_plural = "Aloqa xabarlari"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.email} ({'O\'qilgan' if self.is_read else 'Yangi'})"

