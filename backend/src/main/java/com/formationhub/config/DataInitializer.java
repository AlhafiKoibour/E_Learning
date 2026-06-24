package com.formationhub.config;

import com.formationhub.dto.FormationDTO;
import com.formationhub.entity.Formation;
import com.formationhub.entity.Module;
import com.formationhub.entity.Lesson;
import com.formationhub.repository.FormationRepository;
import com.formationhub.repository.ModuleRepository;
import com.formationhub.repository.LessonRepository;
import com.formationhub.service.FormationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final FormationRepository formationRepository;
    private final FormationService formationService;
    private final ModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;

    @Override
    public void run(String... args) {
        if (formationRepository.count() > 0) {
            log.info("Formations already exist in database, skipping formations seeding");
        } else {
            log.info("No formations found, initializing seed data...");

            List<FormationDTO> formations = List.of(
                FormationDTO.builder()
                    .title("Developpement Web Moderne")
                    .description("Apprenez a creer des applications web reactives avec React, Node.js et les meilleures pratiques modernes.")
                    .domain("dev")
                    .level("BEGINNER")
                    .duration(8)
                    .price(0.0)
                    .image("https://images.unsplash.com/photo-1515378791036-0648a3ef77b2")
                    .rating(4.8)
                    .reviews(34)
                    .participants(120)
                    .mode("ONLINE")
                    .isActive(true)
                    .objectives(List.of("Comprendre le HTML/CSS/JS modernes", "Maitriser React et les hooks", "Deployer une application web"))
                    .prerequisites(List.of("Notions de programmation", "Aimer le web"))
                    .includes(List.of("Projets concrets", "Support de cours", "Certificat de fin de formation"))
                    .whatYouWillLearn("Creer et deployer des applications web modernes utilisant React et Node.js.")
                    .build(),

                FormationDTO.builder()
                    .title("Data Science et Machine Learning")
                    .description("Devenez un expert en science des donnees avec Python, pandas, scikit-learn et des techniques de machine learning.")
                    .domain("data")
                    .level("INTERMEDIATE")
                    .duration(10)
                    .price(0.0)
                    .image("https://images.unsplash.com/photo-1517142089942-ba376ce32a2e")
                    .rating(4.7)
                    .reviews(54)
                    .participants(89)
                    .mode("HYBRID")
                    .isActive(true)
                    .objectives(List.of("Analyser des jeux de donnees", "Construire des modeles predictifs", "Visualiser les resultats"))
                    .prerequisites(List.of("Notions de Python", "Statistiques de base"))
                    .includes(List.of("Datasets reels", "Projets en groupe", "Acces aux ressources"))
                    .whatYouWillLearn("Utiliser Python et machine learning pour resoudre des problemes data reels.")
                    .build(),

                FormationDTO.builder()
                    .title("Design UX/UI pour debutants")
                    .description("Apprenez a concevoir des interfaces utilisateur engageantes et ergonomiques pour applications web et mobiles.")
                    .domain("design")
                    .level("BEGINNER")
                    .duration(6)
                    .price(0.0)
                    .image("https://images.unsplash.com/photo-1498050108023-c5249f4df085")
                    .rating(4.9)
                    .reviews(22)
                    .participants(74)
                    .mode("ONLINE")
                    .isActive(true)
                    .objectives(List.of("Comprendre les principes UX", "Maitriser le prototypage", "Creer des interfaces attractives"))
                    .prerequisites(List.of("Curiosite pour le design"))
                    .includes(List.of("Templates Figma", "Cas pratiques", "Feedback personnalise"))
                    .whatYouWillLearn("Concevoir des experiences utilisateurs efficaces et belles.")
                    .build(),

                FormationDTO.builder()
                    .title("Design Graphique avec Photoshop et Illustrator")
                    .description("Maitrisez le graphisme : Photoshop pour la retouche photo et Illustrator pour le dessin vectoriel et la creation de logos.")
                    .domain("design")
                    .level("BEGINNER")
                    .duration(6)
                    .price(0.0)
                    .image("https://images.unsplash.com/photo-1626785774573-4b799315345d")
                    .rating(4.7)
                    .reviews(31)
                    .participants(85)
                    .mode("ONLINE")
                    .isActive(true)
                    .objectives(List.of("Maitriser Photoshop", "Maitriser Illustrator", "Creer des logos professionnels"))
                    .prerequisites(List.of("Aucun prerequis requis"))
                    .includes(List.of("Cas pratiques", "Templates professionnels", "Feedback personnalise"))
                    .whatYouWillLearn("Concevoir des identites visuelles, logos et affiches.")
                    .build(),

                FormationDTO.builder()
                    .title("Bureautique Professionnelle (Word, Excel, PowerPoint)")
                    .description("Devenez un expert des outils bureautiques : Word pour le traitement de texte, Excel pour les tableaux et analyses, PowerPoint pour les presentations.")
                    .domain("bureautique")
                    .level("BEGINNER")
                    .duration(5)
                    .price(0.0)
                    .image("https://images.unsplash.com/photo-1499951360447-b19be8fe80f5")
                    .rating(4.5)
                    .reviews(45)
                    .participants(150)
                    .mode("HYBRID")
                    .isActive(true)
                    .objectives(List.of("Maitriser Word pour la redaction", "Utiliser Excel pour les calculs et analyses", "Creer des presentations impactantes avec PowerPoint"))
                    .prerequisites(List.of("Savoir utiliser un ordinateur"))
                    .includes(List.of("Exercices pratiques", "Templates", "Support de cours"))
                    .whatYouWillLearn("Utiliser les outils bureautiques pour etre plus productif au travail.")
                    .build(),

                FormationDTO.builder()
                    .title("Cybersecurite et Protection des Systemes")
                    .description("Apprenez les bases de la cybersecurite : securisation des reseaux, cryptographie, gestion des acces et prevention des menaces.")
                    .domain("cybersecurite")
                    .level("BEGINNER")
                    .duration(6)
                    .price(0.0)
                    .image("https://images.unsplash.com/photo-1550751827-4bd374c3f58b")
                    .rating(4.8)
                    .reviews(19)
                    .participants(62)
                    .mode("ONLINE")
                    .isActive(true)
                    .objectives(List.of("Comprendre les types d'attaques", "Securiser des serveurs", "Maitriser les bases de la cryptographie"))
                    .prerequisites(List.of("Bases en informatique et reseaux"))
                    .includes(List.of("Laboratoires virtuels", "Support de cours", "Quiz d'evaluation"))
                    .whatYouWillLearn("Securiser des systemes informatiques et detecter les vulnerabilites.")
                    .build()
            );

            for (FormationDTO dto : formations) {
                try {
                    FormationDTO created = formationService.createFormation(dto);
                    log.info("Created formation: {} (id={})", created.getTitle(), created.getId());
                } catch (Exception e) {
                    log.error("Failed to create formation '{}': {}", dto.getTitle(), e.getMessage());
                }
            }
            log.info("Data initialization complete. {} formations created.", formationRepository.count());
        }

        seedModulesAndLessons();
    }

    private void seedModulesAndLessons() {
        log.info("Checking if modules need to be seeded...");
        List<Formation> formations = formationRepository.findAll();
        for (Formation formation : formations) {
            List<Module> existingModules = moduleRepository.findByFormationIdOrderByOrderIndex(formation.getId());
            if (existingModules.isEmpty()) {
                log.info("Seeding modules for formation: {}", formation.getTitle());
                createModulesForFormation(formation);
            } else {
                log.info("Formation '{}' already has {} modules, skipping.", formation.getTitle(), existingModules.size());
            }
        }
    }

    private void createModulesForFormation(Formation formation) {
        String title = formation.getTitle().toLowerCase();
        if (title.contains("web")) {
            Module m1 = createModule(formation, "Introduction au HTML5, CSS3 et JavaScript Moderne", "Apprenez les bases indispensables du developpement web client.", 1, 10);
            createLesson(m1, "Introduction au Web et architecture client-serveur", "Comprendre le fonctionnement d'Internet, des serveurs et des navigateurs.", 1, 20, "https://www.w3schools.com/html/movie.mp4", "/docs/intro-web.pdf");
            createLesson(m1, "HTML5 semantique et bonnes pratiques", "Structurez vos pages web avec les balises HTML5 appropriees pour le SEO.", 2, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/html-semantique.pdf");
            createLesson(m1, "CSS3 moderne, Flexbox et Grid", "Mettez en page et donnez du style a vos applications avec Flexbox et Grid.", 3, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/css-layout.pdf");
            createLesson(m1, "Les bases de JavaScript ES6+", "Manipulez le DOM et gerez l'interactivite avec JavaScript moderne.", 4, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/js-es6.pdf");

            Module m2 = createModule(formation, "Maitriser React et la gestion d'etat", "Developpez des interfaces dynamiques et reutilisables.", 2, 15);
            createLesson(m2, "Debuter avec React et JSX", "Comprendre le concept de composants et l'architecture de React.", 1, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/react-jsx.pdf");
            createLesson(m2, "Les composants et props", "Passer des donnees aux composants enfants de maniere unidirectionnelle.", 2, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/react-components.pdf");
            createLesson(m2, "Gestion de l'etat avec useState et useEffect", "Gerer le cycle de vie et les etats locaux de vos composants.", 3, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/react-state.pdf");
            createLesson(m2, "Les Hooks personnalises et Context API", "Partager l'etat global et encapsuler la logique reutilisable.", 4, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/react-context.pdf");

            Module m3 = createModule(formation, "Developpement Backend avec Node.js et Express", "Creez des API REST performantes et securisees.", 3, 15);
            createLesson(m3, "Bases de Node.js et architecture asynchrone", "Comprendre le fonctionnement evenementiel et asynchrone de Node.js.", 1, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/node-basics.pdf");
            createLesson(m3, "Creer une API REST avec Express", "Mettre en place des routes, des controleurs et gerer les requetes HTTP.", 2, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/express-api.pdf");
            createLesson(m3, "Connexion a une base de donnees", "Utiliser un ORM/ODM pour interagir avec PostgreSQL ou MongoDB.", 3, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/db-conn.pdf");
            createLesson(m3, "Authentification et securite (JWT)", "Securiser les endpoints avec JSON Web Tokens et le hachage de mots de passe.", 4, 50, "https://www.w3schools.com/html/movie.mp4", "/docs/auth-jwt.pdf");

            Module m4 = createModule(formation, "Deployement et bonnes pratiques de production", "Mettez en ligne vos projets et configurez la CI/CD.", 4, 8);
            createLesson(m4, "Versioning avec Git et GitHub", "Travailler en equipe et gerer les branches sur vos projets.", 1, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/git-github.pdf");
            createLesson(m4, "Deployement frontend (Vercel/Netlify)", "Automatiser le deploiement continu de vos applications React.", 2, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/deploy-front.pdf");
            createLesson(m4, "Deployement backend (Render/Docker)", "Conteneuriser et heberger vos services web en production.", 3, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/deploy-back.pdf");
        } else if (title.contains("ux/ui")) {
            Module m1 = createModule(formation, "Fondations du Design d'Experience Utilisateur (UX)", "Comprendre les besoins utilisateurs pour concevoir des produits utiles.", 1, 8);
            createLesson(m1, "Qu'est-ce que l'UX Design ?", "Definition, historique et importance de l'UX dans la tech moderne.", 1, 20, "https://www.w3schools.com/html/movie.mp4", "/docs/intro-ux.pdf");
            createLesson(m1, "Recherche utilisateur et creation de Personas", "Methodes d'interview, d'observation et modelisation des profils d'utilisateurs.", 2, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/ux-personas.pdf");
            createLesson(m1, "Experience utilisateur et parcours (User Journey)", "Creer des cartes de parcours utilisateur pour identifier les points de friction.", 3, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/user-journey.pdf");

            Module m2 = createModule(formation, "Principes de l'Interface Utilisateur (UI)", "Apprendre a creer des maquettes esthetiques et coherentes.", 2, 8);
            createLesson(m2, "Theorie des couleurs et contrastes", "Choisir une palette de couleurs harmonieuse et conforme aux normes d'accessibilite.", 1, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/ui-colors.pdf");
            createLesson(m2, "Typographie et hierarchie visuelle", "Selectionner des polices et organiser le contenu pour guider le regard de l'utilisateur.", 2, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/ui-typography.pdf");
            createLesson(m2, "Systemes de grille et layout", "Structurer vos maquettes avec des grilles de mise en page reactives.", 3, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/ui-grids.pdf");

            Module m3 = createModule(formation, "Maitrise de Figma et prototypage", "Creez des prototypes haute fidelite interactifs.", 3, 10);
            createLesson(m3, "Introduction a Figma et outils de dessin", "Prise en main de l'interface, des calques, groupes et vecteurs.", 1, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/figma-intro.pdf");
            createLesson(m3, "Auto-layout et composants reutilisables", "Concevoir des elements reactifs et creer des systemes de composants robustes.", 2, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/figma-components.pdf");
            createLesson(m3, "Creation de prototypes interactifs", "Relier les ecrans, ajouter des transitions et des micro-animations.", 3, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/figma-prototyping.pdf");
        } else if (title.contains("graphique")) {
            Module m1 = createModule(formation, "Photoshop pour le traitement d'image et le compositing", "Maitriser le logiciel leader de retouche d'image.", 1, 15);
            createLesson(m1, "Decouverte de l'interface et gestion des calques", "Comprendre l'espace de travail et la logique non-destructive des calques.", 1, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/photoshop-interface.pdf");
            createLesson(m1, "Outils de selection et detourage precis", "Utiliser la plume, le lasso et la selection rapide pour detourer des objets complexes.", 2, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/photoshop-selection.pdf");
            createLesson(m1, "Retouche photo professionnelle et colorimetrie", "Corriger l'exposition, les imperfections et ajuster les couleurs.", 3, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/photoshop-retouch.pdf");
            createLesson(m1, "Effets de calques et masques de fusion", "Creer des compositions réalistes en utilisant des masques et des filtres dynamiques.", 4, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/photoshop-compositing.pdf");

            Module m2 = createModule(formation, "Illustrator pour le dessin vectoriel et creation de logos", "Creez des illustrations redimensionnables a l'infini.", 2, 15);
            createLesson(m2, "Introduction au vectoriel et outil plume", "Comprendre la difference pixel/vecteur et dompter l'outil plume.", 1, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/illustrator-pen.pdf");
            createLesson(m2, "Conception de logos professionnels", "Methodologie de creation de logo et utilisation de la grille de construction.", 2, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/illustrator-logos.pdf");
            createLesson(m2, "Typographie creative et vectorisation d'image", "Manipuler le texte et transformer des dessins scannes en traces vectoriels.", 3, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/illustrator-typo.pdf");

            Module m3 = createModule(formation, "Finalisation de projets et exportation", "Preparez vos projets pour leurs supports finaux.", 3, 5);
            createLesson(m3, "Preparation des fichiers pour l'impression (CMJN)", "Gerer les fonds perdus, les marges de securite et le profil colorimetrique pour l'imprimeur.", 1, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/print-prep.pdf");
            createLesson(m3, "Exportation web et formats de fichiers (PNG, SVG, PDF)", "Optimiser les tailles de fichiers et choisir le bon format selon l'usage.", 2, 20, "https://www.w3schools.com/html/movie.mp4", "/docs/export-formats.pdf");
        } else if (title.contains("bureautique")) {
            Module m1 = createModule(formation, "Word pour la redaction et mise en page de documents", "Creez des rapports administratifs et memoires professionnels.", 1, 6);
            createLesson(m1, "Prise en main de Word et saisie de texte", "Decouverte de l'interface, gestion du presse-papier et de la mise en forme de base.", 1, 20, "https://www.w3schools.com/html/movie.mp4", "/docs/word-intro.pdf");
            createLesson(m1, "Styles de paragraphe et mise en page professionnelle", "Utiliser les styles de titres pour un formatage rapide et uniforme.", 2, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/word-styles.pdf");
            createLesson(m1, "Insertion de tableaux, d'images et table des matieres", "Inserer des elements illustratifs et generer un sommaire automatique.", 3, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/word-advanced.pdf");

            Module m2 = createModule(formation, "Excel pour l'analyse de donnees et les tableaux", "Analysez et visualisez vos chiffres efficacement.", 2, 12);
            createLesson(m2, "Formules de base et calculs simples", "Saisir des donnees et utiliser les formules de base (Somme, Moyenne, Min, Max).", 1, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/excel-basic-formulas.pdf");
            createLesson(m2, "Fonctions avancees (RECHERCHEV, SI, NB.SI)", "Automatiser la recherche et appliquer des conditions logiques a vos calculs.", 2, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/excel-functions.pdf");
            createLesson(m2, "Tableaux Croises Dynamiques et graphiques", "Synthetiser de grands jeux de donnees et creer des tableaux de bord interactifs.", 3, 50, "https://www.w3schools.com/html/movie.mp4", "/docs/excel-tcd.pdf");

            Module m3 = createModule(formation, "PowerPoint pour des presentations percutantes", "Presentez vos idees avec clarte et dynamisme.", 3, 6);
            createLesson(m3, "Creation de diapositives et regles de design", "Structurer son diaporama, eviter les blocs de texte et utiliser des templates epures.", 1, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/ppt-design.pdf");
            createLesson(m3, "Animations, transitions et insertion de medias", "Ajouter du mouvement de facon professionnelle et integrer des videos et audio.", 2, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/ppt-animations.pdf");
            createLesson(m3, "Presenter efficacement devant un public", "Techniques d'expression orale et gestion du mode presentateur.", 3, 20, "https://www.w3schools.com/html/movie.mp4", "/docs/ppt-speech.pdf");
        } else if (title.contains("cyber")) {
            Module m1 = createModule(formation, "Introduction a la cybersecurite et menaces", "Comprendre les fondations de la securite numerique.", 1, 8);
            createLesson(m1, "Concepts fondamentaux (CIA Triad)", "Comprendre les piliers de la securite : Confidentialite, Integrite et Disponibilite.", 1, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/cyber-basics.pdf");
            createLesson(m1, "Types d'attaques (Phishing, Malware, Ransomware)", "Identifier les logiciels malveillants et les attaques courantes par ingenierie sociale.", 2, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/cyber-threats.pdf");
            createLesson(m1, "Ingenierie sociale et securite humaine", "Les bonnes pratiques individuelles pour eviter d'etre le maillon faible de l'organisation.", 3, 25, "https://www.w3schools.com/html/movie.mp4", "/docs/social-engineering.pdf");

            Module m2 = createModule(formation, "Securisation des reseaux et des systemes", "Protegez vos serveurs et vos flux d'information.", 2, 12);
            createLesson(m2, "Protocoles securises (HTTPS, SSH, VPN)", "Chiffrer les communications reseau et securiser les acces distants.", 1, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/secure-protocols.pdf");
            createLesson(m2, "Configuration de pare-feu et detection d'intrusion", "Mettre en place des regles de pare-feu et analyser les logs d'intrusion.", 2, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/firewalls.pdf");
            createLesson(m2, "Durcissement de Windows et Linux", "Configurer les systemes d'exploitation pour limiter la surface d'attaque.", 3, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/os-hardening.pdf");

            Module m3 = createModule(formation, "Cryptographie et gestion des acces", "Mettez en place une politique d'authentification forte.", 3, 10);
            createLesson(m3, "Chiffrement symetrique vs asymetrique", "Comprendre les principes fondamentaux du chiffrement des donnees.", 1, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/crypto-basics.pdf");
            createLesson(m3, "Hachage, signatures numeriques et certificats SSL/TLS", "Garantir l'authenticite et l'integrite des messages et des sites web.", 2, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/hashing-ssl.pdf");
            createLesson(m3, "Gestion des identites et authentification MFA", "Implementer une politique de mots de passe forte et la double authentification.", 3, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/mfa-auth.pdf");
        } else if (title.contains("data science")) {
            Module m1 = createModule(formation, "Python pour l'analyse de donnees (Pandas & Numpy)", "Utilisez les bibliotheques standards de la Data Science.", 1, 12);
            createLesson(m1, "Rappels Python et structures de donnees", "Variables, listes, dictionnaires et fonctions pour l'analyse.", 1, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/python-refresh.pdf");
            createLesson(m1, "Manipulation de donnees avec Pandas", "Charger, filtrer et agreger des DataFrames a partir de fichiers CSV/Excel.", 2, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/pandas-intro.pdf");
            createLesson(m1, "Nettoyage de donnees et valeurs manquantes", "Traiter les valeurs aberrantes ou manquantes pour preparer les donnees.", 3, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/data-cleaning.pdf");
            createLesson(m1, "Visualisation de donnees avec Matplotlib et Seaborn", "Creer des graphiques clairs et interpreter les distributions de donnees.", 4, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/data-viz.pdf");

            Module m2 = createModule(formation, "Fondations mathematiques et statistiques", "Comprenez les concepts mathematiques derriere les modeles.", 2, 8);
            createLesson(m2, "Algebre lineaire et calcul matriciel", "Vecteurs, matrices et multiplications indispensables pour le machine learning.", 1, 30, "https://www.w3schools.com/html/movie.mp4", "/docs/linear-algebra.pdf");
            createLesson(m2, "Statistiques descriptives et probabilites", "Moyenne, ecart-type, lois de probabilites et tests d'hypotheses.", 2, 35, "https://www.w3schools.com/html/movie.mp4", "/docs/statistics.pdf");
            createLesson(m2, "Analyse exploratoire des donnees (EDA)", "Methodes pour extraire les premiers enseignements graphiques et statistiques d'un dataset.", 3, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/eda-stats.pdf");

            Module m3 = createModule(formation, "Algorithmes de Machine Learning avec Scikit-Learn", "Construisez et evaluez vos modeles de prediction.", 3, 15);
            createLesson(m3, "Regression lineaire et logistique", "Modeliser des variables continues ou classifier des classes binaires.", 1, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/regression.pdf");
            createLesson(m3, "Arbres de decision et Random Forest", "Comprendre les modeles a base de regles et les methodes d'ensemble.", 2, 50, "https://www.w3schools.com/html/movie.mp4", "/docs/decision-trees.pdf");
            createLesson(m3, "Apprentissage non supervise : K-Means et PCA", "Regrouper des donnees similaires et reduire la dimensionalite d'un dataset.", 3, 40, "https://www.w3schools.com/html/movie.mp4", "/docs/unsupervised.pdf");
            createLesson(m3, "Evaluation et validation des modeles", "Calculer le score de precision, le rappel et eviter le surapprentissage (overfitting).", 4, 45, "https://www.w3schools.com/html/movie.mp4", "/docs/model-evaluation.pdf");
        }
    }

    private Module createModule(Formation formation, String title, String description, int orderIndex, int durationHours) {
        Module module = new Module();
        module.setFormation(formation);
        module.setTitle(title);
        module.setDescription(description);
        module.setOrderIndex(orderIndex);
        module.setDurationHours(durationHours);
        return moduleRepository.save(module);
    }

    private void createLesson(Module module, String title, String description, int orderIndex, int durationMinutes, String videoUrl, String documentUrl) {
        Lesson lesson = new Lesson();
        lesson.setModule(module);
        lesson.setTitle(title);
        lesson.setDescription(description);
        lesson.setOrderIndex(orderIndex);
        lesson.setDurationMinutes(durationMinutes);
        lesson.setVideoUrl(videoUrl);
        lesson.setDocumentUrl(documentUrl);
        lessonRepository.save(lesson);
    }
}
