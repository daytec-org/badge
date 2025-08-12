import React from 'https://esm.sh/react@18.2.0'

import { ENV } from '@/config'
import { Theme } from '../theme/theme.tsx'

const { API_URL } = ENV

export const Header = () => {
  return (
    <header className="header">
      <a href="/" className="header__title">
        <div className="header__logo">
          <img src={`${API_URL}/favicon.ico`} alt="logo" />
        </div>
        <div> Badge service</div>
      </a>
      <Theme />
    </header>
  )
}
