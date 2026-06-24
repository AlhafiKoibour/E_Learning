import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">ToumaiHub</h3>
            <p className="text-gray-400 text-sm">
              La plateforme leader de formation digitale en ligne et hybride.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Formations</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/formations" className="hover:text-white">Tous les parcours</a></li>
              <li><a href="/formations?domain=dev" className="hover:text-white">Développement</a></li>
              <li><a href="/formations?domain=design" className="hover:text-white">Design</a></li>
              <li><a href="/formations?domain=data" className="hover:text-white">Data</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/about" className="hover:text-white">À propos</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/privacy" className="hover:text-white">Confidentialité</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 ToumaiHub. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
