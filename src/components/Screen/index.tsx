import { useAppContext } from '@/utils/provider/Context'
import styles from './index.module.css'

const Cell = ({ cellValue }: { cellValue: number }) => {
    let color = 'cell'
    let value = cellValue === 0 ? '' : cellValue
    if (value) {
        color += ` color-${value}`
    }

    return (
        <td>
            <div className={color}>
                <div className="number">{value}</div>
            </div>
        </td>
    )
}

const Display = () => {
    const { board, score } = useAppContext()
    return (
        <div className={styles.screen}>
            <div className={styles.score}>Score: {score}</div>

            <table>
                <tbody>
                    {board.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, i) => (
                                <Cell key={i} cellValue={cell} />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Display
