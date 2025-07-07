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
        name TEXT,
        email TEXT,
        hashed_password TEXT,
        is_active BOOLEAN DEFAULT TRUE,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
""")

cur.execute("DELETE FROM users")


def random_name():
    return ''.join(random.choices(string.ascii_letters, k=8))

def random_email():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8)) + "@example.com"

def random_hashed_password():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=32))

def random_is_active():
    return random.choice([True, False])

def random_role():
    return random.choice(["user", "admin", "manager"])


# 10.000 Datensätze einfügen
data = [
    {
        "name": random_name(),
        "email": random_email(),
        "hashed_password": random_hashed_password(),
        "is_active": random_is_active(),
        "role": random_role()
    } 
    for _ in range(10000)
]

for user in data:
    cur.execute(
        "INSERT INTO users (name, email, hashed_password, is_active, role) VALUES (?, ?, ?, ?, ?)",
        (user["name"], user["email"], user["hashed_password"], user["is_active"], user["role"])
    )


conn.commit()
conn.close()
print(f"Seeded {len(data)} users into {DB_PATH}")