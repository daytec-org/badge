console.log('https://github.com/daytec-org')

import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client'
import { App } from './app.tsx'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')
const root = createRoot(rootElement)
root.render(App())
