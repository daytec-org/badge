import React from 'https://esm.sh/react@18.2.0'
import { API_URL } from '../../../const.ts'

export const Header = () => {
  const [theme, setTheme] = React.useState('dark')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const newTheme = checked ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.className = `theme-${newTheme}`
  }

  return (
    <header className="header">
      <a href="/" className="header__title">
        <div className="header__logo">
          <img src={`${API_URL}/favicon.ico`} alt="logo" />
        </div>
        <div> Badge service</div>
      </a>
      <div className="header__right">
        <a href="https://github.com/daytec-org/badge" target="_blank">
          GitHub
        </a>
        <div className="header__theme">
          <input
            className="header__theme_switcher"
            type="checkbox"
            checked={theme === 'dark'}
            onChange={handleChange}
          />
          <img src={`${API_URL}/img/${theme}`} alt="theme" />
        </div>
      </div>
    </header>
  )
}
