import { useEffect } from 'react';
import useGameStore from '../store/Game.store';
import placeRandom from '../helpers/placeRandom';
import JoyStick from './Joystick';
import Display from './Display';

const Board = () => {

    const { setBoard, setScore, setGameOver, gameOver } = useGameStore()

    function initBoard() {
        let newBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        newBoard = placeRandom(placeRandom(newBoard));
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
    }

    useEffect(() => {
        initBoard();
    }, []);

    return (
        <div className="Board">
            <div style={{
                height: "70%",
                width: "100%",
                padding: "1rem",
                boxSizing: 'border-box',
            }}>
                <Display />
            </div>
            <div className='buttons'>
                <JoyStick />
                <div className="button" onClick={() => { initBoard() }}>Reload</div>
            </div>
            <dialog className='dialog' open={gameOver}>
                You're loser!
            </dialog>
        </div>
    )
}

export default Board;