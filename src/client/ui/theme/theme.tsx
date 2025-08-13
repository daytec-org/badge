import React from 'https://esm.sh/react@18.2.0'

import { ENV } from '@/config'

const { API_URL } = ENV

export const Theme = () => {
  const [theme, setTheme] = React.useState('dark')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const newTheme = checked ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.className = `theme-${newTheme}`
  }

  return (
    <label className="header__theme">
      <input id="color-scheme" type="checkbox" checked={theme === 'dark'} onChange={handleChange} />
      <img src={`${API_URL}/img/${theme}.svg`} alt="theme" />
    </label>
  )
}
