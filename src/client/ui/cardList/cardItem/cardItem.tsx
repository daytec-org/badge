import React from 'https://esm.sh/react@18.2.0'
import { ENV } from '@/config'

const { API_URL } = ENV

type CardItemProp = {
  id: string
  title: string
  link: string
}

export const CardItem = ({ id, title, link }: CardItemProp) => {
  return (
    <li className="card__item" key={id}>
      <h3>{title} badge</h3>
      <div className="card__item_preview">
        <img src={`${API_URL}${link}`} className={title === 'Stack' ? 'stack' : ''} />
      </div>
      <code className="card__item_code">{link}</code>
    </li>
  )
}
