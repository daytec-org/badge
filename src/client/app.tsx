import React from 'https://esm.sh/react@18.2.0'

import { Header } from './ui/header/header.tsx'
import { Home } from './ui/home/home.tsx'
import { Footer } from './ui/footer/footer.tsx'
import { Modal } from './shared/modal.tsx'
import { Message } from './shared/message.tsx'

export const App = () => {
  return (
    <>
      <Header />
      <Home />
      <Footer />
      <Modal />
      <Message />
    </>
  )
}
