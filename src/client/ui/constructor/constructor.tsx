import React, { useEffect, useMemo } from 'https://esm.sh/react@18.2.0'
import { API_URL } from '../../../const.ts'

export const Constructor = () => {
  const [iconOptions, setIconOptions] = React.useState<string[]>([])
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
  const [showCopied, setShowCopied] = React.useState(false)

  useEffect(() => {
    const fetchIcons = async () => {
      const icons = await fetch(`${API_URL}/icons`).then(res => res.json())
      setIconOptions(icons)
      setFilteredIcons(icons)
    }
    fetchIcons()
  }, [])

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
      setStackIconDropdown(prev => prev.map((el, i) => (i === index ? false : el)))
    }
  }

  const handleCreateBadge = (e: React.FormEvent, type: string) => {
    e.preventDefault()
    switch (badgeType) {
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
          temp = temp.slice(0, -1)
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

  const createStackFields = () => {
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
        {type === 'stack' && createStackFields()}
        <button className="home__submit_btn" type="submit" onClick={e => handleCreateBadge(e, type)}>
          Create
        </button>
      </form>
    )
  }

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 1000)
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
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
      <div>
        <p>Result:</p>
        {resultUrl && (
          <div className="home__result_url" onClick={() => handleCopy(resultUrl)}>
            <code style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{resultUrl}</code>
            <div className="home__copy">
              <img src={`${API_URL}/img/copy`} alt="Copy Icon" />
              {showCopied && <div className="home__copy_notification">Copied</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
