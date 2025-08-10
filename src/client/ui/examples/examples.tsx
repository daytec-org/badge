import React from 'https://esm.sh/react@18.2.0'
import { badges } from '../../../data/badges.ts'
import { BadgesCard } from '../badgesCard/badgesCard.tsx'

export const Examples = () => {
  return (
    <div className="home__examples">
      <h3 className="home__title">Examples</h3>
      <ul className="list__badges">
        {badges.map(badge => {
          return <BadgesCard id={badge.id} title={badge.title} link={badge.link} key={badge.id} />
        })}
      </ul>
    </div>
  )
}
