// src/data/quizzes.js

const quizzesDatabase = {
  // --- DEVELOPPEMENT WEB ---
  web_module1: {
    title: "Quiz : HTML5, CSS3 et JavaScript Moderne",
    description: "Évaluez vos compétences sur la structure sémantique web, les mises en page modernes et les bases d'ES6.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Quelle balise HTML5 est la plus appropriée pour définir le contenu principal et unique d'une page ?",
        options: ["<section>", "<main>", "<div id=\"main\">", "<article>"],
        correct: 1,
        explanation: "La balise <main> représente le contenu principal unique du document. Elle ne doit être présente qu'une seule fois par page pour respecter les standards d'accessibilité et de SEO."
      },
      {
        id: 2,
        question: "Dans CSS Flexbox, quelle propriété permet de répartir l'espace restant de manière égale entre les éléments sur l'axe principal ?",
        options: ["align-items: center", "justify-content: space-between", "justify-content: center", "flex-wrap: wrap"],
        correct: 1,
        explanation: "La propriété justify-content: space-between place le premier élément au début, le dernier à la fin, et répartit l'espace disponible équitablement entre les autres éléments."
      },
      {
        id: 3,
        question: "Quelle est la principale différence entre 'let' et 'const' en JavaScript moderne (ES6+) ?",
        options: [
          "'let' est global tandis que 'const' est local",
          "'const' empêche toute modification du contenu d'un objet ou tableau",
          "'let' permet de réassigner une variable alors que 'const' lève une erreur en cas de réassignation",
          "'const' est plus rapide à s'exécuter que 'let'"
        ],
        correct: 2,
        explanation: "Une variable déclarée avec 'let' peut être réassignée ultérieurement. Une variable déclarée avec 'const' ne peut pas être réassignée (bien que ses propriétés internes, s'il s'agit d'un objet ou tableau, puissent être modifiées)."
      },
      {
        id: 4,
        question: "Quelle méthode de tableau ES6 retourne un nouveau tableau contenant uniquement les éléments qui valident une condition ?",
        options: [".map()", ".forEach()", ".reduce()", ".filter()"],
        correct: 3,
        explanation: "La méthode .filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine pour lesquels la fonction de rappel renvoie true."
      }
    ]
  },
  web_module2: {
    title: "Quiz : React et la gestion d'état",
    description: "Validez vos connaissances sur le fonctionnement de React, les composants, les props et les Hooks fondamentaux.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Qu'est-ce que le Virtual DOM dans React ?",
        options: [
          "Une copie complète de la base de données stockée en cache",
          "Une représentation légère en mémoire du DOM réel, utilisée pour optimiser les performances de rendu",
          "Une extension de navigateur pour déboguer le code React",
          "Un serveur virtuel exécutant du code JavaScript"
        ],
        correct: 1,
        explanation: "Le Virtual DOM est une représentation virtuelle du DOM réel. React l'utilise pour calculer les différences minimales (via le processus de 'reconciliation') et mettre à jour le DOM réel de manière ultra-rapide."
      },
      {
        id: 2,
        question: "Quelle est la règle d'or concernant la modification des 'props' reçues par un composant React ?",
        options: [
          "Elles doivent être modifiées uniquement à l'intérieur du hook useEffect",
          "Elles sont en lecture seule (immutables) et ne doivent jamais être modifiées directement par le composant enfant",
          "Elles peuvent être modifiées librement en utilisant l'opérateur '='",
          "Elles ne peuvent être modifiées que si le composant est une classe"
        ],
        correct: 1,
        explanation: "Les props sont immutables. Les données circulent de manière unidirectionnelle du parent vers l'enfant. Pour modifier une donnée initiée par le parent, l'enfant doit appeler une fonction fournie en prop par ce parent."
      },
      {
        id: 3,
        question: "Pour effectuer une requête API ou souscrire à un événement lors du chargement d'un composant, quel Hook React utilise-t-on ?",
        options: ["useState", "useContext", "useEffect", "useMemo"],
        correct: 2,
        explanation: "Le Hook useEffect permet d'exécuter des effets secondaires (requêtes HTTP, abonnements, manipulations manuelles du DOM) en réponse aux changements d'état ou au montage du composant."
      },
      {
        id: 4,
        question: "Dans quel cas la Context API de React est-elle particulièrement recommandée ?",
        options: [
          "Pour stocker des variables temporaires de formulaires",
          "Pour éviter le passage fastidieux de props sur de nombreux niveaux (prop drilling) pour des données globales (thème, utilisateur connecté)",
          "Pour accélérer les requêtes SQL du backend",
          "Pour remplacer complètement l'utilisation de useState dans l'application"
        ],
        correct: 1,
        explanation: "La Context API permet de partager des données globales avec l'ensemble de l'arbre des composants sans avoir à passer manuellement les props à chaque niveau intermédiaire."
      }
    ]
  },
  web_module3: {
    title: "Quiz : Backend Node.js et Express",
    description: "Évaluez votre compréhension des API REST, des middlewares, des bases de données et de l'authentification JWT.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Quel est le rôle de la boucle d'événements (Event Loop) dans Node.js ?",
        options: [
          "Exécuter des requêtes en base de données en parallèle sur plusieurs threads",
          "Permettre à Node.js de gérer les opérations d'E/S de manière non bloquante et asynchrone sur un seul thread",
          "Répéter une fonction indéfiniment jusqu'à l'arrêt du serveur",
          "Gérer le routage réseau du serveur Express"
        ],
        correct: 1,
        explanation: "Node.js est mono-threadé. L'Event Loop délègue les tâches lourdes d'E/S (lecture fichier, requêtes réseau) au système d'exploitation et exécute les fonctions de rappel (callbacks) dès qu'elles se terminent, évitant de bloquer le serveur."
      },
      {
        id: 2,
        question: "Dans une API REST, quelle méthode HTTP est sémantiquement appropriée pour mettre à jour partiellement une ressource existante ?",
        options: ["POST", "PUT", "PATCH", "DELETE"],
        correct: 2,
        explanation: "PATCH est conçu pour effectuer des modifications partielles sur une ressource, tandis que PUT remplace généralement la ressource entière."
      },
      {
        id: 3,
        question: "Qu'est-ce qu'un 'middleware' dans un framework comme Express ?",
        options: [
          "Une base de données intermédiaire",
          "Une fonction qui a accès aux objets request (req) et response (res) et qui s'exécute au cours du cycle de requête-réponse",
          "Un outil matériel pour équilibrer la charge réseau",
          "Le dossier racine contenant les modèles de données"
        ],
        correct: 1,
        explanation: "Les middlewares sont des fonctions exécutées séquentiellement par Express. Ils permettent de lire/modifier les requêtes, valider des jetons, logger des données ou renvoyer des réponses avant d'atteindre la route finale."
      },
      {
        id: 4,
        question: "Comment un client prouve-t-il son identité lors de requêtes ultérieures après s'être connecté via JWT ?",
        options: [
          "En renvoyant son mot de passe en texte clair dans chaque requête",
          "En incluant le jeton JWT dans l'en-tête HTTP 'Authorization: Bearer <token>'",
          "En partageant sa clé privée SSH avec le serveur",
          "Le JWT est stocké uniquement côté serveur, le client n'a rien à envoyer"
        ],
        correct: 1,
        explanation: "L'authentification par JWT est sans état (stateless). Le client stocke le jeton reçu lors du login et l'envoie dans l'en-tête standard 'Authorization' sous la forme 'Bearer <jeton>' lors de chaque requête protégée."
      }
    ]
  },
  web_module4: {
    title: "Quiz : Déploiement et Production",
    description: "Vérifiez vos acquis sur la gestion de versions avec Git, le déploiement continu et la conteneurisation.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Dans Git, comment fusionner les modifications d'une branche de fonctionnalité ('feature') dans la branche principale ('main') ?",
        options: ["git push origin main", "git merge feature (depuis la branche main)", "git checkout feature", "git init"],
        correct: 1,
        explanation: "Pour fusionner, vous devez d'abord vous positionner sur la branche de destination (git checkout main) puis exécuter la commande de fusion (git merge feature)."
      },
      {
        id: 2,
        question: "Qu'est-ce que l'intégration continue (CI) et le déploiement continu (CD) ?",
        options: [
          "Un processus de codage non-stop sans pause de développement",
          "Des pratiques automatisant les phases de tests, d'intégration du code et de mise en production à chaque modification du dépôt",
          "Un outil de sauvegarde des serveurs physiques",
          "Un protocole réseau de transfert de fichiers rapides"
        ],
        correct: 1,
        explanation: "La CI/CD permet d'automatiser les tests de validation, le build et le déploiement sur les serveurs de production à chaque fois qu'un développeur pousse du code sur GitHub, garantissant rapidité et stabilité."
      },
      {
        id: 3,
        question: "Quel est l'avantage principal de Docker pour le déploiement d'applications backend ?",
        options: [
          "Il permet de remplacer le code JavaScript par du code binaire plus rapide",
          "Il emballe l'application et toutes ses dépendances dans un conteneur isolé, assurant qu'elle fonctionne à l'identique sur n'importe quelle machine",
          "Il crypte la base de données automatiquement",
          "Il réduit les frais d'hébergement cloud à zéro"
        ],
        correct: 1,
        explanation: "Docker résout le problème classique du 'ça marche sur ma machine'. En encapsulant l'OS, les dépendances et l'application dans une image de conteneur, celle-ci s'exécutera exactement de la même manière en local, sur staging ou sur AWS."
      }
    ]
  },

  // --- DATA SCIENCE & MACHINE LEARNING ---
  data_module1: {
    title: "Quiz : Python pour l'analyse de données",
    description: "Évaluez vos compétences sur la manipulation de tableaux NumPy et de DataFrames Pandas.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Dans Pandas, quelle méthode permet d'éliminer toutes les lignes contenant des valeurs manquantes (NaN) ?",
        options: [".dropna()", ".fillna()", ".isna()", ".clean()"],
        correct: 0,
        explanation: ".dropna() supprime les lignes ou colonnes contenant des valeurs manquantes, tandis que .fillna() permet de les remplacer par une valeur par défaut."
      },
      {
        id: 2,
        question: "Quelle bibliothèque Python est la plus adaptée pour créer des visualisations statistiques complexes et esthétiques avec peu de code ?",
        options: ["NumPy", "Pandas", "Seaborn", "Math"],
        correct: 2,
        explanation: "Seaborn est construite sur Matplotlib et fournit une interface de haut niveau pour réaliser des graphiques statistiques attrayants et informatifs."
      }
    ]
  },
  data_module2: {
    title: "Quiz : Statistiques et Analyse Exploratoire (EDA)",
    description: "Mesurez votre compréhension des distributions, de la moyenne/écart-type et de l'EDA.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Que représente l'écart-type (Standard Deviation) d'un jeu de données ?",
        options: [
          "La valeur maximale moins la valeur minimale",
          "La valeur centrale qui coupe le jeu de données en deux",
          "La mesure de la dispersion ou de la variabilité des données par rapport à la moyenne",
          "La moyenne arithmétique simple"
        ],
        correct: 2,
        explanation: "L'écart-type mesure le degré de dispersion des valeurs autour de la moyenne. Un faible écart-type indique que les données sont regroupées près de la moyenne."
      }
    ]
  },
  data_module3: {
    title: "Quiz : Algorithmes de Machine Learning",
    description: "Testez votre maîtrise des concepts de régression, classification, et d'évaluation de modèles.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Qu'est-ce que le surapprentissage (overfitting) en Machine Learning ?",
        options: [
          "Lorsque le modèle s'entraîne trop lentement",
          "Lorsque le modèle mémorise le jeu d'entraînement mais ne parvient pas à généraliser sur de nouvelles données",
          "Lorsque le jeu de données d'entraînement contient trop d'exemples",
          "Lorsque le modèle fait des prédictions parfaites sur toutes les données"
        ],
        correct: 1,
        explanation: "L'overfitting se produit quand un algorithme apprenant le bruit des données d'entraînement. Le modèle est très précis sur ces données mais donne de mauvais résultats sur les données de test."
      }
    ]
  },

  // --- DESIGN UX/UI ---
  design_module1: {
    title: "Quiz : Fondations de l'UX Design",
    description: "Validez vos connaissances sur la recherche utilisateur, les personas et les parcours utilisateurs.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Dans le design UX, qu'est-ce qu'un 'Persona' ?",
        options: [
          "Le profil Linkedin du designer en charge du projet",
          "Un utilisateur fictif créé pour représenter un groupe cible de clients réels partageant des comportements et objectifs similaires",
          "Un bouton interactif sur l'interface",
          "Un document juridique listant les droits d'auteur"
        ],
        correct: 1,
        explanation: "Les personas aident l'équipe de design à empathiser avec les futurs utilisateurs et à prendre des décisions ergonomiques alignées sur leurs besoins réels."
      }
    ]
  },
  design_module2: {
    title: "Quiz : Principes de l'Interface Utilisateur (UI)",
    description: "Vérifiez vos notions sur la typographie, les contrastes de couleurs et les layouts.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Pour respecter l'accessibilité numérique (WCAG), quel est le ratio de contraste minimal recommandé pour le texte normal ?",
        options: ["1.5:1", "3:1", "4.5:1", "10:1"],
        correct: 2,
        explanation: "Le niveau AA des WCAG exige un ratio de contraste minimal de 4.5:1 pour le texte de taille standard afin de garantir une bonne lisibilité pour les personnes malvoyantes."
      }
    ]
  },
  design_module3: {
    title: "Quiz : Maîtrise de Figma et Prototypage",
    description: "Évaluez votre utilisation de l'auto-layout, des composants et des liaisons de prototypes.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Quelle fonction Figma permet de créer des conteneurs dynamiques qui s'ajustent automatiquement au contenu qu'ils contiennent ?",
        options: ["Smart Animate", "Auto Layout", "Create Component", "Grid Layout"],
        correct: 1,
        explanation: "L'Auto Layout permet de concevoir des boutons, des listes ou des cartes réactives qui s'étirent ou se réduisent à mesure que le texte ou les éléments à l'intérieur changent."
      }
    ]
  },

  // --- CYBERSECURITE ---
  cyber_module1: {
    title: "Quiz : Introduction à la cybersécurité",
    description: "Vérifiez vos bases sur la triade CIA et les attaques humaines courantes.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Qu'est-ce que le Phishing (Hameçonnage) ?",
        options: [
          "Une technique pour hacker des serveurs Wi-Fi publics",
          "Une tentative frauduleuse d'obtenir des informations sensibles en se faisant passer pour une entité de confiance via e-mail ou SMS",
          "Un virus qui détruit le disque dur physiquement",
          "Un protocole de chiffrement des fichiers système"
        ],
        correct: 1,
        explanation: "Le phishing s'appuie sur l'ingénierie sociale pour manipuler l'utilisateur et l'inciter à divulguer ses mots de passe ou coordonnées bancaires sur de fausses pages de connexion."
      }
    ]
  },
  cyber_module2: {
    title: "Quiz : Sécurisation des réseaux et systèmes",
    description: "Évaluez vos compétences sur les protocoles sécurisés (HTTPS, SSH) et les pare-feu.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Pourquoi le protocole HTTPS est-il plus sécurisé que HTTP ?",
        options: [
          "Il empêche le serveur de planter en cas de forte charge",
          "Il utilise le chiffrement SSL/TLS pour chiffrer l'ensemble du trafic entre le navigateur et le serveur",
          "Il est écrit dans un langage de programmation plus rapide",
          "Il filtre automatiquement les faux comptes"
        ],
        correct: 1,
        explanation: "HTTPS chiffre les requêtes et les réponses HTTP, empêchant les pirates d'intercepter des données sensibles (comme des mots de passe ou des numéros de carte de crédit) en transit via une attaque de type 'Man-in-the-Middle'."
      }
    ]
  },
  cyber_module3: {
    title: "Quiz : Cryptographie et Gestion des accès",
    description: "Testez votre compréhension du chiffrement symétrique/asymétrique, du MFA et du hachage.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Quelle est la principale caractéristique du chiffrement asymétrique ?",
        options: [
          "Il utilise la même clé secrète pour chiffrer et déchiffrer les données",
          "Il utilise une paire de clés : une clé publique (pour chiffrer) et une clé privée (pour déchiffrer)",
          "Il ne peut être déchiffré que par le créateur de l'application",
          "Il est obsolète et n'est plus utilisé sur internet"
        ],
        correct: 1,
        explanation: "Le chiffrement asymétrique résout le problème de l'échange de clés : n'importe qui peut chiffrer un message avec la clé publique du destinataire, mais seul le destinataire peut le lire grâce à sa clé privée."
      }
    ]
  },

  // --- GRAPHISME (PHOTOSHOP/ILLUSTRATOR) ---
  graphique_module1: {
    title: "Quiz : Traitement d'image avec Photoshop",
    description: "Validez vos notions sur les calques, masques de fusion et outils de détourage.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Pourquoi est-il conseillé d'utiliser les masques de fusion plutôt que l'outil Gomme sur Photoshop ?",
        options: [
          "L'outil Gomme ralentit les performances de l'ordinateur",
          "Le masque de fusion permet d'effacer le contenu de manière non destructive, avec possibilité de le restaurer à tout moment",
          "Les masques de fusion réduisent le poids du fichier final",
          "La gomme ne fonctionne pas sur les images importées"
        ],
        correct: 1,
        explanation: "Le masque de fusion cache des pixels sans les supprimer définitivement (le noir masque, le blanc révèle). C'est la base de la retouche professionnelle non destructive."
      }
    ]
  },

  // --- BUREAUTIQUE ---
  bureautique_module2: {
    title: "Quiz : Excel & Analyse de données",
    description: "Évaluez votre maîtrise des fonctions de calcul et des Tableaux Croisés Dynamiques.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: "Quelle fonction Excel permet de rechercher une valeur dans la première colonne d'un tableau et de renvoyer une valeur dans la même ligne à partir d'une autre colonne ?",
        options: ["=SOMME()", "=RECHERCHEV()", "=INDEX()", "=CONCATENER()"],
        correct: 1,
        explanation: "RECHERCHEV (VLOOKUP en anglais) cherche un élément ligne par ligne dans une colonne et renvoie l'information associée présente sur une autre colonne."
      }
    ]
  }
};

/**
 * Retourne le quiz correspondant au titre du module (par correspondance de mots clés).
 * @param {string} moduleTitle Le titre du module
 * @returns {object|null} L'objet quiz ou null s'il n'existe pas
 */
export const getQuizForModule = (moduleTitle) => {
  if (!moduleTitle) return null;
  const title = moduleTitle.toLowerCase();

  // Match Développement Web Module 1
  if (title.includes("html") || title.includes("css") || title.includes("javascript moderne")) {
    return quizzesDatabase.web_module1;
  }
  // Match Développement Web Module 2
  if (title.includes("react") || title.includes("gestion d'etat") || title.includes("gestion de l'etat")) {
    return quizzesDatabase.web_module2;
  }
  // Match Développement Web Module 3
  if (title.includes("backend") || title.includes("node") || title.includes("express")) {
    return quizzesDatabase.web_module3;
  }
  // Match Développement Web Module 4
  if (title.includes("deployement") || title.includes("deploiement") || title.includes("git")) {
    return quizzesDatabase.web_module4;
  }

  // Match Data Science Module 1
  if (title.includes("pandas") || title.includes("numpy") || title.includes("python pour l'analyse")) {
    return quizzesDatabase.data_module1;
  }
  // Match Data Science Module 2
  if (title.includes("statistiques") || title.includes("eda")) {
    return quizzesDatabase.data_module2;
  }
  // Match Data Science Module 3
  if (title.includes("algorithmes de machine") || title.includes("scikit-learn") || title.includes("machine learning")) {
    return quizzesDatabase.data_module3;
  }

  // Match UX/UI Module 1
  if (title.includes("fondations") && title.includes("ux")) {
    return quizzesDatabase.design_module1;
  }
  // Match UX/UI Module 2
  if (title.includes("principes") && title.includes("ui")) {
    return quizzesDatabase.design_module2;
  }
  // Match UX/UI Module 3
  if (title.includes("figma") || title.includes("prototypage")) {
    return quizzesDatabase.design_module3;
  }

  // Match Cybersécurité Module 1
  if (title.includes("cybersecurite et menaces") || title.includes("menaces")) {
    return quizzesDatabase.cyber_module1;
  }
  // Match Cybersécurité Module 2
  if (title.includes("reseaux et des systemes") || title.includes("protocoles securises")) {
    return quizzesDatabase.cyber_module2;
  }
  // Match Cybersécurité Module 3
  if (title.includes("cryptographie")) {
    return quizzesDatabase.cyber_module3;
  }

  // Match Graphisme Module 1
  if (title.includes("photoshop")) {
    return quizzesDatabase.graphique_module1;
  }

  // Match Bureautique Module 2
  if (title.includes("excel")) {
    return quizzesDatabase.bureautique_module2;
  }

  // Générer un quiz générique si le module n'a pas de quiz spécifique défini
  return {
    title: `Quiz : ${moduleTitle}`,
    description: "Évaluez vos compétences globales sur ce module.",
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: `Avez-vous bien compris et assimilé l'ensemble des notions de "${moduleTitle}" ?`,
        options: [
          "Oui, absolument. Je me sens prêt pour la suite !",
          "En partie, j'ai encore quelques points à revoir.",
          "Non, j'ai besoin de relire les supports de cours."
        ],
        correct: 0,
        explanation: "Félicitations pour votre honnêteté et votre engagement dans cette formation. C'est l'attitude idéale pour progresser !"
      }
    ]
  };
};
