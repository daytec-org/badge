import React from 'https://esm.sh/react@18.2.0'

const API_URL = 'http://localhost:3000' //'https://badge-service.deno.dev'

export const Header = () => {
  return (
    <header className="header">
      {/* <div className="preview">
        <img src={`${API_URL}/favicon.ico`} alt="logo" />
      </div>
      
      */}

      <a href="/" className="header__title">
        <img className="header__logo" src={`${API_URL}/favicon.ico`} alt="logo" />
        <div> Badge service</div>
      </a>
      <div className="header__theme">
        <img src={`${API_URL}/img/moon`} alt="logo" />
      </div>
    </header>
  )
}
