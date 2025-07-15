import React from "https://esm.sh/react@18.2.0"

const API_URL = 'http://localhost:3000' //'https://badge-service.deno.dev'

export const Home = () => {
  return (
    <main>
      <h3>Badges:</h3>
      <ul className="badge_list">
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
            <img src={`${API_URL}/stack/?title=HTML5&value=80&icon=html;title=CSS&value=70&icon=css;title=JavaScript,TypeScript&value=80&icon=js`} />
          </div>
        </li>
      </ul>
    </main>
  )
}
