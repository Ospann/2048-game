import { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextValues {
    board: number[][]
    setBoard: (board: number[][]) => void
    score: number
    setScore: (score: number) => void
    gameOver: boolean
    setGameOver: (gameOver: boolean) => void
}

const AppContext = createContext<AppContextValues | undefined>(undefined)

export function ContextProvider({ children }: { children: ReactNode }) {
    const [board, setBoard] = useState<number[][]>([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ])
    const [score, setScore] = useState<number>(0)
    const [gameOver, setGameOver] = useState<boolean>(false)
    return (
        <AppContext.Provider value={{ board, setBoard, score, setScore, gameOver, setGameOver }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider')
    }
    return context
}
