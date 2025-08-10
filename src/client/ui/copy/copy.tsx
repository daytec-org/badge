import React from 'https://esm.sh/react@18.2.0'

import { ENV } from '@/config'
import { Message } from '../../shared/message.tsx'

const { API_URL } = ENV

export const Copy = ({ text }: { text: string }) => {
  const [showCopied, setShowCopied] = React.useState(false)

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
    <div className="copy__container  input_container" onClick={() => handleCopy(text)}>
      <div className="input">{text}</div>
      {showCopied ? (
        <img className="copy" src={`${API_URL}/img/success.svg`} alt="Success Icon" />
      ) : (
        <img className="copy copy__icon" src={`${API_URL}/img/copy.svg`} alt="Copy Icon" />
      )}
    </div>
  )
}
