import React from 'https://esm.sh/react@18.2.0'

import { Constructor } from '../constructor/constructor.tsx'
import { ENV } from '@/config'

const { API_URL } = ENV

export const Home = () => {
  return (
    <main className="home__main">
      <div className="home__welcome">
        <h1>Badge service</h1>
        <p>A pet project that provide ability to get variety of svg badges.</p>
      </div>
      <Constructor />
      <div className="home__examples">
        <h3 className="home__title">Examples</h3>
        <ul className="list__badges">
          <li className="home__badge_item">
            <h3>Plain badges</h3>
            <div className="preview">
              <img src={`${API_URL}/plain/?title=Deno&color=green&icon=deno&value=2.1`} />
            </div>
            <code className="home__code"> /plain/?title=Deno&color=green&icon=deno&value=2.1</code>
          </li>
          <li className="home__badge_item">
            <h3>Skill badges</h3>
            <div className="preview">
              <img src={`${API_URL}/skill/?title=React.js&icon=react&value=50`} />
            </div>
            <code className="home__code">/skill/?title=React.js&icon=react&value=50</code>
          </li>
          <li className="home__badge_item">
            <h3>Stack badges</h3>
            <div className="preview">
              <img
                src={`${API_URL}/stack/?title=HTML5&value=75&icon=html;title=CSS&value=35&icon=css;title=React.js&icon=react&value=50`}
              />
            </div>
            <code className="home__code">
              /stack/?title=HTML5&value=75&icon=html;title=CSS&value=35&icon=css;title=React.js&icon=react&value=50
            </code>
          </li>
        </ul>
      </div>
    </main>
  )
}
