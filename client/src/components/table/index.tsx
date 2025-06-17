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
        <div className="flex items-center justify-center p-4">
            <table className="border">
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Escolas</th>
                        <th>Desafios</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.posicao}</td>
                            <td>{item.escola}</td>
                            <td>{item.desafios}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
