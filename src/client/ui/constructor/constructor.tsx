import React from 'https://esm.sh/react@18.2.0'

import { Message } from '../../shared/message.tsx'
import { Select, OptionItem } from '../../shared/select.tsx'
import { Input } from '../../shared/input.tsx'
import { Toggle } from '../../shared/toggle.tsx'
import { ButtonSubmit, ButtonSecondary } from '../../shared/button.tsx'
import { ENV } from '@/config'

const { API_URL } = ENV
const BADGE_TYPE = ['plain', 'skill', 'stack']
const badgeOptions = BADGE_TYPE.map((label, id) => ({ id, label }))

interface BadgeProps {
  title: string
  color?: string
  icon: string
  value: string
}

export const Constructor = () => {
  const [iconOptions, setIconOptions] = React.useState<OptionItem[]>([])
  const [badgeType, setBadgeType] = React.useState('plain')
  const [fields, setFields] = React.useState<BadgeProps>({ title: '', color: '', icon: '', value: '' })
  const [resultUrl, setResultUrl] = React.useState('')
  const [showCopied, setShowCopied] = React.useState(false)
  const [stackItems, setStackItems] = React.useState([{ title: '', icon: '', value: '' }])

  React.useEffect(() => {
    fetch(`${API_URL}/icons`)
      .then(res => res.json())
      .then(icons => {
        setIconOptions((icons as string[]).map((label, id) => ({ id, label })))
      })
      .catch(error => Message.show(error.message, 'error'))
  }, [])

  const handleTypeChange = (id?: number) => {
    const value = id ? BADGE_TYPE[id] : undefined
    if (value) {
      setBadgeType(value)
    }
  }

  const handleInput = (type: string, key: string, value: string, index?: number) => {
    if (type === 'plain' || type === 'skill') {
      setFields(prev => ({ ...prev, [key]: value }))
    } else if (type === 'stack' && index !== undefined) {
      const updatedItems = [...stackItems]
      updatedItems[index][key as keyof (typeof stackItems)[0]] = value
      setStackItems(updatedItems)
    }
  }

  const selectIcon = (type: string, icon: string, index?: number) => {
    if (type === 'plain' || type === 'skill') {
      setFields(prev => ({ ...prev, icon }))
    } else if (type === 'stack' && index !== undefined) {
      const updatedItems = [...stackItems]
      updatedItems[index].icon = icon
      setStackItems(updatedItems)
    }
  }

  const handleCreateBadge = () => {
    if (badgeType === 'plain' || badgeType === 'skill') {
      setResultUrl(
        `/${badgeType}?${new URLSearchParams({
          ...fields,
        }).toString()}`,
      )
    } else if (badgeType === 'stack') {
      let temp = `/${badgeType}?`
      stackItems.map(item => {
        const a = `${new URLSearchParams(item).toString()};`
        temp += a
      })
      temp = temp.slice(0, -1)
      setResultUrl(temp)
    }
  }

  const createFields = (fields: BadgeProps, index: number = 0) => {
    return (
      <div className="home__fields">
        {Object.entries(fields).map(([key, value]) => {
          if (key === 'icon') {
            return <Select key={key} options={iconOptions} name="icon" placeholder="icon" searchEnable onClick={(_, value) => selectIcon(badgeType, value, index)} />
          }

          return (
            <Input
              key={key}
              type="text"
              name={key}
              placeholder={key}
              value={value}
              onChange={value => handleInput(badgeType, key, value, index)}
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
          <ButtonSecondary onClick={() => setStackItems([...stackItems, { title: '', icon: '', value: '' }])}>
            Add
          </ButtonSecondary>
          <ButtonSecondary onClick={() => setStackItems(stackItems.slice(0, -1))}>
            Remove
          </ButtonSecondary>
        </div>
      </>
    )
  }

  const constructorForm = (type: string) => {
    return (
      <form className="home__form" onSubmit={e => e.preventDefault()}>
        {(type === 'plain' || type === 'skill') && createFields(fields)}
        {type === 'stack' && createStackFields()}
        <ButtonSubmit onClick={handleCreateBadge}>
          Create
        </ButtonSubmit>
      </form>
    )
  }

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 1000)
        Message.show('Copied to clipboard', 'regular')
      })
      .catch(error => Message.show(<div>Failed to copy: {error.message}</div>, 'error'))
  }

  return (
    <div className="home__constructor">
      <h3 className="home__title">Constructor</h3>
      <Toggle
        options={badgeOptions}
        defChecked={0}
        onChange={handleTypeChange}
      />
      {constructorForm(badgeType)}
      <div>
        <p>Result:</p>
        {resultUrl && (
          <div className="home__result_url" onClick={() => handleCopy(resultUrl)}>
            <code style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{resultUrl}</code>
            <div className="home__copy">
              {showCopied ? (
                <img className="home__copy_notification" src={`${API_URL}/img/success.svg`} alt="Success Icon" />
              ) : (
                <img src={`${API_URL}/img/copy.svg`} alt="Copy Icon" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
