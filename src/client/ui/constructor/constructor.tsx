import React from 'https://esm.sh/react@18.2.0'

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

  const [filteredIcons, setFilteredIcons] = React.useState(iconOptions)

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBadgeType(event.target.value)
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

  const toggleDropdown = () => {
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
      setShowIconDropdown(false)
    }
  }

  const handleCreateBadge = (e: React.FormEvent, type: string) => {
    e.preventDefault()
    switch (type) {
      case 'plain':
        {
          const resultUrl = `/${badgeType}?${new URLSearchParams(plainFields).toString()}`
        }
        break
      case 'skill':
        {
          const resultUrl = `/${badgeType}?${new URLSearchParams(skillFields).toString()}`
        }
        break
      case 'stack':
        {
          let resultUrl = `/${badgeType}?`
          stackItems.map(item => {
            const a = `${new URLSearchParams(item).toString()};`

            resultUrl += a
          })
          resultUrl = resultUrl.slice(0, -1)
          console.log(resultUrl)
        }
        break
    }
  }
  const createFields = (fields: Record<string, string>, index?: number) => {
    return (
      <div className="home__fields">
        {Object.entries(fields).map(([key, value]) => {
          if (key === 'icon')
            return (
              <div key={key} className="home__icon_container">
                <input
                  className="home__input"
                  type="text"
                  name="icon"
                  placeholder="icon"
                  value={fields.icon}
                  onChange={e => handleInput(badgeType, key, e.target.value, index)}
                  onFocus={() => toggleDropdown()}
                />
                {showIconDropdown && (
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
    </div>
  )
}
