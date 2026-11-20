from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Project
from .serializers import ProjectSerializer
from .github_service import fetch_github_repos

class ProjectCombinedListView(APIView):
    """
    GET /api/projects/
    Hojiakbar Bektemirovning GitHub repolari va asosiy loyihalari:
    - RENESSANS.FRONTEND (React, Vite, Tailwind, TS - Live Demo: https://renessans-frontend.vercel.app)
    - distribyutsiya (Buyurtma tizimi)
    - it-live-academy- (Admin CRM dashboard)
    - talaba.uz (Talabalar platformasi)
    - mebel.uz (Mebel do'koni)
    - burger-bot (Python telegram boti)
    - coffeshopplay, akademnashr, tugilgan-kun
    """
    def get(self, request):
        db_projects = Project.objects.filter(is_hidden=False)

        # Agar bazada loyihalar bo'lmasa, foydalanuvchining haqiqiy loyihalarini joylaymiz
        if not db_projects.exists() and not Project.objects.exists():
            default_projects = [
                Project(
                    title="RENESSANS.FRONTEND",
                    description="O'quv markazi rasmiy veb-platformasi va interaktiv frontend qismi. Zamonaviy komponentlar arxitekturasi va responsive dizayn.",
                    tech=["React", "TypeScript", "Vite", "Tailwind CSS"],
                    live_url="https://renessans-frontend.vercel.app",
                    github_url="https://github.com/said271275-hub/RENESSANS.FRONTEND",
                    stars_count=5,
                    is_pinned=True,
                    order=1
                ),
                Project(
                    title="distribyutsiya",
                    description="Mahsulotlarni yetkazib berish, buyurtmalarni qabul qilish va savdo hisobini yuritishga mo'ljallangan veb-tizim.",
                    tech=["JavaScript", "React", "CSS3", "HTML5"],
                    live_url="https://distribyutsiya.vercel.app",
                    github_url="https://github.com/said271275-hub/distribyutsiya",
                    stars_count=5,
                    is_pinned=True,
                    order=2
                ),
                Project(
                    title="it-live-academy-",
                    description="IT Live Academy o'quv markazi uchun admin dashboard va talabalar faoliyatini boshqaruvchi CRM interfeysi.",
                    tech=["React", "Tailwind CSS", "JavaScript"],
                    live_url="https://it-live-academy.vercel.app",
                    github_url="https://github.com/said271275-hub/it-live-academy-",
                    stars_count=5,
                    is_pinned=True,
                    order=3
                ),
                Project(
                    title="talaba.uz",
                    description="Talabalar uchun o'quv resurslari, topshiriqlar va ma'lumotlar almashish imkoniyatini beruvchi portal.",
                    tech=["JavaScript", "HTML5", "CSS3"],
                    live_url="https://talaba-uz.vercel.app",
                    github_url="https://github.com/said271275-hub/talaba.uz",
                    stars_count=4,
                    is_pinned=False,
                    order=4
                ),
                Project(
                    title="mebel.uz",
                    description="Zamonaviy mebel do'koni mahsulotlari katalogi, xarid qilish va buyurtma berish vitrinasi.",
                    tech=["HTML5", "CSS3", "JavaScript"],
                    live_url="https://mebel-uz.vercel.app",
                    github_url="https://github.com/said271275-hub/mebel.uz",
                    stars_count=4,
                    is_pinned=False,
                    order=5
                ),
                Project(
                    title="burger-bot",
                    description="Burger va tezkor taomlarga buyurtma berish uchun mo'ljallangan aqlli Telegram bot xizmati.",
                    tech=["Python", "Telegram Bot API"],
                    live_url="",
                    github_url="https://github.com/said271275-hub/burger-bot",
                    stars_count=4,
                    is_pinned=False,
                    order=6
                ),
                Project(
                    title="coffeshopplay",
                    description="Shinam qahvaxona uchun interaktiv taomnoma va zamonaviy veb-sahifa dizayni.",
                    tech=["HTML5", "CSS3", "JavaScript"],
                    live_url="https://coffeeshop-play.vercel.app",
                    github_url="https://github.com/said271275-hub/coffeshopplay",
                    stars_count=4,
                    is_pinned=False,
                    order=7
                ),
                Project(
                    title="tugilgan-kun",
                    description="Maxsus interaktiv tabrik, animatsiyalar va sovg'a effektlariga ega veb-sahifa.",
                    tech=["HTML5", "CSS3", "JavaScript"],
                    live_url="https://tugilgan-kun.vercel.app",
                    github_url="https://github.com/said271275-hub/tugilgan-kun",
                    stars_count=4,
                    is_pinned=False,
                    order=8
                )
            ]
            Project.objects.bulk_create(default_projects)
            db_projects = Project.objects.filter(is_hidden=False)

        serializer = ProjectSerializer(db_projects, many=True, context={'request': request})
        serialized_db_projects = serializer.data

        # GitHub repolarini ham tortib qo'shamiz
        github_repos = fetch_github_repos()

        existing_github_urls = {
            p.get('github_url', '').strip().lower() for p in serialized_db_projects if p.get('github_url')
        }
        existing_titles = {
            p.get('title', '').strip().lower() for p in serialized_db_projects if p.get('title')
        }

        merged_list = list(serialized_db_projects)

        for repo in github_repos:
            repo_gh_url = (repo.get('github_url') or '').strip().lower()
            repo_title = (repo.get('title') or '').strip().lower()
            repo_raw = (repo.get('raw_name') or '').strip().lower()

            if (repo_gh_url not in existing_github_urls) and (repo_title not in existing_titles) and (repo_raw not in existing_titles):
                live_url = repo.get('live_url')
                repo_item = {
                    "id": repo.get('id'),
                    "title": repo.get('title'),
                    "description": repo.get('description'),
                    "tech": repo.get('tech', []),
                    "live_url": live_url,
                    "github_url": repo.get('github_url'),
                    "image": None,
                    "image_url": None,
                    "custom_screenshot_url": None,
                    "screenshot_url": f"https://image.thum.io/get/{live_url}" if live_url else None,
                    "stars_count": repo.get('stars_count', 4),
                    "is_pinned": False,
                    "is_hidden": False,
                    "order": 99,
                    "is_from_github": True
                }
                merged_list.append(repo_item)

        merged_list.sort(key=lambda x: (not x.get('is_pinned', False), x.get('order', 100)))
        return Response(merged_list, status=status.HTTP_200_OK)
