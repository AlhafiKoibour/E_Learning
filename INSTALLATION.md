# Guide d'Installation - FormationHub

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé:

- **Node.js** >= 16.x (pour le frontend)
  - [Télécharger Node.js](https://nodejs.org/)
  
- **JDK 17** (pour le backend)
  - [Télécharger JDK 17](https://www.oracle.com/java/technologies/downloads/#java17)
  - Ou utilisez [OpenJDK](https://openjdk.java.net/)
  
- **Maven** >= 3.8 (pour le build du backend)
  - [Télécharger Maven](https://maven.apache.org/download.cgi)
  - Vérifier: `mvn --version`
  
- **MySQL 8.0** ou **PostgreSQL** (base de données)
  - [Télécharger MySQL](https://www.mysql.com/downloads/)
  - [Télécharger PostgreSQL](https://www.postgresql.org/download/)

- **Git** (pour cloner le repository)
  - [Télécharger Git](https://git-scm.com/)

## 🛠️ Installation Complète

### 1️⃣ Cloner le repository

```bash
git clone <url-du-repository>
cd Project
```

### 2️⃣ Configurer et démarrer MySQL

#### Windows (avec installer MySQL)
```bash
# Le service MySQL devrait être démarré automatiquement
# Vérifier la connexion
mysql -u root -p
# Entrer le mot de passe si défini
```

#### Linux/Mac
```bash
# Démarrer MySQL
brew services start mysql  # Mac
sudo service mysql start   # Linux
```

#### Avec Docker (recommandé)
```bash
# Lancer MySQL via Docker Compose
docker-compose up -d mysql

# Vérifier que c'est en cours d'exécution
docker-compose ps
```

### 3️⃣ Créer la base de données

```bash
# Se connecter à MySQL
mysql -u root -p

# Exécuter:
CREATE DATABASE formation_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'formation_user'@'localhost' IDENTIFIED BY 'formation_password';
GRANT ALL PRIVILEGES ON formation_hub.* TO 'formation_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Ou si vous utilisez PostgreSQL:
```bash
createdb formation_hub
psql formation_hub
CREATE USER formation_user WITH PASSWORD 'formation_password';
GRANT ALL PRIVILEGES ON DATABASE formation_hub TO formation_user;
```

### 4️⃣ Installer et démarrer le Backend

```bash
cd backend

# Copier le fichier de configuration
cp .env.example .env.local

# Éditer application.properties avec vos paramètres de base de données
# nano/vim src/main/resources/application.properties

# Installer les dépendances et démarrer
mvn clean install
mvn spring-boot:run
```

✅ Le backend est maintenant accessible à: `http://localhost:8080/api`

📚 Swagger/OpenAPI: `http://localhost:8080/api/swagger-ui.html`

### 5️⃣ Installer et démarrer le Frontend

Ouvrir un nouveau terminal:

```bash
cd frontend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

✅ Le frontend est maintenant accessible à: `http://localhost:5173` (Vite)

## 🚀 Démarrage Rapide (Linux/Mac)

Si tout est déjà configuré:

```bash
# Terminal 1 - Backend
cd backend && mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## 🐳 Installation avec Docker

Pour une installation simplifiée avec Docker:

```bash
# Lancer tous les services
docker-compose up -d

# Vérifier les services
docker-compose ps

# Afficher les logs
docker-compose logs -f mysql

# Arrêter les services
docker-compose down
```

**Note**: Vous devrez toujours lancer le backend et frontend localement, ou créer des images Docker pour eux.

## 🔧 Configuration Post-Installation

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=FormationHub
VITE_APP_VERSION=1.0.0
```

### Backend (application.properties)

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/formation_hub
spring.datasource.username=formation_user
spring.datasource.password=formation_password

# JWT
jwt.secret=votre-cle-secrete-min-32-caracteres-changez-en-production
jwt.expiration=86400000

# CORS
cors.allowedOrigins=http://localhost:3000,http://localhost:5173
```

## ✅ Vérification de l'Installation

### Backend
```bash
# Tester la connexion API
curl http://localhost:8080/api/formations

# Réponse attendue:
# {"content": [], "totalElements": 0, ...}
```

### Frontend
```bash
# Vérifier que l'application se charge
# Ouvrir: http://localhost:5173
# Vous devez voir la page d'accueil
```

## 🐛 Troubleshooting

### Port 8080 déjà en utilisation
```bash
# Changer le port dans application.properties
server.port=8081
```

### Port 3000/5173 déjà en utilisation
```bash
# Spécifier un port différent
npm run dev -- --port 3001
```

### Erreur de base de données
```bash
# Vérifier la connexion MySQL
mysql -u formation_user -p formation_hub

# Vérifier les logs du backend
tail -f backend/logs/application.log
```

### Erreur JWT
- Vérifier que `jwt.secret` a au moins 32 caractères
- Vérifier que le token n'a pas expiré

### Erreur CORS
- Vérifier `cors.allowedOrigins` dans application.properties
- Assurez-vous que le frontend utilise l'URL correcte

## 📚 Documentation

- [Frontend Documentation](./README_FRONTEND.md)
- [Backend Documentation](./README_BACKEND.md)
- [README Principal](./README.md)

## 🆘 Support

En cas de problème:
1. Vérifier les logs (`docker-compose logs`)
2. Vérifier la configuration (ports, credentials, etc.)
3. Vérifier que tous les prérequis sont installés
4. Créer une issue avec les détails du problème

---

**Installation réussie!** 🎉

Vous pouvez maintenant:
- Visiter le frontend: `http://localhost:5173`
- Consulter l'API: `http://localhost:8080/api`
- Voir la documentation Swagger: `http://localhost:8080/api/swagger-ui.html`
