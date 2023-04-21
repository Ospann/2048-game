import Row from './Row';
import useGameStore from '../store/Game.store';

const Display = () => {
    const { Board, Score } = useGameStore()
    return (
        <div className="display">
            <div className="score">Score: {Score}</div>

            <table>
                <tbody>
                    {Board.map((row, i) => (<Row key={i} row={row} />))}
                </tbody>
            </table>
        </div>
    );
};

export default Display;
