#!/usr/bin/env python3
"""
Fix newlines in FAQ answers - replace literal \n with actual newlines
"""

import psycopg2

# Database connection
conn = psycopg2.connect(
    dbname='scutere125',
    user='mihaibucse',
    password='',
    host='localhost',
    port='5432'
)

cur = conn.cursor()

print("🔧 Fixing newlines in FAQ answers...")

# Get all FAQs
cur.execute("SELECT id, question, answer FROM faqs ORDER BY id")
faqs = cur.fetchall()

print(f"📋 Found {len(faqs)} FAQs to process")

updated_count = 0

for faq_id, question, answer in faqs:
    # Replace literal \n with actual newlines
    fixed_answer = answer.replace('\\n', '\n')
    
    if fixed_answer != answer:
        # Update the FAQ
        cur.execute(
            "UPDATE faqs SET answer = %s, updated_at = NOW() WHERE id = %s",
            (fixed_answer, faq_id)
        )
        updated_count += 1
        print(f"✅ Fixed FAQ #{faq_id}: {question[:50]}...")

conn.commit()

print(f"\n🎉 Updated {updated_count} FAQs!")

# Verify
cur.execute("SELECT id, question, SUBSTRING(answer, 1, 100) FROM faqs WHERE id = 1")
result = cur.fetchone()
print(f"\n📝 Sample FAQ #1:")
print(f"   Question: {result[1]}")
print(f"   Answer preview: {result[2][:80]}...")

cur.close()
conn.close()

print("\n✅ Done!")

