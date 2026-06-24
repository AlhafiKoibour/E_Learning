import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ici, tu pourrais ajouter ton appel API vers ton backend
    console.log('Données du formulaire:', formData);
    
    // Notification de succès
    toast.success('Votre message a été envoyé avec succès !');
    
    // Réinitialisation du formulaire
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contactez-nous</h1>
        <p className="text-lg text-gray-600">
          Une question sur nos formations ? Notre équipe vous répondra dans les plus brefs délais.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Champ Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ex: Jean Dupont"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="jean.dupont@exemple.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Champ Sujet */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Sujet
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="information">Informations sur les cours</option>
              <option value="support">Support technique</option>
              <option value="partnership">Partenariat</option>
              <option value="other">Autre</option>
            </select>
          </div>

          {/* Champ Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Votre message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Comment pouvons-nous vous aider ?"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Bouton d'envoi */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition hover:-translate-y-1 active:scale-95"
          >
            Envoyer le message
          </button>
          
        </form>
      </div>

      {/* Informations supplémentaires optionnelles */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="font-bold text-gray-800">Email</h3>
          <p className="text-blue-600">contact@toumaihub.com</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Téléphone</h3>
          <p className="text-gray-600">+123 45 67 89</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800">Localisation</h3>
          <p className="text-gray-600">N'djamena, Tchad</p>
        </div>
      </div>
    </div>
  );
}