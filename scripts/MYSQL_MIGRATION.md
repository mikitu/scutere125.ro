# PostgreSQL to MySQL Migration Guide

Acest ghid te ajută să migrezi baza de date Strapi de la PostgreSQL la MySQL.

## 📋 Prerequisite

### 1. Instalează MySQL

**macOS (Homebrew):**
```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

### 2. Instalează MySQL client pentru Node.js

```bash
cd apps/cms
pnpm add mysql2
```

### 3. Configurează MySQL

```bash
# Conectează-te la MySQL
mysql -u root -p

# Creează baza de date
CREATE DATABASE scutere125 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Creează user (opțional)
CREATE USER 'scutere125_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON scutere125.* TO 'scutere125_user'@'localhost';
FLUSH PRIVILEGES;

# Ieși
EXIT;
```

## 🔄 Migrare Automată

### Opțiunea 1: Script Bash (Recomandat)

```bash
# Setează credențialele MySQL
export MYSQL_HOST=localhost
export MYSQL_PORT=3306
export MYSQL_DB=scutere125
export MYSQL_USER=root
export MYSQL_PASSWORD=your_password

# Rulează script-ul
chmod +x scripts/sync-postgres-to-mysql.sh
./scripts/sync-postgres-to-mysql.sh
```

### Opțiunea 2: Script Python

```bash
# Setează credențialele MySQL
export MYSQL_HOST=localhost
export MYSQL_PORT=3306
export MYSQL_DB=scutere125
export MYSQL_USER=root
export MYSQL_PASSWORD=your_password

# Rulează script-ul
chmod +x scripts/sync-strapi-pg-to-mysql.py
python3 scripts/sync-strapi-pg-to-mysql.py
```

## 🔧 Migrare Manuală

### Pasul 1: Export PostgreSQL

```bash
# Export doar date (cu INSERT statements)
pg_dump -U mihaibucse -d scutere125 \
  --data-only \
  --column-inserts \
  --no-owner \
  --no-privileges \
  > backups/postgres-data.sql
```

### Pasul 2: Convertire la MySQL

Editează fișierul `postgres-data.sql` și înlocuiește:
- `'t'` → `1` (boolean true)
- `'f'` → `0` (boolean false)
- `::timestamp` → `` (șterge type casts)
- `::integer` → `` (șterge type casts)
- `::text` → `` (șterge type casts)

### Pasul 3: Import în MySQL

```bash
mysql -u root -p scutere125 < backups/mysql-data.sql
```

## ⚙️ Configurare Strapi pentru MySQL

### Pasul 1: Actualizează `database.js`

Înlocuiește conținutul din `apps/cms/config/database.js` cu:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'scutere125'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', ''),
      ssl: env.bool('DATABASE_SSL', false),
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
});
```

SAU copiază fișierul pre-configurat:

```bash
cp apps/cms/config/database.mysql.js apps/cms/config/database.js
```

### Pasul 2: Actualizează `.env`

```bash
# Copiază exemplul
cp apps/cms/.env.mysql.example apps/cms/.env

# Editează și completează credențialele
nano apps/cms/.env
```

Actualizează:
```env
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=scutere125
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
```

### Pasul 3: Instalează dependențele MySQL

```bash
cd apps/cms
pnpm add mysql2
```

### Pasul 4: Testează conexiunea

```bash
cd apps/cms
pnpm dev
```

Verifică în log-uri:
```
Database: mysql
```

## 🧪 Verificare

### 1. Verifică tabelele

```bash
mysql -u root -p scutere125 -e "SHOW TABLES;"
```

### 2. Verifică datele

```bash
mysql -u root -p scutere125 -e "SELECT COUNT(*) FROM scooters;"
mysql -u root -p scutere125 -e "SELECT COUNT(*) FROM files;"
```

### 3. Testează API-ul

```bash
curl http://localhost:1337/api/scooters
```

## 🚀 Deploy pe Producție

### Pentru MySQL remote (ex: PlanetScale, AWS RDS)

Actualizează `.env` cu credențialele remote:

```env
DATABASE_HOST=your-mysql-host.com
DATABASE_PORT=3306
DATABASE_NAME=scutere125
DATABASE_USERNAME=your_user
DATABASE_PASSWORD=your_password
DATABASE_SSL=true
```

### Pentru PlanetScale

```env
DATABASE_HOST=aws.connect.psdb.cloud
DATABASE_PORT=3306
DATABASE_NAME=scutere125
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_SSL=true
```

## 🔍 Troubleshooting

### Eroare: "Client does not support authentication protocol"

```bash
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Eroare: "Too many connections"

Crește pool size în `database.js`:
```javascript
pool: {
  min: 2,
  max: 20,  // Crește de la 10 la 20
}
```

### Eroare: "Packet too large"

```bash
mysql -u root -p
SET GLOBAL max_allowed_packet=67108864;  # 64MB
```

## 📝 Note

- **Backup**: Întotdeauna fă backup înainte de migrare
- **Testing**: Testează pe local înainte de producție
- **Performance**: MySQL poate fi mai rapid pentru read-heavy workloads
- **Compatibility**: Strapi suportă oficial MySQL 5.7.8+

## 🆘 Suport

Dacă întâmpini probleme:
1. Verifică log-urile Strapi: `apps/cms/logs/`
2. Verifică conexiunea MySQL: `mysql -u root -p`
3. Verifică versiunea MySQL: `mysql --version`

