import { useEffect } from 'react'
import { useAppContext } from '@/utils/provider/Context'
import placeRandom from '@/utils/helpers/placeRandom'
import JoyStick from '@/components/JoyStick'
import Screen from '@/components/Screen'
import styles from './index.module.css'

const Board = () => {
    const { setBoard, setScore, setGameOver, gameOver } = useAppContext()

    function initBoard() {
        let newBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        newBoard = placeRandom(placeRandom(newBoard))
        setBoard(newBoard)
        setScore(0)
        setGameOver(false)
    }

    useEffect(() => {
        initBoard()
    }, [])

    return (
        <div className={styles.Board}>
            <div
                style={{
                    height: '70%',
                    width: '100%',
                    padding: '1rem',
                    boxSizing: 'border-box',
                }}
            >
                <Screen />
            </div>
            <div className={styles.buttons}>
                <JoyStick />
                <div role="button" className={styles.button} onClick={initBoard}>
                    Reload
                </div>
            </div>
            <dialog className="dialog" open={gameOver}>
                You're loser!
            </dialog>
        </div>
    )
}

export default Board
