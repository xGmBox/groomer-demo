import asyncio
import sys

# Додаємо шлях до tonibot2504
sys.path.insert(0, '/Users/magic/PycharmProjects/tonibot2504')

from bot.keyboards import get_deficit_kb

def main():
    try:
        kb = get_deficit_kb()
        print("Success:", kb)
    except Exception as e:
        print("Error:", type(e).__name__, str(e))

if __name__ == "__main__":
    main()
