import { INavData } from '@coreui/angular';

export const adminNavItems: INavData[] = [
  {
    name: 'Ventas',
    url: '/admin/ventas',
    icon: 'fas fa-dollar-sign'
  },
  {
    name: 'Compras',
    url: '/admin/compras',
    icon: 'fas fa-credit-card'
  },
  {
    name: 'Productos',
    url: '/admin/productos',
    icon: 'fas fa-shopping-cart'
  },
  {
    name: 'Gastos',
    url: '/admin/gastos',
    icon: 'fas fa-credit-card'
  },
  {
    name: 'Informes',
    url: '/admin/informes',
    icon: 'fas fa-chart-pie',
  }
];
