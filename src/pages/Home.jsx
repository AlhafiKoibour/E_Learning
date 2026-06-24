import { Link } from 'react-router-dom'
import { Button } from '../components'
import { FaRocket, FaUsers, FaTrophy, FaChartLine } from 'react-icons/fa'

export const Home = () => {
  const features = [
    {
      icon: <FaRocket className="text-4xl text-primary" />,
      title: 'Formations Modernes',
      description: 'Parcours actualisés régulièrement basés sur les demandes du marché',
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: 'Mentoring Personnalisé',
      description: 'Suivis individuels par des experts du secteur',
    },
    {
      icon: <FaTrophy className="text-4xl text-primary" />,
      title: 'Certifications Reconnues',
      description: 'Diplômes validés par l\'industrie',
    },
    {
      icon: <FaChartLine className="text-4xl text-primary" />,
      title: 'Insertion Professionnelle',
      description: 'Accompagnement vers l\'emploi et opportunités carrière',
    },
  ]

  const stats = [
    { label: '5000+', description: 'Apprenants formés' },
    { label: '50+', description: 'Formations' },
    { label: '95%', description: 'Taux de réussite' },
    { label: '2000+', description: 'Emplois trouvés' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Transformez Votre Carrière</h1>
          <p className="text-xl mb-8 text-blue-100">
            Formations digitales intensives en design, data, développement et marketing
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/formations">
              <Button variant="secondary" size="lg">
                Explorer les formations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Pourquoi ToumaiHub ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold mb-2">{stat.label}</h3>
                <p className="text-blue-200">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Formations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nos Formations Populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg">
                <div className="h-48 bg-gradient-to-r from-primary to-blue-700"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Formation {i}</h3>
                  <p className="text-gray-600 mb-4">Description de la formation...</p>
                  <Link to="/formations">
                    <Button fullWidth>En savoir plus</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre formation ?</h2>
          <p className="text-xl mb-8">Inscrivez-vous dès aujourd'hui et accédez gratuitement à la formation</p>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              S'inscrire maintenant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
