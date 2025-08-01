import React from 'https://esm.sh/react@18.2.0'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
  type?: string
  name: string
  placeholder: string
  defaultValue?: string | number
  required?: boolean
  disabled?: boolean
  minLength?: number
  pattern?: string
  title?: string
  readonly?: boolean
  children?: React.ReactNode
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, placeholder, defaultValue, required, disabled, minLength, pattern, title, readonly, children, onChange, onBlur, hidden }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'number' && Number(e.target.value) < 0) {
        return
      }

      if (onChange) onChange(e.target.value)
    }

    return (
      <div className={hidden ? 'input_container hidden' : 'input_container'} onClick={e => e.stopPropagation()}>
        <input
          ref={ref}
          type={type}
          className="input"
          name={name}
          id={`form_${name}`}
          placeholder=" "
          minLength={minLength}
          autoComplete="false"
          defaultValue={defaultValue}
          required={required ?? false}
          disabled={disabled}
          pattern={pattern}
          title={title}
          readOnly={readonly}
          onChange={handleChange}
          onBlur={e => {
            if (onBlur) onBlur(e.target.value)
          }}
          hidden={hidden}
        />
        <label className="input__placeholder" htmlFor={`form_${name}`}>
          {placeholder}
        </label>
        {pattern && <span className="input__valid">&#x2714;</span>}
        {children}
      </div>
    )
  },
)
