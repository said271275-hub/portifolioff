from django.db import models

class Project(models.Model):
    """
    Qo'lda kiritiladigan o'yinlar (loyihalar).
    GitHub repolari bilan avtomatik birlashadi, lekin bu yerdagi ma'lumotlar
    ustunlikka (priority) ega.
    """
    title = models.CharField(max_length=150, verbose_name="Loyiha (O'yin) nomi")
    description = models.TextField(verbose_name="Tavsif (Match Report)")
    tech = models.JSONField(
        verbose_name="Texnologiyalar",
        default=list,
        help_text='["React", "Tailwind CSS", "Vite"]'
    )
    live_url = models.URLField(verbose_name="Jonli havola (Live demo)", blank=True, null=True)
    github_url = models.URLField(verbose_name="GitHub havola", blank=True, null=True)
    image = models.ImageField(upload_to="projects/", verbose_name="Loyiha skrinshoti / Muqova", blank=True, null=True)
    custom_screenshot_url = models.URLField(
        verbose_name="Maxsus rasm havolasi (ixtiyoriy)",
        blank=True,
        null=True,
        help_text="Agar bo'sh bo'lsa avtomatik thum.io generatsiya qilinadi"
    )
    
    # Futbol mavzusidagi reyting
    stars_count = models.PositiveIntegerField(
        default=5,
        verbose_name="Natija / Yulduzchalar (Gollar)",
        help_text="O'yin reytingi (1 dan 5 gacha)"
    )
    
    is_pinned = models.BooleanField(default=False, verbose_name="Asosiy o'yin (Tepaga mahkamlash)")
    is_hidden = models.BooleanField(default=False, verbose_name="Yashirish (Saytda ko'rsatmaslik)")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib raqami")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Loyiha (Match)"
        verbose_name_plural = "Loyihalar (Match Cards)"
        ordering = ['-is_pinned', 'order', '-created_at']

    def __str__(self):
        return self.title

