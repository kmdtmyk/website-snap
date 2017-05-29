import App from './views/App'
import snaps from './views/snaps/routes'

export default [
  {
    path: '/', component: App,
  },
  snaps,
]
