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

    const randomText = texts[Math.floor(Math.random() * texts.length)]
    while (randomText === text) {
      return texts[Math.floor(Math.random() * texts.length)]
    }

    return randomText
  }

  useEffect(() => {
    setText('Vyber si kategorii pomocí kliknutí na smajlíka nebo lilek.')
    setTitle('Začni hru')
  }, [])

  const getRandomGradient = () => {
    return gradients[Math.floor(Math.random() * gradients.length)]
  }

  const change = (category: 'funny' | 'sexistic' | 'group') => {
    audio.click.playbackRate = 1.5
    audio.click.play()
    const truth = Math.random() < 0.3
    const group = Math.random() < 0.1
    const side = Math.random() < 0.5 ? 'pravici' : 'levici'
    setSide(side)

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
    setText(getRandomTextWithCategory(category, truth))
  }

  return (
    <>
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

      <div
        className={'absolute bottom-8 left-0 z-10 flex w-full justify-between'}
      >
        <button
          className={
            'flex w-20 justify-end rounded-r-lg bg-black bg-opacity-30 p-4'
          }
          onClick={() => change('funny')}
        >
          <img
            src={'/winking-face-with-tongue_1f61c.png'}
            alt={'wink'}
            className={'size-8'}
          />
        </button>
        <button
          className={
            'flex w-20 justify-start rounded-l-lg bg-black bg-opacity-30 p-4'
          }
          onClick={() => change('sexistic')}
        >
          <img src={'/egg.png'} alt={'egg'} className={'size-8'} />
        </button>
      </div>
    </>
  )
}
