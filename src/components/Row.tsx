import Cell from "./Tile";

const Row = ({ row }: { row: number[] }) => {
    return (
        <tr>
            {row.map((cell, i) => (<Cell key={i} cellValue={cell} />))}
        </tr>
    );
};

export default Row;