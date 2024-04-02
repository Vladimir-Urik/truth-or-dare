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
  'from-slate-500 to-slate-800',
  'from-rose-500 to-pink-500',
  'from-blue-400 to-gray-800',
  'from-yellow-600 to-orange-600',
  'from-red-400 to-green-300',
  'from-purple-700 to-blue-600',
  'from-teal-500 to-amber-600',
  'from-cyan-500 to-indigo-600',
  'from-lime-600 to-green-400',
  'from-orange-500 to-pink-400',
  'from-indigo-400 to-red-400',
  'from-fuchsia-500 to-yellow-500',

  'from-rose-500 via-red-400 to-orange-300',
  'from-emerald-400 via-green-500 to-lime-600',
  'from-fuchsia-600 via-purple-500 to-violet-600',
  'from-cyan-400 via-blue-500 to-indigo-600',
  'from-yellow-400 via-amber-500 to-orange-600',
  'from-rose-500 via-pink-500 to-purple-600',
  'from-teal-400 via-blue-500 to-indigo-600',
  'from-green-400 via-teal-500 to-cyan-600',
  'from-red-400 via-pink-500 to-purple-600',
  'from-lime-500 via-yellow-600 to-amber-700',
  'from-cyan-400 via-teal-500 to-blue-600',
  'from-orange-400 via-red-500 to-pink-600',
  'from-purple-500 via-indigo-600 to-blue-700',
  'from-amber-500 via-yellow-600 to-lime-700',
  'from-pink-500 via-purple-600 to-indigo-700',
  'from-blue-500 via-teal-600 to-green-700',
  'from-red-500 via-orange-600 to-yellow-700',
  'from-rose-500 via-pink-600 to-purple-700',
  'from-teal-400 via-blue-500 to-cyan-600',
  'from-fuchsia-500 via-purple-600 to-violet-700',
  'from-amber-400 via-yellow-500 to-lime-600',
  'from-lime-500 via-green-600 to-teal-700',
  'from-purple-400 via-indigo-500 to-blue-600'
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
          'absolute top-0 z-10 flex w-full items-center justify-between p-8 text-xl text-white'
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
            setScreen(screen === 'game' ? 'guidelines' : 'game')
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
