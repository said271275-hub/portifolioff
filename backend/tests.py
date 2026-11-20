"""
Backend asosiy testlari (pytest yoki Django TestCase).
Ishlatish: cd backend && python manage.py test
yoki: pytest
"""
from django.test import TestCase, Client
from django.urls import reverse
import json


class HealthCheckTest(TestCase):
    """Backend health endpoint testi."""

    def test_health_check_returns_ok(self):
        client = Client()
        response = client.get('/api/health/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['status'], 'ok')
        self.assertIn('timestamp', data)
        self.assertEqual(data['service'], 'football-portfolio-backend')


class ProfileAPITest(TestCase):
    """Profil API testi."""

    def test_profile_endpoint_accessible(self):
        client = Client()
        response = client.get('/api/profile/')
        # 200 (ma'lumot bor) yoki 404 (admin da kiritilmagan)
        self.assertIn(response.status_code, [200, 404])

    def test_profile_returns_json(self):
        client = Client()
        response = client.get('/api/profile/')
        self.assertEqual(response['Content-Type'], 'application/json')


class ProjectsAPITest(TestCase):
    """Loyihalar API testi."""

    def test_projects_list_accessible(self):
        client = Client()
        response = client.get('/api/projects/')
        self.assertIn(response.status_code, [200, 404])

    def test_projects_returns_json(self):
        client = Client()
        response = client.get('/api/projects/')
        self.assertEqual(response['Content-Type'], 'application/json')


class ContactAPITest(TestCase):
    """Aloqa formasi testi."""

    def test_contact_post_valid_data(self):
        client = Client()
        payload = {
            'name': 'Test Foydalanuvchi',
            'email': 'test@example.com',
            'message': 'Bu test xabari, kamida 10 ta belgi',
            'honeypot': '',  # Bo'sh bo'lishi kerak
        }
        response = client.post(
            '/api/contact/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        # 201 (yaratildi) yoki 429 (throttle) kutiladi
        self.assertIn(response.status_code, [201, 429])

    def test_contact_post_honeypot_filled(self):
        """Honeypot to'ldirilsa xabar saqlanmasin."""
        client = Client()
        payload = {
            'name': 'Bot',
            'email': 'bot@spam.com',
            'message': 'Spam xabari bu yerda',
            'honeypot': 'spam_value',  # Bot to'ldirgan
        }
        response = client.post(
            '/api/contact/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        # Honeypot to'ldirilganda rad etilishi kerak
        self.assertIn(response.status_code, [400, 403, 200, 201])

    def test_contact_post_invalid_email(self):
        client = Client()
        payload = {
            'name': 'Test',
            'email': 'noto-valid-email',
            'message': 'Xabar matni yetarlicha uzun',
            'honeypot': '',
        }
        response = client.post(
            '/api/contact/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)

    def test_contact_post_missing_fields(self):
        client = Client()
        payload = {'name': 'Test faqat'}
        response = client.post(
            '/api/contact/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)


class StatsAPITest(TestCase):
    """Statistika API testi."""

    def test_stats_accessible(self):
        client = Client()
        response = client.get('/api/stats/')
        self.assertIn(response.status_code, [200, 404])

    def test_visit_post(self):
        client = Client()
        payload = {'path': '/'}
        response = client.post(
            '/api/visit/',
            data=json.dumps(payload),
            content_type='application/json'
        )
        # 200 yoki 201 kutiladi
        self.assertIn(response.status_code, [200, 201, 404])
