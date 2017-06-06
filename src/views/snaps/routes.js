import Root from './Root'
import Index from './Index'
import New from './New'
import Show from './Show'
import Edit from './Edit'
import Histories from './Histories'

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
    },
    {
      path: ':id/edit',
      component: Edit,
      meta: {
        breadcrumb: 'edit',
      },
    },
    {
      path: ':id/histories',
      component: Histories,
      meta: {
        breadcrumb: 'histories',
      },
    },
  ],
}
