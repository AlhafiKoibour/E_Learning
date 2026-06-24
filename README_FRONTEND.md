# ToumaiHub - Frontend React

Plateforme de formation digitale inspirée de GOMYCODE.

## 🚀 Démarrage

### Prérequis
- Node.js >= 16.x
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

Le site sera accessible à `http://localhost:3000`

## 📁 Structure du Projet

```
src/
├── assets/           # Images et fichiers statiques
├── components/       # Composants réutilisables
├── context/          # Contextes React
├── hooks/            # Hooks personnalisés
├── pages/            # Pages de l'application
├── services/         # Services API
├── store/            # Zustand stores
├── styles/           # Feuilles de style
├── utils/            # Fonctions utilitaires
├── App.jsx           # Composant principal
└── main.jsx          # Point d'entrée
```

## 🛠️ Technologies Utilisées

- **React 18** - Framework UI
- **React Router v6** - Routage
- **Tailwind CSS** - Styling
- **Zustand** - Gestion d'état
- **Axios** - HTTP client
- **React Hook Form** - Gestion de formulaires
- **React Hot Toast** - Notifications
- **React Icons** - Icônes

## 📝 Variables d'Environnement

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=ToumaiHub
VITE_APP_VERSION=1.0.0
```

## 🏗️ Architecture

### Pages Principales

- **Home** - Page d'accueil avec présentation
- **Formations** - Catalogue des formations filtrable
- **FormationDetail** - Détails d'une formation
- **Login** - Connexion utilisateur
- **Register** - Inscription utilisateur
- **Dashboard** - Tableau de bord apprenant
- **Learning** - Interface d'apprentissage

### Stores (État Global)

- **authStore** - Gestion de l'authentification
- **formationStore** - Gestion des formations

### Services API

- **authService** - Authentification
- **userService** - Gestion utilisateur et inscriptions
- **formationService** - Formations, modules, leçons
- **messageService** - Messagerie
- **certificateService** - Certificats
- **jobService** - Offres d'emploi

## 🔐 Authentification

L'authentification utilise JWT tokens stockés en localStorage.

```javascript
// Exemple d'utilisation du hook useAuth
const { user, isAuthenticated, login, logout } = useAuth()
```

## 🎨 Personnalisation

### Couleurs

Modifiez les couleurs dans `tailwind.config.js`:

```javascript
colors: {
  primary: '#6366f1',   // Indigo
  secondary: '#ec4899', // Rose
  dark: '#1f2937',      // Gris foncé
}
```

## 📦 Build pour Production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `dist/`.

## 🧪 Tests

```bash
# (À implémenter)
npm run test
```

## 📚 Documentation Supplémentaire

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Zustand](https://github.com/pmndrs/zustand)

## 🤝 Contribution

Les contributions sont bienvenues! Veuillez créer une branche pour votre feature.

## 📄 License

MIT

## 📧 Support

Pour toute question, contactez le team de développement.
