import React from 'https://esm.sh/react@18.2.0'
import { ENV } from '@/config'

const { API_URL } = ENV

type BadgesCardProp = {
  id: string
  title: string
  link: string
}

export const BadgesCard = ({ id, title, link }: BadgesCardProp) => {
  return (
    <li className="home__badge_item" key={id}>
      <h3>{title} badges</h3>
      <div className="preview">
        <img src={`${API_URL}${link}`} />
      </div>
      <code className="home__code"> {link}</code>
    </li>
  )
}
