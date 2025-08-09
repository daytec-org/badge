import React from 'https://esm.sh/react@18.2.0'
import { ENV } from '@/config'
import { badges } from '../../../data/badges.ts'

const { API_URL } = ENV

export const Examples = () => {
  return (
    <div className="home__examples">
      <h3 className="home__title">Examples</h3>
      <ul className="list__badges">
        {badges.map(badge => {
          return (
            <li className="home__badge_item" key={badge.id}>
              <h3>{badge.title} badges</h3>
              <div className="preview">
                <img src={`${API_URL}${badge.link}`} />
              </div>
              <code className="home__code"> {badge.link}</code>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
