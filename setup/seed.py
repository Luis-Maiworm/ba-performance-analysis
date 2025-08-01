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
        hashedPassword TEXT,
        isActive BOOLEAN DEFAULT TRUE,
        role TEXT DEFAULT 'user',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
""")

cur.execute("DELETE FROM users")


def random_name():
    return ''.join(random.choices(string.ascii_letters, k=8))

def random_email():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8)) + "@example.com"

def random_hashedPassword():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=32))

def random_isActive():
    return random.choice([True, False])

def random_role():
    return random.choice(["user", "admin", "manager"])


data = [
    {
        "name": random_name(),
        "email": random_email(),
        "hashedPassword": random_hashedPassword(),
        "isActive": random_isActive(),
        "role": random_role()
    } 
    for _ in range(100000)
]

for user in data:
    cur.execute(
        "INSERT INTO users (name, email, hashedPassword, isActive, role) VALUES (?, ?, ?, ?, ?)",
        (user["name"], user["email"], user["hashedPassword"], user["isActive"], user["role"])
    )


conn.commit()
conn.close()
print(f"Seeded {len(data)} users into {DB_PATH}")