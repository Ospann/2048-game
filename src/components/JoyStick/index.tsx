import { useAppContext } from '@/utils/provider/Context'
import { useEffect } from 'react'
import arrow from '../../assets/211623_b_up_arrow_icon.svg'
import Move from '@/utils/helpers/move'
import styles from './index.module.css'

const JoyStick = () => {
    const { board, setBoard, score, setScore, setGameOver } = useAppContext()

    const handleClick = (direction: string) => {
        Move(direction, board, setBoard, setScore, setGameOver, score)
    }

    type KeyDirectionMap = {
        [key in
            | 'ArrowUp'
            | 'w'
            | 'ArrowRight'
            | 'd'
            | 'ArrowDown'
            | 's'
            | 'ArrowLeft'
            | 'a']: string
    }

    const keyToDirection: KeyDirectionMap = {
        ArrowUp: 'up',
        w: 'up',
        ArrowRight: 'right',
        d: 'right',
        ArrowDown: 'down',
        s: 'down',
        ArrowLeft: 'left',
        a: 'left',
    }

    const handleKeyUp = (e: KeyboardEvent) => {
        const direction = keyToDirection[e.key as keyof typeof keyToDirection]
        if (direction) {
            handleClick(direction)
        }
    }

    useEffect(() => {
        const handleKeyUpWrapper = (e: KeyboardEvent) => handleKeyUp(e)
        document.body.addEventListener('keyup', handleKeyUpWrapper)

        return () => {
            document.body.removeEventListener('keyup', handleKeyUpWrapper)
        }
    }, [board, score])

    return (
        <div className={styles.JoyStick}>
            <div>
                <div onClick={() => handleClick('up')} role="button">
                    <img className={styles.arrowUp} src={arrow} alt="up" />
                </div>
                <div onClick={() => handleClick('right')} role="button">
                    <img className={styles.arrowRight} src={arrow} alt="right" />
                </div>
            </div>
            <div>
                <div onClick={() => handleClick('left')} role="button">
                    <img className={styles.arrowLeft} src={arrow} alt="left" />
                </div>
                <div onClick={() => handleClick('down')} role="button">
                    <img className={styles.arrowDown} src={arrow} alt="down" />
                </div>
            </div>
        </div>
    )
}

export default JoyStick
