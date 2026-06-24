# ToumaiHub - Backend Spring Boot

Plateforme de formation digitale inspirée de GOMYCODE - API REST avec Spring Boot.

## 🚀 Démarrage

### Prérequis
- JDK 17 ou plus
- Maven 3.8+
- MySQL 8.0+ ou PostgreSQL

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd backend
```

2. **Configurer la base de données**

Créer une base de données MySQL:
```sql
CREATE DATABASE formation_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. **Configurer les variables d'environnement**

Éditer `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/formation_hub
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your-super-secret-key-change-this-in-production-at-least-32-characters-long
```

4. **Construire et lancer**

```bash
# Télécharger les dépendances et construire
mvn clean install

# Lancer l'application
mvn spring-boot:run
```

L'API sera accessible à `http://localhost:8080/api`

Swagger UI: `http://localhost:8080/api/swagger-ui.html`

## 📁 Structure du Projet

```
src/main/java/com/formationhub/
├── config/             # Configuration Spring
│   ├── SecurityConfig.java
│   ├── CorsConfig.java
│   └── OpenAPIConfig.java
├── controller/         # Contrôleurs REST
│   ├── AuthController.java
│   ├── FormationController.java
│   └── EnrollmentController.java
├── service/            # Logique métier
│   ├── AuthService.java
│   ├── FormationService.java
│   └── EnrollmentService.java
├── repository/         # Accès aux données
│   ├── UserRepository.java
│   ├── FormationRepository.java
│   └── EnrollmentRepository.java
├── entity/             # Modèles JPA
│   ├── User.java
│   ├── Formation.java
│   ├── Module.java
│   ├── Lesson.java
│   ├── Enrollment.java
│   └── ...
├── dto/                # Data Transfer Objects
│   └── DTOs.java
├── security/           # Configuration de sécurité JWT
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── JwtAuthenticationEntryPoint.java
└── FormationHubApplication.java
```

## 🔐 Authentification JWT

L'API utilise JWT (JSON Web Tokens) pour l'authentification.

### Endpoints d'authentification

```bash
# Connexion
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

# Réponse
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "...",
  "user": {...},
  "message": "Connexion réussie"
}

# Inscription
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jean",
  "lastName": "Dupont",
  "phone": "+213..."
}
```

### Utiliser le token

Ajouter le token dans le header Authorization:
```
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

## 📚 API Endpoints Principaux

### Formations

```bash
# Lister les formations
GET /api/formations?page=0&size=10

# Détail d'une formation
GET /api/formations/{id}

# Rechercher des formations
GET /api/formations/search?query=react

# Formations par domaine
GET /api/formations/by-domain/{domain}

# Formations actives
GET /api/formations/active
```

### Inscriptions (Protégé)

```bash
# S'inscrire à une formation
POST /api/enrollments/formations/{formationId}

# Mes inscriptions
GET /api/enrollments

# Détail d'une inscription
GET /api/enrollments/{id}

# Mettre à jour la progression
PUT /api/enrollments/{id}/progress?progress=50

# Annuler une inscription
DELETE /api/enrollments/{id}
```

## 🛠️ Technologies Utilisées

- **Spring Boot 3.1.5** - Framework web
- **Spring Security** - Authentification et autorisation
- **JWT (jjwt)** - Tokens JWT
- **Spring Data JPA** - ORM Hibernate
- **MySQL/PostgreSQL** - Base de données
- **Lombok** - Réduction du code
- **MapStruct** - Mapping d'objets
- **SpringDoc OpenAPI** - Documentation Swagger/OpenAPI
- **Maven** - Gestion des dépendances

## 🗄️ Modèle de Données

### Entités principales

- **User** - Utilisateurs (apprenants, formateurs, administrateurs)
- **Formation** - Programmes de formation
- **Module** - Modules au sein d'une formation
- **Lesson** - Leçons dans un module
- **Quiz** - Questionnaires
- **Project** - Projets pratiques
- **Enrollment** - Inscriptions des apprenants
- **Cohort** - Cohortes de formation
- **Certificate** - Certificats d'achèvement
- **Payment** - Paiements
- **Message** - Messagerie entre utilisateurs

## 🔒 Sécurité

- Authentification JWT avec tokens
- Autorisation basée sur les rôles (LEARNER, TRAINER, ADMIN)
- Hachage des mots de passe avec BCrypt
- Validation CORS configurable
- Protection CSRF désactivée pour les APIs (JWT)

## 📊 Logging et Monitoring

Configuration du logging dans `application.properties`:
```properties
logging.level.root=INFO
logging.level.com.formationhub=DEBUG
logging.level.org.springframework.web=DEBUG
```

## 🧪 Tests

```bash
# Lancer les tests
mvn test

# Tests avec couverture
mvn test jacoco:report
```

## 📦 Déploiement

### Build pour production

```bash
mvn clean package -DskipTests

# JAR généré
target/formation-hub-backend-1.0.0.jar
```

### Lancer en production

```bash
java -jar formation-hub-backend-1.0.0.jar \
  --spring.profiles.active=prod \
  --spring.datasource.url=jdbc:mysql://prod-db:3306/formation_hub \
  --spring.datasource.username=prod_user \
  --spring.datasource.password=prod_password \
  --jwt.secret=your-prod-secret-key
```

## 📝 Variables d'Environnement (Production)

```bash
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/formation_hub
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRATION=86400000
CORS_ALLOWED_ORIGINS=https://yourdomain.com
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## 🐛 Troubleshooting

### La base de données n'existe pas
```bash
# Créer manuellement
mysql -u root -p
> CREATE DATABASE formation_hub;
```

### Erreur de authentification
- Vérifier le JWT_SECRET (min 32 caractères)
- Vérifier que le token n'a pas expiré

### Port 8080 déjà en utilisation
```bash
# Changer le port dans application.properties
server.port=8081
```

## 📚 Documentation Supplémentaire

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [JWT (jjwt)](https://github.com/jwtk/jjwt)
- [OpenAPI/Swagger](https://springdoc.org)

## 🤝 Contribution

Les contributions sont bienvenues! Veuillez créer une branche pour votre feature.

```bash
git checkout -b feature/awesome-feature
git commit -m 'Add awesome feature'
git push origin feature/awesome-feature
```

## 📄 License

MIT

## 📧 Support

Pour toute question, contactez le team de développement.
