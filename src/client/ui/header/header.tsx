import React from 'https://esm.sh/react@18.2.0'
import { API_URL } from '../../../const.ts'
import { Theme } from '../theme/theme.tsx'

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
