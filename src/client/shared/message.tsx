import React from 'https://esm.sh/react@18.2.0'

type TMode = 'regular' | 'error'
type TChildren = React.ReactNode | string
interface MessageComponent {
  show: (children: TChildren, mode?: TMode) => void
  (): React.ReactNode
}
interface MessageData {
  id: number
  children: TChildren
  mode: TMode
  hidden?: boolean
}

export const Message: MessageComponent = (() => {
  const state: {
    set: React.Dispatch<React.SetStateAction<MessageData[]>> | null
  } = { set: null }

  const Container = () => {
    const [children, setChildren] = React.useState<MessageData[]>([])
    state.set = setChildren

    return (
      <div className="messages">
        {children.map(({ id, children, mode, hidden }) => (
          <div key={id} className={`${hidden ? 'messages__item hidden' : 'messages__item'}`}>
            {mode === 'error' ? (
              <div className="messages__item_icon" style={{ backgroundColor: 'gray' }}>
                {'\u274C'}
              </div>
            ) : (
              <div className="messages__item_icon">
                {'\u2714'}
              </div>
            )}
            {children}
          </div>
        ))}
      </div>
    )
  }

  Container.show = (children: TChildren, mode: TMode = 'regular') => {
    if (children && state.set) {
      const id = Date.now()
      state.set(prev => [...prev, { id, children, mode }])
      setTimeout(() => {
        if (state.set) state.set(prev => prev.map(item => (item.id === id ? { ...item, hidden: true } : item)))
        setTimeout(() => {
          if (state.set) state.set(prev => prev.filter(item => item.id !== id))
        }, 500)
      }, 5000)
    }
  }

  return Container
})()
