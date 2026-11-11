from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Profile, Experience
from .serializers import ProfileSerializer, ExperienceSerializer

class ProfileDetailView(APIView):
    """
    GET /api/profile/
    Hojiakbar Bektemirov (#8, Liverpool) o'yinchi profili.
    """
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create(
                full_name="Hojiakbar Bektemirov",
                age=19,
                city="Guliston",
                role="FRONTEND DEVELOPER",
                jersey_number="#8",
                team_badge="Liverpool FC",
                bio="Futbol maydonida Steven Gerrard kabi #8 raqamda tezkor fikrlash, aniq uzatma va g'alabaga intilish qanchalik muhim bo'lsa, frontend dasturlashda ham toza kod, mukammal dizayn va kuchli jamoaviy harakat shunchalik qadrlidir. You'll Never Walk Alone!",
                skills=[
                    {"name": "HTML5", "level": 85, "pace": 88, "shooting": 80, "pass": 90, "dribble": 82, "category": "Foundation"},
                    {"name": "CSS3", "level": 80, "pace": 84, "shooting": 78, "pass": 82, "dribble": 85, "category": "Design"},
                    {"name": "Tailwind CSS", "level": 75, "pace": 88, "shooting": 76, "pass": 85, "dribble": 88, "category": "Design"},
                    {"name": "JavaScript", "level": 70, "pace": 82, "shooting": 75, "pass": 86, "dribble": 84, "category": "Core"},
                    {"name": "React", "level": 65, "pace": 80, "shooting": 72, "pass": 84, "dribble": 82, "category": "Frontend"},
                    {"name": "Python", "level": 55, "pace": 70, "shooting": 68, "pass": 75, "dribble": 65, "category": "Backend"},
                    {"name": "C++", "level": 30, "pace": 60, "shooting": 55, "pass": 62, "dribble": 50, "category": "Algorithm"}
                ],
                languages=["O'zbekcha (Ona tili)", "Inglizcha (O'rganmoqda)"],
                interests=["Futbol (Liverpool muxlisi)", "UI Animatsiyalar", "Web Dasturlash", "Taktik tahlil"],
                telegram="@BXS_738",
                github="said271275-hub",
                email="said271275@gmail.com",
                signature_text="Hojiakbar"
            )
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class ExperienceListView(APIView):
    """
    GET /api/experience/
    Hojiakbar Bektemirovning mavsumlari (Ta'lim va Amaliyot).
    """
    def get(self, request):
        experiences = Experience.objects.all()
        if not experiences.exists():
            default_items = [
                Experience(
                    title="Frontend Dasturlash Yo'nalishi",
                    place="IT Live Academy",
                    start="2026",
                    end="Hozirgacha",
                    description="HTML, CSS, JavaScript, React va zamonaviy kutubxonalar bo'yicha chuqur amaliy bilimlar hamda real loyihalar yaratish.",
                    role_type="education",
                    order=1
                ),
                Experience(
                    title="Mustaqil Amaliyot va Shaxsiy Loyihalar",
                    place="Frontend Arena (Self-Taught)",
                    start="2025",
                    end="Hozirgacha",
                    description="Renessans Frontend, distribyutsiya, telegram botlar va veb-ilovalarni mustaqil ishlab chiqish va GitHub'da rivojlantirish.",
                    role_type="work",
                    order=2
                )
            ]
            Experience.objects.bulk_create(default_items)
            experiences = Experience.objects.all()

        serializer = ExperienceSerializer(experiences, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
