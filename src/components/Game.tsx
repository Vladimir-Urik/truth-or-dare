import { useEffect, useMemo, useState } from 'react'
import { data } from '../data'
import { gradients } from './App'

interface GameProps {
  setGradient: (gradient: string) => void
}

export function Game({ setGradient }: GameProps) {
  const [title, setTitle] = useState('')
  const [, setTruth] = useState(true)
  const [, setCategory] = useState<'funny' | 'sexistic'>('funny')
  const [text, setText] = useState('')
  const [side, setSide] = useState<'pravici' | 'levici'>('pravici')
  const [timeToReset, setTimeToReset] = useState(0)

  const audio = useMemo(() => {
    const click = new Audio('/click.wav')
    return {
      click
    }
  }, [])

  const getRandomTextWithCategory = (
    category: 'funny' | 'sexistic' | 'group',
    truth = true
  ) => {
    const texts = data[category][truth ? 'truth' : 'dare']
    if (texts.length === 1) {
      return texts[0]
    }

    let randomText = texts[Math.floor(Math.random() * texts.length)]
    while (randomText === text) {
      randomText = texts[Math.floor(Math.random() * texts.length)]
    }

    return randomText
  }

  useEffect(() => {
    setText('Klikni na tlačítko níže.')
    setTitle('Začni hru')
  }, [])

  const getRandomGradient = () => {
    return gradients[Math.floor(Math.random() * gradients.length)]
  }

  const change = () => {
    audio.click.playbackRate = 1.5
    audio.click.play()
    const sexistic = Math.random() < 0.7
    const truth = Math.random() < 0.4
    const group = Math.random() < 0.1
    const side = Math.random() < 0.5 ? 'pravici' : 'levici'
    setSide(side)

    let category = sexistic ? 'sexistic' : 'funny'

    setTruth(truth)
    if (group) {
      if (truth) {
        setTitle('Skupinová pravda')
      } else {
        setTitle('Skupinový úkol')
      }
      category = 'group'
    } else {
      if (truth) {
        setTitle('Pravda')
      } else {
        setTitle('Úkol')
      }

      setCategory(category as 'funny' | 'sexistic')
    }

    setGradient(getRandomGradient())
    setText(
      getRandomTextWithCategory(
        category as 'funny' | 'sexistic' | 'group',
        truth
      )
    )

    startTimer()
  }

  const startTimer = () => {
    setTimeToReset(3000)
    const timer = setInterval(() => {
      setTimeToReset((prev) => {
        if (prev < 10) {
          clearInterval(timer)
          return 0
        }
        return prev - 10
      })
    }, 10)
  }

  const getRemainingPercentage = () => {
    return (timeToReset / 3000) * 100
  }

  const getColor = () => {
    const percentage = getRemainingPercentage()
    if (percentage < 33) {
      return 'stroke-green-500'
    }

    if (percentage < 66) {
      return 'stroke-yellow-500'
    }

    return 'stroke-red-500'
  }

  return (
    <>
      {timeToReset > 0 && (
        <div className={'absolute top-8 z-40 flex w-full justify-center'}>
          <div className="relative size-20">
            <svg
              className="size-full"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-white/40"
                strokeWidth="3"
              ></circle>
              <g className="origin-center -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={'stroke-current transition-colors ' + getColor()}
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeLinecap={'round'}
                  strokeDashoffset={getRemainingPercentage()}
                ></circle>
              </g>
            </svg>

            <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-center text-3xl font-bold text-gray-800 dark:text-white">
                {Math.round(timeToReset / 1000)}
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        className={
          'absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center'
        }
      >
        <div key={text}>
          <h2 className={'title mb-8 text-5xl font-black uppercase text-white'}>
            {title}
          </h2>
          <p className={'title text-2xl font-bold text-white'}>
            {text.replace('@side', side)}
          </p>
        </div>
      </div>

      <div className={'absolute bottom-12 z-10 flex w-full justify-center'}>
        <button
          disabled={timeToReset > 0}
          className={
            'w-fit rounded-lg bg-black px-8 py-4 font-bold text-white disabled:opacity-30'
          }
          onClick={() => change()}
        >
          Další
        </button>
      </div>
    </>
  )
}
