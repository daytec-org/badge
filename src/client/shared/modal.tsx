import React from 'https://esm.sh/react@18.2.0'
import { ENV } from '@/config'

const { API_URL } = ENV

interface ModalComponent {
  show: (children?: React.ReactNode) => void
  close: (reset?: boolean) => void
  ({ children }: { children?: React.ReactNode }): React.JSX.Element
}
type TState = { visible: boolean; children: React.ReactNode | null; reset: boolean }
type TModalSetter = React.Dispatch<React.SetStateAction<TState>>

export const Modal: ModalComponent = (() => {
  const holder: {
    setState: TModalSetter | null
    register: (setter: TModalSetter) => void
  } = { setState: null, register: (setter: TModalSetter) => (holder.setState = setter) }

  const Container = ({ children }: { children?: React.ReactNode }) => {
    const [state, setState] = React.useState<TState>({ visible: false, children, reset: false })
    holder.register(setState)

    const handleClick = (event: React.MouseEvent) => {
      if (!state.visible) return
      const { target, currentTarget } = event
      if (target === currentTarget) {
        event.preventDefault()
        closeModal()
      }
    }

    const closeModal = () => setState(prev => ({ ...prev, visible: false, reset: true }))

    return (
      <div className={state.visible ? 'modal__outer' : 'modal__outer_hidden'} onClick={handleClick}>
        <div className="modal__inner">
          <div className="modal__close" onClick={closeModal}>
            <img src={`${API_URL}/img/cross.svg`} alt="close" />
          </div>
          {!state.reset && state.children}
        </div>
      </div>
    )
  }

  Container.show = (children?: React.ReactNode) => {
    if (children && holder.setState) holder.setState({ visible: true, children, reset: false })
    else if (holder.setState) holder.setState(prev => ({ ...prev, visible: true, reset: false }))
  }

  Container.close = (reset: boolean = false) => {
    if (holder.setState) holder.setState(prev => ({ ...prev, visible: false, reset }))
  }

  return Container
})()
