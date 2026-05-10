import os

import resend

resend.api_key = os.getenv("RESEND_API_KEY", "")

FROM_EMAIL = "Finops <hello@finops.app>"
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")


def send_welcome_email(to_email: str, name: str) -> None:
    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": to_email,
        "subject": "Your financial OS is ready — welcome to Finops",
        "html": f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome, {name}.</h1>
          <p>You've done the hard part — you looked at your financial reality clearly.</p>
          <p>Your personalised financial operating system is saved and ready.
          Log in anytime to review it and track your progress.</p>
          <p>
            <a href="{FRONTEND_URL}/dashboard"
               style="background:#000;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;">
              Go to Your Dashboard
            </a>
          </p>
        </div>
        """,
    })


def send_checkin_reminder(to_email: str, name: str, streak: int) -> None:
    streak_line = (
        f"You're on a {streak}-day streak. Don't break it now."
        if streak > 1
        else "How are you tracking today?"
    )
    subject = (
        f"Day {streak} streak — daily check-in" if streak > 1 else "Time for your daily check-in"
    )
    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": to_email,
        "subject": subject,
        "html": f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Hey {name},</h1>
          <p>{streak_line}</p>
          <p>
            <a href="{FRONTEND_URL}/dashboard/checkin"
               style="background:#000;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;">
              Check In Now
            </a>
          </p>
        </div>
        """,
    })


def send_weekly_report(to_email: str, name: str, report_data: dict) -> None:
    avg_mood = report_data.get("avg_mood", "—")
    avg_stress = report_data.get("avg_stress", "—")
    checkins = report_data.get("checkins_this_week", 0)

    resend.Emails.send({
        "from": FROM_EMAIL,
        "to": to_email,
        "subject": "Your weekly Finops report",
        "html": f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Weekly Report — {name}</h1>
          <p>Here's how your week looked:</p>
          <ul>
            <li>Check-ins completed: <strong>{checkins}/7</strong></li>
            <li>Average mood: <strong>{avg_mood}/10</strong></li>
            <li>Average financial stress: <strong>{avg_stress}/10</strong></li>
          </ul>
          <p>
            <a href="{FRONTEND_URL}/dashboard/progress"
               style="background:#000;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;">
              View Full Progress
            </a>
          </p>
        </div>
        """,
    })
