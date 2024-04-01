export const Guidelines = () => {
  return (
    <div className={'absolute bottom-0 z-50 top-[70px] h-[calc(100%-70px)] w-full p-4'}>
      <div className={'size-full rounded-md bg-black bg-opacity-60 p-4'}>
        <h2 className={'text-center text-4xl font-bold text-white'}>
          Průvodce
        </h2>

        <div className={'mt-8 w-full text-lg text-white h-[calc(100%-80px)] overflow-y-scroll'}>
          <h3 className={'text-2xl font-bold text-white'}>Pravidlá</h3>
          <ul className={'mt-2 list-decimal px-8'}>
            <li>Při hře se snažte být co nejvíce upřímní.</li>
            <li>Nejlepší hry se hrají s alkoholem.</li>
            <li>
              V případe že úkol/pravdu nechceš splnit/říct, může se přihlásit
              hráč který ho/ju chce splnit/říct a může ti dát úkol/pravdu na
              oplátku který musíš splnit/říct inak se musíš napiť (2 shoty -
              odmítl/a jsi 2x).
            </li>
            <li>Pravda nebo úkol jsou vždy náhodné.</li>
            <li>
              Hrač má právo na výběr medzi funny a erotickými úkoly/pravdami.
            </li>
            <li>Skupinové úkoly/pravdy jsou vždy skupinové.</li>
          </ul>

          <h3 className={'mt-8 text-2xl font-bold text-white'}>Vysvetlivky</h3>
          <ul className={'mt-2 list-decimal px-8'}>
            <li>
              <span className={'font-bold'}>Smajlík:</span> Funny úkoly/pravdy.
            </li>
            <li>
              <span className={'font-bold'}>Srdíčko:</span> Erotické
              úkoly/pravdy.
            </li>
            <li>
              <span className={'font-bold'}>Šance na pravdu:</span> 30%
            </li>
            <li>
              <span className={'font-bold'}>Šance na úkol:</span> 70%
            </li>
            <li>
              <span className={'font-bold'}>Šance na skupinový úkol:</span> 15%
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
