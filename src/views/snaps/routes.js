import Root from './Root'
import Index from './Index'
import New from './New'
import Show from './Show'
import Edit from './Edit'
import Config from './Config'
import Run from './Run'
import History from './History'

export default{
  path: '/snaps',
  component: Root,
  meta: {
    breadcrumb: 'snap',
  },
  children: [
    {
      path: '/',
      component: Index,
      name: 'snaps'
    },
    {
      path: 'new',
      component: New,
      meta: {
        breadcrumb: 'new',
      },
    },
    {
      path: ':id',
      component: Show,
      meta: {
        breadcrumb: 'show',
      },
      children: [
        {
          path: '/',
          component: Config,
        },
        {
          path: 'run',
          component: Run,
        },
        {
          path: 'history',
          component: History,
        },
      ],
    },
    {
      path: ':id/edit',
      component: Edit,
      meta: {
        breadcrumb: 'edit',
      },
    },
  ],
}
