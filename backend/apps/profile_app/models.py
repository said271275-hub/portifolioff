from django.db import models

class Profile(models.Model):
    """
    O'yinchi (Dasturchi) profili modeli.
    Hero, ID karta va About qismlaridagi ma'lumotlar shu yerdan olinadi.
    """
    full_name = models.CharField(max_length=150, verbose_name="To'liq ism-familiya", default="Hojiakbar")
    age = models.PositiveIntegerField(verbose_name="Yosh", default=20)
    city = models.CharField(max_length=100, verbose_name="Shahar", default="Toshkent")
    role = models.CharField(max_length=100, verbose_name="Kasb / Pozitsiya", default="FRONTEND DEVELOPER")
    jersey_number = models.CharField(max_length=10, verbose_name="Forma raqami", default="#10")
    team_badge = models.CharField(max_length=100, verbose_name="Jamoa nishoni", default="FC Frontend")
    
    bio = models.TextField(
        verbose_name="Futbolcha Bio",
        default="Maydonda tezkor pas va aniq zarba qanchalik muhim bo'lsa, frontendda ham toza kod va silliq interfeys shunchalik qadrli. Kodda ham, maydonda ham faqat jamoa bilan g'alaba qozonaman!"
    )
    
    # JSONField orqali saqlanadigan ma'lumotlar
    skills = models.JSONField(
        verbose_name="Ko'nikmalar (Statistika)",
        default=list,
        help_text='Format: [{"name": "React", "level": 88, "pace": 90, "shooting": 85}, ...]'
    )
    languages = models.JSONField(
        verbose_name="Tillar",
        default=list,
        help_text='["O\'zbekcha (Ona tili)", "Inglizcha (B2)", "Ruscha (So\'zlashuv)"]'
    )
    interests = models.JSONField(
        verbose_name="Qiziqishlar",
        default=list,
        help_text='["Taktik tahlil", "UI Animatsiyalar", "Cyber Football", "Kitob mutolaasi"]'
    )
    
    # Ijtimoiy tarmoqlar va kontaktlar
    telegram = models.CharField(max_length=100, verbose_name="Telegram", default="@username")
    github = models.CharField(max_length=100, verbose_name="GitHub username", default="username")
    email = models.EmailField(verbose_name="Email", default="example@mail.com")
    linkedin = models.URLField(verbose_name="LinkedIn profil", blank=True, null=True)
    
    # Fayllar va rasmlar
    cv_file = models.FileField(upload_to="cv/", verbose_name="Rezyume (CV PDF)", blank=True, null=True)
    avatar = models.ImageField(upload_to="avatars/", verbose_name="Avatar / Polaroid rasm", blank=True, null=True)
    signature_text = models.CharField(max_length=100, verbose_name="Imzo matni", default="Hojiakbar")

    class Meta:
        verbose_name = "Profil"
        verbose_name_plural = "Profil (Asosiy)"

    def __str__(self):
        return f"{self.full_name} ({self.role})"


class Experience(models.Model):
    """
    Mavsumlar (Tajriba va Ta'lim timeline'i).
    Futboldagi mavsumlar (masalan: '2023/2024 Mavsum - Najot Ta'lim') uslubida.
    """
    ROLE_CHOICES = (
        ('work', 'Klub / Ish faoliyati'),
        ('education', 'Akademiya / Ta\'lim'),
    )
    title = models.CharField(max_length=150, verbose_name="Lavozim yoki Yo'nalish")
    place = models.CharField(max_length=150, verbose_name="Kompaniya / Ta'lim markazi")
    start = models.CharField(max_length=50, verbose_name="Boshlanish vaqti (Masalan: 2023 Avgust)")
    end = models.CharField(max_length=50, verbose_name="Tugash vaqti (Masalan: Hozirgacha)", default="Hozirgacha")
    description = models.TextField(verbose_name="Tavsif (O'yin natijalari va yutuqlar)")
    role_type = models.CharField(max_length=20, choices=ROLE_CHOICES, default='work', verbose_name="Tur")
    order = models.PositiveIntegerField(default=0, verbose_name="Tartib raqami")

    class Meta:
        verbose_name = "Mavsum (Tajriba)"
        verbose_name_plural = "Mavsumlar (Tajribalar)"
        ordering = ['order', '-id']

    def __str__(self):
        return f"{self.place} - {self.title}"

