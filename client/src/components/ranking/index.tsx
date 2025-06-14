// src/components/Ranking.tsx

import React from 'react';
import { School, socialImpactSchoolsRanking } from './data'; 
import { TrophyIcon, MedalSilverIcon, MedalBronzeIcon } from './icons';
import './Ranking.css'; // Importa o CSS para este componente

export default function Ranking() {
  // Garante a ordem correta (1º, 2º, 3º) para o mapeamento
  const sortedSchools = [...socialImpactSchoolsRanking].sort((a, b) => a.rank - b.rank);

  return (
    <div className="ranking-page">
      <header className="header">
        <div className="logo-container">
          {/* SVG para o logo 'Bora Impactar' */}
          <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 20C22 14.4772 17.5228 10 12 10C6.47715 10 2 14.4772 2 20C2 25.5228 6.47715 30 12 30C17.5228 30 22 25.5228 22 20Z" fill="#36A3F7"/>
            <path d="M12 25C12 22.2386 14.2386 20 17 20C19.7614 20 22 22.2386 22 25C22 27.7614 19.7614 30 17 30C14.2386 30 12 27.7614 12 25Z" fill="#A0DAFB"/>
            <path d="M17 15C17 12.2386 19.2386 10 22 10C24.7614 10 27 12.2386 27 15C27 17.7614 24.7614 20 22 20C19.2386 20 17 17.2386 17 15Z" fill="#36A3F7"/>
            <path d="M27 20C27 17.2386 29.2386 15 32 15C34.7614 15 37 17.2386 37 20C37 22.7614 34.7614 25 32 25C29.2386 25 27 22.7614 27 20Z" fill="#A0DAFB"/>
            <text x="45" y="27" font-family="Arial, sans-serif" font-size="18" fill="#333" font-weight="bold">Bora</text>
            <text x="45" y="37" font-family="Arial, sans-serif" font-size="18" fill="#36A3F7" font-weight="bold">Impactar</text>
          </svg>
        </div>
      </header>

      <div className="content-area">
        <div className="back-link">
          <span className="arrow">{'<'}</span> Ranking
        </div>

        <div className="ranking-section">
          <h2>Ranking de Escolas de Impacto Social</h2>
          <p className="description">
            Este ranking celebra as escolas de Recife que mais geraram impacto social através de
            projetos de voluntariado e inovação. Suba no ranking e inspire a sua comunidade!
          </p>

          <div className="school-cards-container">
            {/* Renderiza as "escolas" com base na ordem do ranking
                Usamos a propriedade 'order' do flexbox no CSS para posicioná-las
                visualmente como 2º, 1º, 3º (esquerda, centro, direita) */}
            {sortedSchools.map(school => {
              let orderClass = '';
              if (school.rank === 1) orderClass = 'order-1'; // Fica no centro no flexbox
              else if (school.rank === 2) orderClass = 'order-0'; // Fica à esquerda no flexbox
              else if (school.rank === 3) orderClass = 'order-2'; // Fica à direita no flexbox

              return (
                <div key={school.id} className={`school-card ${orderClass}`}>
                  <div className="school-placeholder-circle"></div>
                  <div className="school-name-tag">{school.name}</div>
                  <div className="rank-icon-container">
                    {school.hasTrophy ? (
                      <TrophyIcon />
                    ) : school.rank === 2 ? (
                      <MedalSilverIcon />
                    ) : school.rank === 3 ? (
                      <MedalBronzeIcon />
                    ) : (
                      // Fallback para outros ranks, se houver
                      <div className="rank-text">{school.rank}º</div>
                    )}
                  </div>
                  {/* A barra azul será criada e terá seu tamanho controlado por CSS */}
                  <div className="score-bar"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}