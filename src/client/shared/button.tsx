import React from 'https://esm.sh/react@18.2.0'

export interface ButtonProps {
  children: string | JSX.Element
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function ButtonSubmit({ children, loading, disabled, onClick }: ButtonProps) {
  return (
    <button className="button primary" type="submit" disabled={disabled || loading} onClick={onClick}>
      {loading ? <div className="button__loader" /> : children}
    </button>
  )
}

export function ButtonSecondary({ children, loading, disabled, onClick }: ButtonProps) {
  return (
    <button className="button secondary" type="button" disabled={disabled || loading} onClick={onClick}>
      {loading ? <div className="button__loader" /> : children}
    </button>
  )
}
