import React from 'https://esm.sh/react@18.2.0'
import { API_URL } from '../home/home.tsx'

export const Constructor = () => {
  const iconOptions = ['react', 'deno', 'docker', 'js', 'node', 'python', 'ts', 'vite']
  const [badgeType, setBadgeType] = React.useState('plain')
  const [plainFields, setPlainFields] = React.useState({
    title: '',
    color: '',
    icon: '',
    value: '',
  })
  const [skillFields, setSkillFields] = React.useState({
    title: '',
    icon: '',
    value: '',
  })
  const [stackItems, setStackItems] = React.useState([
    {
      title: '',
      icon: '',
      value: '',
    },
  ])
  const [showIconDropdown, setShowIconDropdown] = React.useState(false)
  const [stackIconDropdown, setStackIconDropdown] = React.useState([false])

  const [filteredIcons, setFilteredIcons] = React.useState(iconOptions)
  const [resultUrl, setResultUrl] = React.useState('')

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBadgeType(event.target.value)
    setShowIconDropdown(false)
    setStackIconDropdown(prev => prev.map(() => false))
  }

  const handleInput = (type: string, key: string, value: string, index?: number) => {
    if (key === 'icon') {
      setShowIconDropdown(true)
      const filtered = iconOptions.filter(icon => icon.toLowerCase().includes(value.toLowerCase()))
      setFilteredIcons(filtered)
    }

    if (type === 'plain') {
      setPlainFields(prev => ({ ...prev, [key]: value }))
    } else if (type === 'skill') {
      setSkillFields(prev => ({ ...prev, [key]: value }))
    } else if (type === 'stack' && index !== undefined) {
      const updatedItems = [...stackItems]
      updatedItems[index][key as keyof (typeof stackItems)[0]] = value
      setStackItems(updatedItems)
    }
  }

  const toggleDropdown = (type: string, index?: number) => {
    if (type === 'stack' && index !== undefined) {
      const updatedItems = [...stackIconDropdown]
      updatedItems[index] = !updatedItems[index]
      setStackIconDropdown(updatedItems)
    }
    setShowIconDropdown(!showIconDropdown)
  }

  const selectIcon = (type: string, icon: string, index?: number) => {
    if (type === 'plain') {
      setPlainFields(prev => ({ ...prev, icon }))
      setShowIconDropdown(false)
    } else if (type === 'skill') {
      setSkillFields(prev => ({ ...prev, icon }))
      setShowIconDropdown(false)
    } else if (type === 'stack' && index !== undefined) {
      const updatedItems = [...stackItems]
      updatedItems[index].icon = icon
      setStackItems(updatedItems)
      // setShowIconDropdown(false)
      setStackIconDropdown(prev => prev.map((el, i) => (i === index ? false : el)))
    }
  }

  const handleCreateBadge = (e: React.FormEvent, type: string) => {
    e.preventDefault()
    setResultUrl('')
    switch (type) {
      case 'plain':
        {
          setResultUrl(`/${badgeType}?${new URLSearchParams(plainFields).toString()}`)
        }
        break
      case 'skill':
        {
          setResultUrl(`/${badgeType}?${new URLSearchParams(skillFields).toString()}`)
        }
        break
      case 'stack':
        {
          let temp = `/${badgeType}?`
          stackItems.map(item => {
            const a = `${new URLSearchParams(item).toString()};`

            temp += a
          })
          temp = resultUrl.slice(0, -1)
          setResultUrl(temp)
        }
        break
    }
  }
  const createFields = (fields: Record<string, string>, index: number = 0) => {
    return (
      <div className="home__fields">
        {Object.entries(fields).map(([key, value]) => {
          if (key === 'icon') {
            const isShown = badgeType === 'stack' ? stackIconDropdown[index] : showIconDropdown
            return (
              <div key={key} className="home__icon_container">
                <input
                  className="home__input"
                  type="text"
                  name="icon"
                  placeholder="icon"
                  value={fields.icon}
                  onChange={e => handleInput(badgeType, key, e.target.value, index)}
                  onFocus={() => toggleDropdown(badgeType, index)}
                />
                {isShown && (
                  <div className="home__icon_dropdown">
                    {filteredIcons.map(icon => (
                      <div key={icon} className="home__icon_option" onClick={() => selectIcon(badgeType, icon, index)}>
                        {icon}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <input
              key={key}
              className="home__input"
              type="text"
              name={key}
              placeholder={key}
              value={value}
              onChange={e => handleInput(badgeType, key, e.target.value, index)}
            />
          )
        })}
      </div>
    )
  }

  const stackFields = () => {
    return (
      <>
        {stackItems.map((item, index) => createFields(item, index))}
        <div className="home__stack_btns_container">
          <button
            className="home__stack_btn"
            type="button"
            onClick={() => setStackItems([...stackItems, { title: '', icon: '', value: '' }])}
          >
            Add
          </button>
          <button className="home__stack_btn" type="button" onClick={() => setStackItems(stackItems.slice(0, -1))}>
            Remove
          </button>
        </div>
      </>
    )
  }

  const constructorForm = (type: string) => {
    return (
      <form className="home__form">
        {type === 'plain' && createFields(plainFields)}
        {type === 'skill' && createFields(skillFields)}
        {type === 'stack' && stackFields()}
        <button className="home__submit_btn" type="submit" onClick={e => handleCreateBadge(e, type)}>
          Create
        </button>
      </form>
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('URL скопирован в буфер обмена!')
      })
      .catch(err => {
        console.error('Ошибка при копировании: ', err)
      })
  }

  return (
    <div className="home__info">
      <h3 className="home__title">Constructor</h3>
      <label>
        Select type of badge:
        <select className="home__select" value={badgeType} onChange={handleTypeChange}>
          <option value="plain">plain</option>
          <option value="skill">skill</option>
          <option value="stack">stack</option>
        </select>
      </label>
      {constructorForm(badgeType)}

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          background: '#000',
          borderRadius: '5px',
          position: 'relative',
        }}
      >
        <h3>Result URL:</h3>
        <div
          className="home__result_url"
          // style={{
          //   display: 'flex',
          //   alignItems: 'center',
          //   justifyContent: 'space-between',
          //   background: 'black',
          //   padding: '10px',
          //   borderRadius: '4px',
          //   border: '1px solid #ddd',
          //   cursor: 'pointer',
          // }}
          onClick={() => copyToClipboard(resultUrl)}
        >
          <code style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{resultUrl}</code>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ marginLeft: '10px', flexShrink: 0 }}
            onClick={e => {
              e.stopPropagation() // Предотвращаем всплытие события
              copyToClipboard(resultUrl)
            }}
          > */}
          {resultUrl && (
            <div className="home__copy">
              <img src={`${API_URL}/img/copy`} alt="Copy Icon" />
            </div>
          )}
          {/* <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
          </svg> */}
        </div>
      </div>
    </div>
  )
}
