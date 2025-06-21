'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SchoolData {
    escola: string;
    desafios: number;
}

interface TableProps {
    data: SchoolData[];
    actionType: 'loadMore' | 'viewFullRanking';
    customLimit?: number;
}

export default function Table({ data, actionType, customLimit }: TableProps) {
    const sortedData = data.slice().sort((a, b) => b.desafios - a.desafios);

    const itemsPerLoad = 5;

    const getInitialLimit = () => {
        if (customLimit !== undefined) {
            return customLimit;
        }
        if (actionType === 'loadMore') {
            return 10;
        }
        if (actionType === 'viewFullRanking') {
            return 7;
        }
        return sortedData.length;
    };

    const [itemsToShow, setItemsToShow] = useState(getInitialLimit());

    useEffect(() => {
        setItemsToShow(getInitialLimit());
    }, [data, actionType, customLimit]);

    const handleVerMais = () => {
        setItemsToShow((prev) => prev + itemsPerLoad);
    };

    const hasMoreItemsForLoadMore = actionType === 'loadMore' && itemsToShow < sortedData.length;
    const showActionButton = hasMoreItemsForLoadMore || actionType === 'viewFullRanking';

    return (
        <div className="w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-[#294BB6] w-full h-12">
                        <th className="text-white font-semibold">Posição</th>
                        <th className="text-white font-semibold">Escolas</th>
                        <th className="text-white font-semibold">Desafios</th>
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
