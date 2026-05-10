import logging

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

logger = logging.getLogger(__name__)

_scheduler = AsyncIOScheduler()


def setup_scheduler() -> None:
    _scheduler.add_job(
        _send_daily_checkin_reminders,
        CronTrigger(hour=8, minute=0),
        id="daily_checkin_reminders",
        replace_existing=True,
    )
    _scheduler.add_job(
        _send_weekly_reports,
        CronTrigger(day_of_week="sun", hour=9, minute=0),
        id="weekly_reports",
        replace_existing=True,
    )
    _scheduler.start()
    logger.info("Scheduler started")


def shutdown_scheduler() -> None:
    _scheduler.shutdown(wait=False)
    logger.info("Scheduler stopped")


async def _send_daily_checkin_reminders() -> None:
    """Send check-in reminder emails to active users who haven't checked in today."""
    from database.connection import get_supabase
    from services.email_service import send_checkin_reminder

    logger.info("Running daily check-in reminders")
    # TODO: query profiles for users with email_reminders=true, check who hasn't checked in today,
    #       get their current streak, and call send_checkin_reminder for each.


async def _send_weekly_reports() -> None:
    """Send weekly progress reports to all active users."""
    from database.connection import get_supabase
    from services.email_service import send_weekly_report

    logger.info("Running weekly reports")
    # TODO: for each active user, aggregate last 7 days of check-ins and call send_weekly_report.
