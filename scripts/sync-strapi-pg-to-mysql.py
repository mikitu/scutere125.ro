#!/usr/bin/env python3

"""
Sync Strapi PostgreSQL database to MySQL
This script handles the complete migration including schema and data
"""

import os
import sys
import subprocess
import json
from datetime import datetime

# Configuration
PG_CONFIG = {
    'host': 'localhost',
    'port': '5432',
    'database': 'scutere125',
    'user': 'mihaibucse',
}

MYSQL_CONFIG = {
    'host': os.getenv('MYSQL_HOST', 'localhost'),
    'port': os.getenv('MYSQL_PORT', '3306'),
    'database': os.getenv('MYSQL_DB', 'scutere125'),
    'user': os.getenv('MYSQL_USER', 'root'),
    'password': os.getenv('MYSQL_PASSWORD', ''),
}

BACKUP_DIR = 'backups'
TIMESTAMP = datetime.now().strftime('%Y%m%d-%H%M%S')


def run_command(cmd, shell=False, capture_output=True):
    """Run a shell command and return the result"""
    try:
        if shell:
            result = subprocess.run(cmd, shell=True, capture_output=capture_output, text=True)
        else:
            result = subprocess.run(cmd, capture_output=capture_output, text=True)
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, '', str(e)


def export_postgres_schema():
    """Export PostgreSQL schema"""
    print("📤 Exporting PostgreSQL schema...")
    
    schema_file = f"{BACKUP_DIR}/postgres-schema-{TIMESTAMP}.sql"
    
    cmd = [
        'pg_dump',
        '-h', PG_CONFIG['host'],
        '-p', PG_CONFIG['port'],
        '-U', PG_CONFIG['user'],
        '-d', PG_CONFIG['database'],
        '--schema-only',
        '--no-owner',
        '--no-privileges',
    ]
    
    success, stdout, stderr = run_command(cmd)
    
    if success:
        with open(schema_file, 'w') as f:
            f.write(stdout)
        print(f"  ✅ Schema exported: {schema_file}")
        return schema_file
    else:
        print(f"  ❌ Schema export failed: {stderr}")
        return None


def export_postgres_data():
    """Export PostgreSQL data"""
    print("📤 Exporting PostgreSQL data...")
    
    data_file = f"{BACKUP_DIR}/postgres-data-{TIMESTAMP}.sql"
    
    cmd = [
        'pg_dump',
        '-h', PG_CONFIG['host'],
        '-p', PG_CONFIG['port'],
        '-U', PG_CONFIG['user'],
        '-d', PG_CONFIG['database'],
        '--data-only',
        '--column-inserts',
        '--no-owner',
        '--no-privileges',
    ]
    
    success, stdout, stderr = run_command(cmd)
    
    if success:
        with open(data_file, 'w') as f:
            f.write(stdout)
        
        file_size = os.path.getsize(data_file)
        print(f"  ✅ Data exported: {data_file} ({file_size / 1024:.1f} KB)")
        return data_file
    else:
        print(f"  ❌ Data export failed: {stderr}")
        return None


def convert_schema_to_mysql(pg_schema_file):
    """Convert PostgreSQL schema to MySQL"""
    print("🔧 Converting schema to MySQL format...")
    
    mysql_schema_file = f"{BACKUP_DIR}/mysql-schema-{TIMESTAMP}.sql"
    
    with open(pg_schema_file, 'r') as f:
        content = f.read()
    
    # PostgreSQL to MySQL conversions
    conversions = [
        # Data types
        (r'SERIAL', 'INT AUTO_INCREMENT'),
        (r'BIGSERIAL', 'BIGINT AUTO_INCREMENT'),
        (r'TEXT', 'TEXT'),
        (r'JSONB', 'JSON'),
        (r'TIMESTAMP WITH TIME ZONE', 'DATETIME'),
        (r'TIMESTAMP WITHOUT TIME ZONE', 'DATETIME'),
        (r'BOOLEAN', 'TINYINT(1)'),
        
        # Remove PostgreSQL-specific syntax
        (r'::[\w]+', ''),  # Type casts
        (r'USING [\w]+', ''),  # USING clauses
    ]
    
    import re
    for pattern, replacement in conversions:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
    
    # Remove PostgreSQL-specific commands
    lines = content.split('\n')
    mysql_lines = []
    skip_block = False
    
    for line in lines:
        # Skip PostgreSQL-specific commands
        if any(x in line for x in ['SET ', 'SELECT pg_catalog', 'COMMENT ON', 'ALTER TABLE ONLY']):
            continue
        
        # Skip COPY blocks
        if 'COPY ' in line:
            skip_block = True
            continue
        if skip_block and '\\.' in line:
            skip_block = False
            continue
        if skip_block:
            continue
        
        mysql_lines.append(line)
    
    mysql_content = '\n'.join(mysql_lines)
    
    # Add MySQL header
    mysql_header = f"""-- MySQL Schema
-- Converted from PostgreSQL
-- Generated: {TIMESTAMP}

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

"""
    
    mysql_footer = "\nSET FOREIGN_KEY_CHECKS=1;\n"
    
    with open(mysql_schema_file, 'w') as f:
        f.write(mysql_header + mysql_content + mysql_footer)
    
    print(f"  ✅ Schema converted: {mysql_schema_file}")
    return mysql_schema_file


def convert_data_to_mysql(pg_data_file):
    """Convert PostgreSQL data to MySQL"""
    print("🔧 Converting data to MySQL format...")
    
    mysql_data_file = f"{BACKUP_DIR}/mysql-data-{TIMESTAMP}.sql"
    
    with open(pg_data_file, 'r') as f:
        content = f.read()
    
    import re
    
    # Convert boolean values
    content = content.replace("'t'", '1')
    content = content.replace("'f'", '0')
    content = content.replace('true', '1')
    content = content.replace('false', '0')
    
    # Remove type casts
    content = re.sub(r'::[\w]+', '', content)
    
    # Remove PostgreSQL-specific commands
    content = re.sub(r'SET .*?;', '', content)
    content = re.sub(r'SELECT pg_catalog\..*?;', '', content)
    
    with open(mysql_data_file, 'w') as f:
        f.write(content)
    
    print(f"  ✅ Data converted: {mysql_data_file}")
    return mysql_data_file


def main():
    print("🔄 Strapi PostgreSQL to MySQL Sync")
    print("=" * 50)
    print()
    
    # Create backup directory
    os.makedirs(BACKUP_DIR, exist_ok=True)
    
    # Export PostgreSQL
    data_file = export_postgres_data()
    if not data_file:
        print("❌ Failed to export PostgreSQL data")
        sys.exit(1)
    
    # Convert to MySQL
    mysql_data_file = convert_data_to_mysql(data_file)
    if not mysql_data_file:
        print("❌ Failed to convert data to MySQL")
        sys.exit(1)
    
    print()
    print("✅ Conversion completed successfully!")
    print()
    print("📝 Next steps:")
    print(f"  1. Import to MySQL: mysql -u {MYSQL_CONFIG['user']} -p {MYSQL_CONFIG['database']} < {mysql_data_file}")
    print("  2. Update apps/cms/config/database.js to use MySQL")
    print("  3. Update apps/cms/.env with MySQL credentials")
    print()
    print("📋 Files created:")
    print(f"  - PostgreSQL data: {data_file}")
    print(f"  - MySQL data: {mysql_data_file}")


if __name__ == "__main__":
    main()

