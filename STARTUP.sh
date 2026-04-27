# Script de démarrage du projet complet

## Frontend
echo "🚀 Démarrage du Frontend..."
cd frontend
npm install
npm run dev &

## Backend
echo "🚀 Démarrage du Backend..."
cd ../backend
mvn clean install
mvn spring-boot:run

echo "✅ FormationHub est prêt!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8080/api"
echo "Swagger UI: http://localhost:8080/api/swagger-ui.html"
