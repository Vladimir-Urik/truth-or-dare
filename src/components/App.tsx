import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faCircleQuestion
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { data } from '../data'

const gradients = [
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

function App() {
  const [gradient, setGradient] = useState(
    gradients[Math.floor(Math.random() * gradients.length)]
  )
  const [truth, setTruth] = useState(true)
  const [category, setCategory] = useState<'funny' | 'sexistic'>('funny')
  const [text, setText] = useState('')

  const getRandomText = () => {
    const texts = data[category][truth ? 'truth' : 'dare']
    return texts[Math.floor(Math.random() * texts.length)]
  }

  useEffect(() => {
    setText(getRandomText())
  }, [])

  const getRandomGradient = () => {
    return gradients[Math.floor(Math.random() * gradients.length)]
  }

  const change = (category: 'funny' | 'sexistic') => {
    setTruth(Math.random() < 0.3)

    setCategory(category)
    setGradient(getRandomGradient())
    setText(getRandomText())
  }

  return (
    <div className={'relative h-screen w-full overflow-hidden'}>
      <div
        className={
          'left-O absolute top-0 z-10 flex w-full items-center justify-between p-8 text-xl text-white'
        }
      >
        <button>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </button>
      </div>

      <div
        className={'bg-gradient-to-b w-full absolute z-0 h-screen ' + gradient}
      >
        <div
          className={
            'absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center'
          }
        >
          <h2 className={'mb-8 text-4xl font-black uppercase text-white'}>
            {truth ? 'Pravda' : 'Úkol'}
          </h2>
          <p className={'text-2xl font-bold text-white'}>{text}</p>
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
          <img
            src={'/heart-with-arrow_1f498.png'}
            alt={'heart'}
            className={'size-8'}
          />
        </button>
      </div>
    </div>
  )
}

export default App
