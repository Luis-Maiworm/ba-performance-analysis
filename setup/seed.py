import os
import random
import sqlite3
import string

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "sqlite.db")


conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()
cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
    )
""")

cur.execute("DELETE FROM users")


def random_name():
    return ''.join(random.choices(string.ascii_letters, k=8))

def random_email():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8)) + "@example.com"
# 10.000 Datensätze einfügen
data = [{"name": random_name(), "email": random_email()} for _ in range(10000)]

for user in data:
    cur.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        (user["name"], user["email"])
    )


conn.commit()
conn.close()
print(f"Seeded {len(data)} users into {DB_PATH}")