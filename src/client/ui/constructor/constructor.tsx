import React from 'https://esm.sh/react@18.2.0'
import { Controller, useForm, useFieldArray } from 'https://esm.sh/react-hook-form@7.45.0?deps=react@18.2.0'

import { Message } from '../../shared/message.tsx'
import { Select, OptionItem } from '../../shared/select.tsx'
import { Input } from '../../shared/input.tsx'
import { Toggle } from '../../shared/toggle.tsx'
import { ButtonSubmit, ButtonSecondary } from '../../shared/button.tsx'
import { ENV } from '@/config'
import { Copy } from '../copy/copy.tsx'

const { API_URL } = ENV
const BADGE_TYPE = ['plain', 'skill', 'stack']
const badgeOptions = BADGE_TYPE.map((label, id) => ({ id, label }))
const resultType = ['URL', 'Markdown', 'rSt', 'AsciiDoc', 'HTML']
const resultOptions = resultType.map((label, id) => ({ id, label }))

interface BadgeProps {
  title: string
  color: string
  icon: string
  value: string
}

interface FormValues {
  title: string
  color: string
  icon: string
  value: string
  stackItems: BadgeProps[]
  result: string
}

export const Constructor = () => {
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      color: '',
      icon: '',
      value: '',
      stackItems: [
        { title: '', color: '', icon: '', value: '' },
        { title: '', color: '', icon: '', value: '' },
      ],
      result: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stackItems',
  })
  const badgeValues = watch(['title', 'color', 'icon', 'value', 'stackItems'])
  const [iconOptions, setIconOptions] = React.useState<OptionItem[]>([])
  const [badgeType, setBadgeType] = React.useState('plain')
  const [resultUrl, setResultUrl] = React.useState('')
  const [isShowBadge, setIsShowBadge] = React.useState(false)
  const [resultView, setResultView] = React.useState('URL')

  React.useEffect(() => {
    fetch(`${API_URL}/icons`)
      .then(res => res.json())
      .then(icons => {
        setIconOptions((icons as string[]).map((label, id) => ({ id, label })))
      })
      .catch(error => Message.show(error.message, 'error'))
  }, [])

  React.useEffect(() => {
    const values = getValues()
    createBadgeURL(values)
    const result = createBadgeString()
    setValue('result', result)
  }, [badgeValues, resultView])

  const handleTypeChange = (id?: number) => {
    const value = id !== undefined ? BADGE_TYPE[id] : undefined
    if (value) {
      setBadgeType(value)
    }
  }

  const handleResultChange = (id?: number) => {
    const value = id !== undefined ? resultType[id] : undefined
    if (value) {
      setResultView(value)
    }
  }

  const createFields = () => {
    return (
      <div className="home__fields">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              name="title"
              type="text"
              placeholder="title"
              value={field.value}
              onChange={value => field.onChange(value)}
            />
          )}
        />
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <Input
              name="color"
              type="text"
              placeholder="color"
              value={field.value}
              onChange={value => field.onChange(value)}
            />
          )}
        />
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <Select
              options={iconOptions}
              name="icon"
              placeholder="icon"
              searchEnable
              onClick={(_, value) => field.onChange(value)}
            />
          )}
        />
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <Input
              name="value"
              type="text"
              placeholder="value"
              value={field.value}
              onChange={value => field.onChange(value)}
            />
          )}
        />
      </div>
    )
  }

  const createStackFields = () => {
    return (
      <>
        {fields.map((stackItem, i) => (
          <div key={stackItem.id} className="home__fields">
            <Controller
              name={`stackItems.${i}.title`}
              control={control}
              render={({ field }) => (
                <Input
                  name={`stackItems.${i}.title`}
                  type="text"
                  placeholder="title"
                  value={field.value}
                  onChange={value => field.onChange(value)}
                />
              )}
            />

            <Controller
              name={`stackItems.${i}.icon`}
              control={control}
              render={({ field }) => (
                <Select
                  options={iconOptions}
                  name={`stackItems.${i}.icon`}
                  placeholder="icon"
                  searchEnable
                  onClick={(_, value) => field.onChange(value)}
                />
              )}
            />
            <Controller
              name={`stackItems.${i}.value`}
              control={control}
              render={({ field }) => (
                <Input
                  name={`stackItems.${i}.value`}
                  type="text"
                  placeholder="value"
                  value={field.value}
                  onChange={value => field.onChange(value)}
                />
              )}
            />
          </div>
        ))}

        <div className="home__stack_btns_container">
          <ButtonSecondary onClick={removeGroup} disabled={fields.length <= 2}>
            Remove
          </ButtonSecondary>
          <ButtonSecondary onClick={addGroup}>Add</ButtonSecondary>
        </div>
      </>
    )
  }

  const addGroup = () => {
    append({ title: '', color: '', icon: '', value: '' })
  }

  const removeGroup = () => {
    remove(fields.length - 1)
  }

  const createBadgeURL = (data: FormValues) => {
    if (badgeType === 'plain' || badgeType === 'skill') {
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries({
            title: data.title,
            color: data.color,
            icon: data.icon,
            value: data.value,
          }).filter(([_, value]) => value != null && value !== ''),
        ),
      )
      setResultUrl(`${API_URL}/${badgeType}?${params.toString()}`)
    } else if (badgeType === 'stack') {
      const stackParams = data.stackItems
        .map((item: BadgeProps) =>
          new URLSearchParams(
            Object.fromEntries(
              Object.entries({
                title: item.title,
                icon: item.icon,
                value: item.value,
              }).filter(([_, value]) => value != null && value !== ''),
            ),
          ).toString(),
        )
        .join(';')
      setResultUrl(`${API_URL}/${badgeType}?${stackParams}`)
    }
  }

  const createBadgeString = () => {
    switch (resultView) {
      case 'URL':
        return resultUrl
      case 'Markdown':
        return `![${badgeType} badge](${resultUrl})`
      case 'rSt':
        return `.. image:: ${resultUrl}/n:alt: ${badgeType} badge`
      case 'AsciiDoc':
        return `image::${resultUrl}[${badgeType} badge]`
      case 'HTML':
        return `<img alt="${badgeType} badge" src="${resultUrl}">`
      default:
        return resultUrl
    }
  }

  const handleShow = () => {
    setIsShowBadge(true)
  }

  const constructorForm = (type: string) => {
    return (
      <form className="home__form" onSubmit={handleSubmit(handleShow)}>
        {(type === 'plain' || type === 'skill') && createFields()}
        {type === 'stack' && createStackFields()}
        <div>
          <Toggle options={resultOptions} defChecked={0} onChange={handleResultChange} />
          <Controller name="result" control={control} render={({ field }) => <Copy text={field.value} />} />
        </div>
        <ButtonSubmit>Show</ButtonSubmit>
        {isShowBadge && <img className="home__result_img" src={`${resultUrl}`} />}
      </form>
    )
  }

  return (
    <div className="home__constructor">
      <h3 className="home__title">Constructor</h3>
      <Toggle options={badgeOptions} defChecked={0} onChange={handleTypeChange} />
      <form className="home__form" onSubmit={handleSubmit(handleShow)}>
        {(badgeType === 'plain' || badgeType === 'skill') && createFields()}
        {badgeType === 'stack' && createStackFields()}
        <div>
          <Toggle options={resultOptions} defChecked={0} onChange={handleResultChange} />
          <Controller name="result" control={control} render={({ field }) => <Copy text={field.value} />} />
        </div>
        <ButtonSubmit>Show</ButtonSubmit>
        {isShowBadge && <img className="home__result_img" src={`${resultUrl}`} />}
      </form>
    </div>
  )
}
