import React from 'https://esm.sh/react@18.2.0'

export type TSelectProps = {
  options: string[]
  name: string
  placeholder: string
  defaultValue?: string | number
  value?: string | number
  required?: boolean
  title?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, TSelectProps>(
  ({ options, name, placeholder, defaultValue, value, required, title, onChange, onBlur }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) onChange(e.target.value)
    }

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
      if (onBlur) onBlur(e.target.value)
    }

    return (
      <div className="select" onClick={e => e.stopPropagation()}>
        <select
          ref={ref}
          className="select__element"
          name={name}
          defaultValue={defaultValue}
          value={value}
          required={required ?? false}
          title={title}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {options.map((role, i) => (
            <option key={i}>{role}</option>
          ))}
        </select>
        <div className="select__placeholder">{placeholder}</div>
      </div>
    )
  },
)

Select.displayName = 'Select'

export { Select }
