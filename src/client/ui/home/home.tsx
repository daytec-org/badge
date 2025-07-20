import React from 'https://esm.sh/react@18.2.0'
import { Constructor } from '../constructor/constructor.tsx'

const API_URL = 'http://localhost:3000' //'https://badge-service.deno.dev'

export const Home = () => {
  return (
    <main className="home__main">
      <div className="home__info">
        <h1>Badge service</h1>
        <p>A pet project that provide ability to get variety of svg badges.</p>
      </div>
      <Constructor />
      <div>
        <h3 className="home__title">Preview</h3>
        <ul className="home__badges">
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

      {/* <ul className="badge_list">
        <li className="badge_list__item">
          <div>plain [title, color, icon, value]</div>
          <div>
            example: <code>/plain/?title=Node.js&icon=node</code>
          </div>
          <div className="preview">
            preview: <img src={`${API_URL}/plain/?title=Node.js&icon=node`} />
          </div>
        </li>
        <li className="badge_list__item">
          <div>skill [size, title, color, icon, value]</div>
          <div>
            example: <code>/skill/?title=React.js&icon=react&value=50</code>
          </div>
          <div className="preview">
            preview: <img src={`${API_URL}/skill/?title=React.js&icon=react&value=50`} />
          </div>
        </li>
        <li className="badge_list__item">
          <div>stack skill;skill...</div>
          <div>
            example: <code>/stack/?title=HTML5&value=75&icon=html;title=CSS&value=35&icon=css</code>
          </div>
          <div className="preview">
            preview:
            <img
              src={`${API_URL}/stack/?title=HTML5&value=80&icon=html;title=CSS&value=70&icon=css;title=JavaScript,TypeScript&value=80&icon=js`}
            />
          </div>
        </li>
      </ul> */}
    </main>
  )
}
