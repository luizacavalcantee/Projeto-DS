'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';

// 1. Importar o serviço e os tipos necessários da API
import { getSchoolRanking, RankedSchool } from '@/services/ranking.services';

// Este é o tipo de dados que o componente usa internamente
interface SchoolData {
    escola: string;
    desafios: number;
}

// As props agora não incluem 'data', pois o componente buscará os seus próprios dados
interface TableProps {
    actionType: 'loadMore' | 'viewFullRanking';
    customLimit?: number;
}

export default function RankingTable({ actionType, customLimit }: TableProps) {
    // 2. Adicionar estados para os dados da API, carregamento e erros
    const [allData, setAllData] = useState<SchoolData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 3. Usar o useEffect para buscar e formatar os dados quando o componente montar
    useEffect(() => {
        const fetchAndFormatRanking = async () => {
            try {
                setLoading(true);
                const apiData: RankedSchool[] = await getSchoolRanking();

                // Mapeia os dados da API para o formato que a tabela precisa
                const formattedData: SchoolData[] = apiData.map(school => ({
                    escola: school.schoolName,
                    desafios: school.completedChallengesCount,
                }));

                setAllData(formattedData);
            } catch (err) {
                setError("Não foi possível carregar o ranking. Tente novamente mais tarde.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAndFormatRanking();
    }, []); // O array vazio garante que a busca só acontece uma vez

    // O resto da sua lógica permanece quase igual, apenas usando 'allData'
    const sortedData = useMemo(() => {
        return allData.slice().sort((a, b) => b.desafios - a.desafios);
    }, [allData]);

    const itemsPerLoad = 5;

    const getInitialLimit = useCallback(() => {
        if (customLimit !== undefined) return customLimit;
        if (actionType === 'loadMore') return 10;
        if (actionType === 'viewFullRanking') return 7;
        return sortedData.length;
    }, [customLimit, actionType, sortedData]);

    const [itemsToShow, setItemsToShow] = useState(getInitialLimit());

    useEffect(() => {
        setItemsToShow(getInitialLimit());
    }, [getInitialLimit]);

    const handleVerMais = () => {
        setItemsToShow((prev) => prev + itemsPerLoad);
    };

    const hasMoreItemsForLoadMore = actionType === 'loadMore' && itemsToShow < sortedData.length;
    const showActionButton = hasMoreItemsForLoadMore || actionType === 'viewFullRanking';

    // 4. Adicionar renderização para os estados de carregamento e erro
    if (loading) {
        return <div className="text-center p-8">A carregar o ranking...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 p-8"><strong>Erro:</strong> {error}</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-[#294BB6] w-full h-12">
                        <th className="text-white font-semibold">Posição</th>
                        <th className="text-white font-semibold">Escolas</th>
                        <th className="text-white font-semibold">Desafios Concluídos</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {sortedData.slice(0, itemsToShow).map((item, index) => (
                        <tr key={index} className="h-10">
                            <td className="border-b border-gray-200 text-center font-semibold">
                                {index + 1}
                            </td>
                            <td className="border-b border-gray-200 text-center">
                                {item.escola}
                            </td>
                            <td className="border-b border-gray-200 text-center font-semibold">
                                {item.desafios}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showActionButton && (
                <div className="w-full bg-white h-10 flex items-center justify-center text-center rounded-b-xl">
                    {actionType === 'loadMore' && (
                        <button
                            onClick={handleVerMais}
                            className="text-[#294BB6] font-semibold hover:underline"
                        >
                            Ver mais
                        </button>
                    )}
                    {actionType === 'viewFullRanking' && (
                        <Link href="/ranking">
                            <button className="text-[#294BB6] font-semibold hover:underline">
                                Ver ranking completo
                            </button>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
