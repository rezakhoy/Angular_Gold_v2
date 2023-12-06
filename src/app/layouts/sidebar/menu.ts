import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'منو',
        isTitle: true,
        per: ['admin', 'user', 'super_admin']
    },
  {
    id: 2,
    label: 'داشبورد',
    icon: 'bx-home-circle',
    link: '/',
  },
  {
    id: 3,
    label: 'گروهای قیمتی',
    icon: 'bx bxs-dollar-circle',
    link: '/price-group',
    per: ['admin', 'super_admin']
  },
  {
    id: 4,
    label: 'کاربران',
    icon: 'bx bxs-user-detail',
    link: '/users',
    per: ['admin', 'super_admin', 'acc']
  },
  {
    id: 4,
    label: 'مشتریان',
    icon: 'bx  bxs-contact',
    link: '/persons',
    per: ['admin', 'acc', 'super_admin']
  },
  {
    id: 7,
    label: 'مطالبات',
    icon: 'bx bx-repost',
    link: '/demand-list',
    per: ['admin', 'acc', 'super_admin']
  },
  {
    id: 7,
    label: 'ریسک',
    icon: 'bx bx-info-circle',
    link: '/risk-demand',
    per: ['admin', 'acc', 'super_admin']
  },
  {
    id: 7,
    label: 'معامله گران روز',
    icon: 'bx bxs-analyse',
    link: '/daily-demand-list',
    per: ['admin', 'acc', 'super_admin']
  },
  {
    id: 22,
    label: 'معاملات',
    icon: 'bx bx-sort',
    link: '/trades',
    per: ['admin', 'acc', 'super_admin']
  },
  {
    id: 12,
    label: 'فیش بانکی',
    icon: 'bx bx-vertical-center',
    link: '/command-child-list',
    per: ['user']
  },
  {
    id: 13,
    label: 'دریافت پرداخت (فیش)',
    icon: 'bx bx-vertical-center',
    link: '/command-list',
    per: ['admin', 'acc', 'super_admin']
  },
  {
    id: 5,
    label: 'گزارش',
    icon: 'bx bxs-report',
    subItems: [
            {
                id: 6,
                label: 'لیست تراکنش ها',
                link: '/transaction',
                parentId: 2,
              per: ['user']
            },
      {
        id: 8,
        label: 'لیست بانک ها',
        link: '/bank-list',
        parentId: 2,
        per: ['admin', 'acc', 'super_admin']
      },
    ]
  },

];

