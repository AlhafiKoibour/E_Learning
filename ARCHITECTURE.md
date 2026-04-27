# Architecture FormationHub

## 🏛️ Vue d'ensemble Architecturale

FormationHub suit une architecture **modulaire en trois couches** pour le backend et une architecture **component-based** pour le frontend.

```
┌─────────────────────────────────────────────────┐
│         Frontend (React + Vite)                 │
│  ┌───────────────────────────────────────────┐  │
│  │  Pages | Components | Hooks | Services   │  │
│  └───────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
                      ↓ (API calls)
┌─────────────────────────────────────────────────┐
│         Backend (Spring Boot 3.1.5)            │
│  ┌───────────────────────────────────────────┐  │
│  │  Controllers ↔ Services ↔ Repositories   │  │
│  └───────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────┐  │
│  │  Entities | DTOs | Security | Config     │  │
│  └───────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
                      ↓ (SQL queries)
┌─────────────────────────────────────────────────┐
│         Database (MySQL/PostgreSQL)             │
│  ┌───────────────────────────────────────────┐  │
│  │  Users | Formations | Enrollments | ...  │  │
│  └───────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

## 🔗 Patterns Architecturaux

### Backend

#### 1. Pattern MVC (Model-View-Controller)
- **Model**: Entités JPA (User, Formation, Module, etc.)
- **View**: DTOs pour les réponses API
- **Controller**: Endpoints REST

#### 2. Pattern Service Layer
Les services encapsulent la logique métier et les transactions:
```
Controller → Service → Repository → Database
```

#### 3. Pattern Repository
Spring Data JPA fournit une abstraction de la persistance:
- `UserRepository` pour accéder à la table users
- `FormationRepository` pour accéder à la table formations
- Etc.

#### 4. Pattern Dependency Injection
Utilisation de `@RequiredArgsConstructor` et Lombok pour l'injection:
```java
@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
}
```

#### 5. Pattern DTO (Data Transfer Object)
Séparation entre les entités internes et les données transmises:
- Entités JPA: `User.java`
- DTOs: `UserDTO`, `AuthResponse`

### Frontend

#### 1. Pattern Component-Based
Décomposition en composants réutilisables:
- Composants simples: `Button`, `Loading`, `Modal`
- Composants composés: `FormationCard`, `Navbar`
- Pages: `Home`, `Formations`, `Dashboard`

#### 2. Pattern Custom Hooks
Réutilisation de la logique:
- `useAuth()`: Gestion de l'authentification
- `useFetch()`: Requêtes HTTP génériques

#### 3. Pattern State Management (Zustand)
Gestion centralisée de l'état:
```javascript
// store/authStore.js
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: async (email, password) => { ... }
}))
```

#### 4. Pattern Service Layer
Abstraction des appels API:
```javascript
// services/authService.js
export const authService = {
  login: (email, password) => apiClient.post('/auth/login', ...),
  register: (data) => apiClient.post('/auth/register', ...)
}
```

#### 5. Pattern Protected Routes
Routes protégées par authentification:
```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

## 📊 Flux de Données

### Inscriptions à une Formation

```
1. User clicks "S'inscrire"
              ↓
2. EnrollmentController.enrollInFormation()
              ↓
3. EnrollmentService.enrollInFormation()
              ↓
4. Create Enrollment entity
              ↓
5. EnrollmentRepository.save()
              ↓
6. Database INSERT
              ↓
7. Return EnrollmentDTO
              ↓
8. Frontend updates Dashboard
```

### Authentification JWT

```
1. User submits login form
              ↓
2. AuthController.login()
              ↓
3. AuthService.login()
              ↓
4. AuthenticationManager verifies credentials
              ↓
5. JwtTokenProvider.generateToken()
              ↓
6. Return token + user info
              ↓
7. Frontend stores token in localStorage
              ↓
8. Add token to API headers
              ↓
9. JwtAuthenticationFilter validates token
              ↓
10. Request processed
```

## 🔐 Sécurité

### Authentification
- JWT tokens avec HS512 signing
- Refresh tokens pour les sessions longues
- Tokens stockés dans localStorage côté client

### Autorisation
- Rôles: LEARNER, TRAINER, ADMIN
- `@PreAuthorize` sur les endpoints
- SecurityContext pour vérifier les permissions

### Protection
- Mots de passe hashés avec BCrypt
- CORS configuré
- CSRF désactivé pour les APIs (JWT sécurise)

### Validation
- Bean Validation sur les DTOs
- Validation côté serveur obligatoire
- Sanitization des inputs

## 💾 Modèle de Données

### Entités Principales

```
User (1) ←→ (N) Enrollment → (1) Formation
  ↓
Enrollment (1) → (1) Certificate
  ↓
Enrollment (1) → (1) Payment
  ↓
Enrollment (N) ←→ (1) Cohort

Formation (1) ←→ (N) Module
Module (1) ←→ (N) Lesson
Module (1) ←→ (N) Quiz
Module (1) ←→ (N) Project

User (sender) (1) ←→ (N) Message → (1) User (recipient)
```

### Relations

#### One-to-Many
- Formation → Modules
- Module → Lessons, Quizzes, Projects
- User → Enrollments, Messages (sent)

#### Many-to-One
- Enrollment → User (learner)
- Enrollment → Formation
- Module → Formation

#### One-to-One
- Enrollment → Certificate
- Enrollment → Payment

## 📈 Scalabilité

### Backend

1. **Caching**
   - Spring Cache pour les formations (immuables)
   - Redis possible pour sessions

2. **Pagination**
   - Page<T> pour les résultats
   - Paramètres page/size configurable

3. **Indexing**
   - Index sur: email (users), title (formations), formation_id
   - À ajouter en production

4. **Connection Pooling**
   - HikariCP (par défaut dans Spring Boot)

### Frontend

1. **Code Splitting**
   - Routes lazy-loaded avec React.lazy()
   - Chunks séparés pour chaque page

2. **Caching**
   - localStorage pour les tokens
   - API caching possible

3. **Optimizations**
   - Image lazy-loading
   - Minification avec Vite
   - Tree-shaking

## 🔄 CI/CD (Future)

```
Git Push
   ↓
GitHub Actions
   ↓
┌─────────────────────────┐
│ Run Tests               │
│ Run Lint                │
│ Build Docker images     │
└─────────────────────────┘
   ↓
Deploy to staging
   ↓
Deploy to production
```

## 📦 Dépendances Clés

### Backend
```
Spring Boot: Framework principal
Spring Security: Authentification
Spring Data JPA: Persistence
jjwt: JWT tokens
Lombok: Réduction de boilerplate
MapStruct: DTO mapping
SpringDoc OpenAPI: Documentation API
```

### Frontend
```
React: Framework UI
React Router: Navigation
Zustand: State management
Tailwind CSS: Styling
Axios: HTTP client
Vite: Build tool
```

## 🚀 Performance Benchmarks (Cibles)

- **Frontend**: Lighthouse score > 90
- **Backend**: Réponse API < 200ms
- **Database**: Requêtes < 100ms
- **Page Load**: < 2 secondes

## 🔄 Flux de Développement

### Ajouter une nouvelle feature (exemple: Quiz)

1. **Backend**
   - Créer entité: `Quiz.java`
   - Créer repository: `QuizRepository`
   - Créer service: `QuizService`
   - Créer DTO: `QuizDTO`
   - Créer controller: `QuizController`

2. **Frontend**
   - Créer service API: `quizService.js`
   - Créer store (si nécessaire): `quizStore.js`
   - Créer composants: `QuizCard`, `QuizDetail`, `QuizStart`
   - Créer pages: `Quiz.jsx`
   - Ajouter routes

3. **Database**
   - Créer migration (optionnel avec Flyway)
   - Vérifier les relations

## 📊 Architecture Décisions

| Décision | Raison |
|----------|--------|
| Zustand vs Redux | Plus léger, plus simple pour ce cas |
| Tailwind vs Material | Personnalisation, performance |
| JWT vs Sessions | Scalabilité, APIs RESTful |
| Vite vs Webpack | Speed, module moderne native |
| Spring Boot vs Quarkus | Écosystème mature, docs |
| JPA vs Raw SQL | Maintainability, type-safety |

## 🎯 Recommandations Futures

1. Ajouter des tests unitaires et d'intégration
2. Implémenter Redis pour le caching
3. Ajouter logging structuré (ELK stack)
4. Implémenter monitoring (Prometheus)
5. Ajouter GraphQL comme alternative
6. Implémenter WebSockets pour le chat en temps réel
7. Ajouter pagination côté React
8. Optimiser les queries (n+1 problems)
9. Ajouter API rate limiting
10. Implémenter audit logging

---

Pour plus de détails, voir:
- [README Backend](./README_BACKEND.md)
- [README Frontend](./README_FRONTEND.md)
