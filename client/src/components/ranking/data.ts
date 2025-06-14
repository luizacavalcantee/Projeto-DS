// src/data.ts

export interface School {
  id: string; // Identificador único para chaves do React
  name: string;
  rank: number; // 1 para primeiro, 2 para segundo, 3 para terceiro
  hasTrophy?: boolean; // Opcional, true se for o 1º lugar com troféu
}

export const socialImpactSchoolsRanking: School[] = [
  {
    id: 'school-a',
    name: "Escola A",
    rank: 1,
    hasTrophy: true, // Escola A é o 1º lugar
  },
  {
    id: 'school-b',
    name: "Escola B",
    rank: 2, // Escola B é o 2º lugar
  },
  {
    id: 'school-c',
    name: "Escola C",
    rank: 3, // Escola C é o 3º lugar
  },
];