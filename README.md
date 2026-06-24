# ToumaiHub - Plateforme de Formation Digitale

Plateforme web et mobile de formation digitale inspirée de GOMYCODE, avec des parcours en design, data, développement web, marketing digital et IA, en mode en ligne ou hybride.

## 📋 Vue d'ensemble

ToumaiHub est une plateforme complète de formation digitale qui permet à des apprenants de:
- Découvrir et explorer des programmes de formation
- S'inscrire à des formations
- Suivre des cours en ligne
- Réaliser des projets pratiques
- Obtenir des certificats reconnus
- Accéder à des opportunités d'emploi
- Communiquer avec des formateurs et mentors

## 🏗️ Architecture

Le projet est divisé en deux parties:

### Frontend (React)
- Interface utilisateur responsive avec React 18
- Gestion d'état avec Zustand
- Styling avec Tailwind CSS
- Routage avec React Router v6
- Notifications avec React Hot Toast

### Backend (Spring Boot)
- API REST avec Spring Boot 3.1.5
- Authentification JWT
- Base de données MySQL/PostgreSQL
- Services métier bien structurés
- Documentation OpenAPI/Swagger

## 📦 Structure du Projet

```
Project/
├── frontend/                  # Application React
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/            # Pages de l'application
│   │   ├── services/         # Services API
│   │   ├── store/            # Zustand stores
│   │   ├── hooks/            # Hooks personnalisés
│   │   ├── styles/           # Feuilles de style
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README_FRONTEND.md
│
├── backend/                   # Application Spring Boot
│   ├── src/
│   │   ├── main/java/com/formationhub/
│   │   │   ├── config/       # Configuration Spring
│   │   │   ├── controller/   # Contrôleurs REST
│   │   │   ├── service/      # Services métier
│   │   │   ├── repository/   # Repositories JPA
│   │   │   ├── entity/       # Entités JPA
│   │   │   ├── dto/          # Data Transfer Objects
│   │   │   ├── security/     # Configuration JWT
│   │   │   └── exception/    # Gestion des erreurs
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml
│   └── README_BACKEND.md
│
├── README.md                  # Ce fichier
├── .gitignore
└── .env.example
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js >= 16.x
- JDK 17+
- MySQL 8.0+ ou PostgreSQL
- Maven 3.8+

### Installation du Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Accédez à: `http://localhost:3000` (Vite) ou `http://localhost:5173` (Vite par défaut)

### Installation du Backend

```bash
cd backend

# 1. Créer la base de données
mysql -u root -p
> CREATE DATABASE formation_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 2. Configurer application.properties
# Éditer: src/main/resources/application.properties

# 3. Démarrer l'application
mvn spring-boot:run
```

L'API sera accessible à: `http://localhost:8080/api`
Documentation Swagger: `http://localhost:8080/api/swagger-ui.html`

## 🔧 Configuration

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=ToumaiHub
VITE_APP_VERSION=1.0.0
```

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/formation_hub
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your-super-secret-key-min-32-chars
```

## 📚 Fonctionnalités Principales

### Pour les Apprenants
- ✅ Parcourir le catalogue de formations
- ✅ Filtrer par domaine, niveau, mode
- ✅ S'inscrire à une formation
- ✅ Suivre des cours vidéo
- ✅ Accéder aux ressources et exercices
- ✅ Soumettre des projets
- ✅ Passer des quizzes
- ✅ Obtenir des certificats
- ✅ Communiquer avec les formateurs
- ✅ Voir les opportunités d'emploi
- ✅ Tracker sa progression

### Pour les Formateurs/Admins
- ✅ Créer et gérer les formations
- ✅ Créer les modules et leçons
- ✅ Gérer les cohortes
- ✅ Évaluer les apprenants
- ✅ Générer des rapports
- ✅ Gérer les paiements
- ✅ Voir les statistiques

## 🌟 Modules Clés

| Module | Description | Statut |
|--------|-------------|--------|
| **Authentification** | Login, Register, JWT | ✅ Complété |
| **Formations** | Catalogue, détails, filtres | ✅ Complété |
| **Inscriptions** | Enrollment, progression | ✅ Complété |
| **Apprentissage** | Vidéos, leçons, ressources | 🔄 En cours |
| **Projets** | Énoncés, soumission, évaluation | 📋 Planifié |
| **Quizzes** | Questionnaires, notation | 📋 Planifié |
| **Certificats** | Génération, téléchargement | 📋 Planifié |
| **Paiements** | Intégration gateway | 📋 Planifié |
| **Messagerie** | Chat, notifications | 📋 Planifié |
| **Admin Dashboard** | Gestion globale | 📋 Planifié |

## 🔐 Authentification & Sécurité

- JWT tokens avec refresh tokens
- Mot de passe hashés avec BCrypt
- CORS configurable
- Autorisation basée sur les rôles (LEARNER, TRAINER, ADMIN)
- Validation des requêtes avec Bean Validation

## 💾 Base de Données

Entités principales:
- **User** (apprenants, formateurs, admins)
- **Formation** (programmes)
- **Module** (chapitres)
- **Lesson** (leçons)
- **Quiz** (questionnaires)
- **Project** (projets)
- **Enrollment** (inscriptions)
- **Cohort** (cohortes)
- **Certificate** (certificats)
- **Payment** (paiements)
- **Message** (messagerie)

## 🌐 Intégrations Futures

- Passerelle de paiement (Stripe, PayPal, Wave)
- Système d'email (SendGrid, Gmail SMTP)
- Visioconférence (Zoom, Google Meet)
- Stockage cloud (AWS S3, GCP)
- Analytics (Google Analytics, Mixpanel)
- CRM pour les opportunités d'emploi

## 📊 Performance

### Frontend
- Code splitting avec Vite
- Lazy loading des routes
- Optimisation des images
- Caching des données API
- Minification et bundling

### Backend
- Pagination des résultats
- Caching avec Spring Cache
- Requêtes optimisées (projections)
- Index de base de données
- Connection pooling

## 🧪 Testing

```bash
# Frontend
npm run lint

# Backend
mvn test
```

## 📈 Déploiement

### Frontend
```bash
npm run build
# Fichiers statiques dans dist/
```

### Backend
```bash
mvn clean package -DskipTests
# JAR généré dans target/
```

Voir `README_FRONTEND.md` et `README_BACKEND.md` pour plus de détails.

## 🛠️ Stack Technologique

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Zustand
- Axios
- React Hook Form
- React Hot Toast
- Vite
- React Icons

### Backend
- Spring Boot 3.1.5
- Spring Security
- Spring Data JPA
- JWT (jjwt)
- MySQL/PostgreSQL
- Lombok
- MapStruct
- SpringDoc OpenAPI
- Maven

## 📖 Documentation

- [Frontend Documentation](./README_FRONTEND.md)
- [Backend Documentation](./README_BACKEND.md)
- [API Documentation](http://localhost:8080/api/swagger-ui.html) (après lancement du backend)

## 🤝 Contribution

Les contributions sont bienvenues! Veuillez:

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Convention de Code

- **Frontend**: Composants fonctionnels avec Hooks, naming en camelCase
- **Backend**: Classes avec Lombok, repositories avec Spring Data, services métier

## 🐛 Signaler un Bug

Créez une issue avec:
- Description du bug
- Étapes pour reproduire
- Comportement attendu vs actuel
- Screenshots si possible

## 📧 Contact

Pour toute question ou suggestion:
- Email: support@toumaihub.com
- Issues: Utilisez GitHub Issues

## 📄 License

MIT License - voir LICENSE pour plus de détails

## 🙏 Remerciements

Inspiré par GOMYCODE et les meilleures pratiques du développement web moderne.

---

**Dernière mise à jour**: Avril 2024
**Version**: 1.0.0 (MVP)
