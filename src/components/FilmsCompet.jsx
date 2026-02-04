import React from 'react';
import { FaArrowRight, FaPlay } from 'react-icons/fa';

const films = [
  {
    id: 1,
    title: "TITLE",
    director: "",
    duration: "",
    category: ""
  },
  {
    id: 2,
    title: "TITLE",
    director: "",
    duration: "",
    category: ""
  },
  {
    id: 3,
    title: "TITLE",
    director: "",
    duration: "",
    category: ""
  }
];

const FilmsCompetition = () => {
  return (
    <section className="bg-[#18181B] text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* --- EN-TÊTE (Header) --- */}
        <div className="mb-12">
          {/* Petit sur-titre "APERÇU SÉLECTION" */}
          <span className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Aperçu Sélection
          </span>
          
          {/* Grand Titre */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">
            Films en compétition
          </h2>
          
          {/* Sous-titre */}
          <p className="text-gray-400 text-lg">
            Découvrez les courts-métrages finalistes générés par l&apos;IA.
          </p>
        </div>

        {/* --- GRILLE DES FILMS (3 Colonnes) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {films.map((film) => (
            <div key={film.id} className="group cursor-pointer">
              
              {/* 1. Zone Image (Le rectangle gris de ta maquette) */}
              <div className="relative aspect-video bg-[#27272A] rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-300 mb-5">
                
                {/* Placeholder Image (tu remplaceras par <img src={...} />) */}
                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition">
                  <FaPlay className="text-white/20 group-hover:text-white group-hover:scale-110 transition duration-300" size={40} />
                </div>

                {/* Badge Durée (en haut à droite comme sur YouTube) */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-md text-white">
                  {film.duration}
                </div>
              </div>

              {/* 2. Infos du film (En dessous) */}
              <div className="flex justify-between items-start">
                <div>
                  {/* Titre du film */}
                  <h3 className="text-xl font-bold mb-1 group-hover:text-gray-300 transition">
                    {film.title}
                  </h3>
                  
                  {/* Réalisateur */}
                  <div className="text-sm text-gray-400">
                    <span className="block text-xs uppercase text-gray-600 mb-0.5">Réalisateur</span>
                    {film.director}
                  </div>
                </div>

                {/* Catégorie (Petit tag à droite) */}
                <span className="text-xs text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                  {film.category}
                </span>
              </div>

            </div>
          ))}

        </div>

        {/* --- LIEN "VOIR TOUT" (Bas de page) --- */}
        <div className="border-t border-white/10 pt-8">
          <a href="#" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white transition group">
            Voir toute la sélection
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default FilmsCompetition;