import React from 'https://esm.sh/react@18.2.0'
import { Constructor } from '../constructor/constructor.tsx'
import { CardList } from '../cardList/cardList.tsx'

export const Home = () => {
  return (
    <main className="home__main">
      <div className="home__welcome">
        <h1>Badge service</h1>
        <p>A pet project that provide ability to get variety of svg badges.</p>
      </div>
      <Constructor />
      <CardList />
    </main>
  )
}
