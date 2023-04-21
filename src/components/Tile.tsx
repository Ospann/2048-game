const Tile = ({ cellValue }: { cellValue: number }) => {
    let color = 'cell';
    let value = (cellValue === 0) ? '' : cellValue;
    if (value) {
        color += ` color-${value}`;
    }

    return (
        <td>
            <div className={color}>
                <div className="number">{value}</div>
            </div>
        </td>
    );
};


export default Tile;