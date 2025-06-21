export default function Table() {
    const mockData = [
        { posicao: 1, escola: "Escola A", desafios: 5 },
        { posicao: 2, escola: "Escola B", desafios: 3 },
        { posicao: 3, escola: "Escola C", desafios: 8 },
        { posicao: 4, escola: "Escola D", desafios: 2 },
        { posicao: 5, escola: "Escola E", desafios: 6 },
        { posicao: 6, escola: "Escola F", desafios: 4 },
        { posicao: 7, escola: "Escola G", desafios: 7 },
        { posicao: 8, escola: "Escola H", desafios: 1 },
        { posicao: 9, escola: "Escola I", desafios: 9 },
        { posicao: 10, escola: "Escola J", desafios: 5 },
    ];

    return (
        <table className="w-full m-64 border-collapse rounded-md overflow-hidden shadow-lg">
            <thead>
                <tr className="bg-[#294BB6] w-full">
                    <th className="text-white font-semibold p-4">Posição</th>
                    <th className="text-white font-semibold p-4">Escolas</th>
                    <th className="text-white font-semibold p-4">Desafios</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                {mockData.map((item, index) => (
                    <tr key={index}>
                        <td className="border-b border-gray-200 p-2 text-center font-semibold">{item.posicao}</td>
                        <td className="border-b border-gray-200 p-2 text-center">{item.escola}</td>
                        <td className="border-b border-gray-200 p-2 text-center font-semibold">{item.desafios}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}