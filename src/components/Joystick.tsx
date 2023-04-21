import arrow from '../assets/211623_b_up_arrow_icon.svg'
import useGameStore from '../store/Game.store';
import Move from '../helpers/move';

const JoyStick = () => {
    const { Board, setBoard, Score, setScore, setGameOver } = useGameStore();
    const HandleClick = (direction: string) => {
        Move(direction, Board, setBoard, setScore, setGameOver, Score);
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'w') {
            HandleClick('up');
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
            HandleClick('right');
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            HandleClick('down');
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            HandleClick('left');
        }
    };


    const body = document.querySelector('body');
    if (body) {
        body.onkeyup = handleKeyUp;
    }


    return (
        <div className="JoyStick">
            <div>
                <div onClick={() => HandleClick('up')}>
                    <img style={{ transform: 'rotate(-45deg)' }} src={arrow} alt="" />
                </div>
                <div onClick={() => HandleClick('right')}>
                    <img style={{ transform: 'rotate(45deg)' }} src={arrow} alt="" />
                </div>
            </div>
            <div>
                <div onClick={() => HandleClick('left')}>
                    <img style={{ transform: 'rotate(-135deg)' }} src={arrow} alt="" />
                </div>
                <div onClick={() => HandleClick('down')}>
                    <img style={{ transform: 'rotate(135deg)' }} src={arrow} alt="" />
                </div>
            </div>
        </div>
    )
}

export default JoyStick;