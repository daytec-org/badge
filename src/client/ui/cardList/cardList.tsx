import React from 'https://esm.sh/react@18.2.0'
import { badges } from '../../../data/badges.ts'
import { CardItem } from './cardItem/cardItem.tsx'

export const CardList = () => {
  return (
    <div className="card__list">
      <h3 className="card__list_title">Examples</h3>
      <ul className="card__list_item">
        {badges.map(badge => {
          return <CardItem id={badge.id} title={badge.title} link={badge.link} key={badge.id} />
        })}
      </ul>
    </div>
  )
}
