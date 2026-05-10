import os

import anthropic

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

MODEL = "claude-sonnet-4-6"

SYSTEM_PROMPT = (
    "You are Finops, a compassionate and direct financial coach. "
    "Your job is to help users understand their true financial reality and build healthier "
    "money habits. Be honest, specific, and encouraging — never generic. "
    "Avoid jargon. Write in plain English."
)


async def generate_financial_mirror(snapshot_data: dict) -> str:
    """Stage 2: Write a personalised narrative of the user's financial reality."""
    message = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": (
                    "Based on this financial snapshot, write a clear, honest, and empathetic "
                    "2–3 paragraph summary of this person's financial reality. "
                    "Do not soften hard truths, but lead with compassion. "
                    f"Snapshot: {snapshot_data}"
                ),
            }
        ],
    )
    return message.content[0].text  # type: ignore[index]


async def generate_operating_system(snapshot_data: dict, mirror_narrative: str) -> dict:
    """Stage 3: Generate a personalised financial operating system."""
    message = client.messages.create(
        model=MODEL,
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": (
                    "Create a personalised financial operating system for this person. "
                    "Return a valid JSON object with exactly these keys:\n"
                    "- core_principle (string): their single guiding financial principle\n"
                    "- monthly_targets (object): 3 key monthly targets with label and value\n"
                    "- weekly_actions (array of 3 strings): specific weekly habits\n"
                    "- mindset_reframe (string): a reframe of their relationship with money\n"
                    "- ninety_day_focus (string): their primary 90-day goal\n\n"
                    f"Financial snapshot: {snapshot_data}\n"
                    f"Their financial reality: {mirror_narrative}"
                ),
            }
        ],
    )
    return {"operating_system": message.content[0].text}  # type: ignore[index]


async def analyse_checkin(checkin_data: dict, history: list) -> str:
    """Generate a brief personalised insight from a check-in submission."""
    recent = history[-5:] if history else []
    message = client.messages.create(
        model=MODEL,
        max_tokens=256,
        system=SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": (
                    "Analyse this check-in and write one short, specific, encouraging insight "
                    "(2–3 sentences max). Look for patterns across recent history if available.\n"
                    f"Today's check-in: {checkin_data}\n"
                    f"Recent history: {recent}"
                ),
            }
        ],
    )
    return message.content[0].text  # type: ignore[index]
