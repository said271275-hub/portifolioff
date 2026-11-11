import json
import logging
from django.conf import settings
from django.core.cache import cache

try:
    import requests
except ImportError:
    requests = None

try:
    import urllib.request
except ImportError:
    urllib = None

logger = logging.getLogger(__name__)

CACHE_KEY_GITHUB_REPOS = "github_user_repos_cache"
CACHE_TIMEOUT = 1800 # 30 daqiqa

def fetch_github_repos():
    cached_data = cache.get(CACHE_KEY_GITHUB_REPOS)
    if cached_data is not None:
        return cached_data

    username = getattr(settings, 'GITHUB_USERNAME', 'said271275-hub')
    if not username:
        return []

    url = f"https://api.github.com/users/{username}/repos?per_page=100&sort=updated"
    token = getattr(settings, 'GITHUB_TOKEN', '')

    repos_data = []

    try:
        if requests:
            headers = {
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Django-Football-Portfolio-Proxy"
            }
            if token:
                headers["Authorization"] = f"token {token}"
            response = requests.get(url, headers=headers, timeout=5)
            if response.status_code == 200:
                repos_data = response.json()
        elif urllib:
            req = urllib.request.Request(
                url,
                headers={
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "Django-Football-Portfolio-Proxy"
                }
            )
            if token:
                req.add_header("Authorization", f"token {token}")
            with urllib.request.urlopen(req, timeout=5) as resp:
                if resp.status == 200:
                    repos_data = json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        logger.warning(f"GitHub API so'rovida xatolik: {e}")
        return []

    filtered_repos = []
    for repo in repos_data:
        homepage = repo.get('homepage')
        is_fork = repo.get('fork', False)
        is_archived = repo.get('archived', False)

        if homepage and not is_fork and not is_archived:
            tech_list = []
            if repo.get('language'):
                tech_list.append(repo.get('language'))
            if repo.get('topics'):
                for t in repo.get('topics', []):
                    if t not in tech_list:
                        tech_list.append(t)

            filtered_repos.append({
                "id": f"gh-{repo.get('id')}",
                "title": repo.get('name', '').replace('-', ' ').title(),
                "raw_name": repo.get('name', '').lower(),
                "description": repo.get('description') or "Ushbu loyiha GitHub orqali avtomatik import qilindi.",
                "tech": tech_list if tech_list else ["JavaScript", "HTML", "CSS"],
                "live_url": homepage.strip(),
                "github_url": repo.get('html_url'),
                "image": None,
                "custom_screenshot_url": None,
                "stars_count": 5,
                "is_pinned": False,
                "is_hidden": False,
                "is_from_github": True
            })

    cache.set(CACHE_KEY_GITHUB_REPOS, filtered_repos, CACHE_TIMEOUT)
    return filtered_repos
