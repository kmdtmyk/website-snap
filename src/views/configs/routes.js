import Index from './Index'
import New from './New'
import Show from './Show'
import Edit from './Edit'

export default {
  path: '/configs', component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: '/', component: Index},
    { path: 'new', component: New},
    { path: ':id', component: Show},
    { path: ':id/edit', component: Edit},
  ],
}
