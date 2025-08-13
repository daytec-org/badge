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
        setTimeout(() => setShowCopied(false), 2000)
        Message.show('Copied to clipboard', 'regular')
      })
      .catch(error => Message.show(<div>Failed to copy: {error.message}</div>, 'error'))
  }

  return (
    <div className="copy__container">
      <div>{text}</div>
      <div className="copy__btn" onClick={() => handleCopy(text)}>
        {showCopied ? (
          <img src={`${API_URL}/img/success.svg`} alt="copy" />
        ) : (
          <img className="themed_icon" src={`${API_URL}/img/copy.svg`} alt="copy" />
        )}
      </div>
    </div>
  )
}
