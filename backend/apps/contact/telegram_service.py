import json
import logging
from django.conf import settings

try:
    import requests
except ImportError:
    requests = None

try:
    import urllib.request
except ImportError:
    urllib = None

logger = logging.getLogger(__name__)

def send_telegram_notification(name, email, message_text):
    bot_token = getattr(settings, 'TELEGRAM_BOT_TOKEN', '')
    chat_id = getattr(settings, 'TELEGRAM_CHAT_ID', '')

    if not bot_token or not chat_id:
        logger.info("Telegram Bot Token yoki Chat ID yo'q, o'tkazib yuborildi.")
        return False

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    text = (
        "⚽ <b>Yangi Transfer Taklifi / Xabar keldi!</b>\n\n"
        f"👤 <b>Yuboruvchi:</b> {name}\n"
        f"📧 <b>Email:</b> {email}\n\n"
        f"📝 <b>Xabar matni:</b>\n{message_text}\n\n"
        "⚡ <i>Portfolio Futbol Arena (Liverpool #8) bildirishnomasi</i>"
    )

    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }

    try:
        if requests:
            requests.post(url, json=payload, timeout=5)
            return True
        elif urllib:
            req_data = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(
                url,
                data=req_data,
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=5) as resp:
                return resp.status == 200
    except Exception as e:
        logger.warning(f"Telegram xabarnoma xatosi: {e}")
        return False
    return False
