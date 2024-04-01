import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faCircleQuestion
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Game } from './Game'
import { Guidelines } from './Guidelines'

export const gradients = [
  'from-teal-400 to-gray-800',
  'from-fuchsia-600 to-purple-600',
  'from-rose-400 to-orange-300',
  'from-rose-700 to-pink-600',
  'from-emerald-500 to-lime-600',
  'from-pink-500 to-violet-600',
  'from-fuchsia-600 to-purple-600',
  'from-green-500 to-cyan-400',
  'from-indigo-500 to-blue-500',
  'from-red-500 to-orange-500',
  'from-emerald-400 to-cyan-400',
  'from-slate-500 to-slate-800'
]

export function App() {
  const [gradient, setGradient] = useState(
    gradients[Math.floor(Math.random() * gradients.length)]
  )

  const [history, setHistory] = useState<('game' | 'guidelines')[]>([])
  const [screen, setScreen] = useState<'game' | 'guidelines'>('game')

  useEffect(() => {
    const newHistory = [...history, screen]
    if (history.length > 3) {
      newHistory.shift()
    }

    setHistory(newHistory)
  }, [screen])

  const goBack = () => {
    if (history.length > 1) {
      history.pop()
      setScreen(history[history.length - 1])
    }
  }

  const isAnyHistory = () => {
    const historyIsHere = history.length > 1
    if (!historyIsHere) {
      return false
    }

    return history[history.length - 2] !== screen
  }

  return (
    <div className={'relative h-screen w-full overflow-hidden'}>
      <div
        className={
          'left-O absolute top-0 z-10 flex w-full items-center justify-between p-8 text-xl text-white'
        }
      >
        <button
          disabled={!isAnyHistory()}
          className={'disabled:opacity-30'}
          onClick={goBack}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={() => {
            setScreen('guidelines')
          }}
        >
          <FontAwesomeIcon icon={faCircleQuestion} />
        </button>
      </div>

      <div
        className={'bg-gradient-to-b w-full absolute z-0 h-screen ' + gradient}
      >
        {screen === 'guidelines' && <Guidelines />}
        <Game setGradient={setGradient} />
      </div>
    </div>
  )
}
