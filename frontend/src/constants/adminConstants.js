import {
  DocumentDuplicateIcon,
  TagIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline/index.js'

export const ADMIN_NAVIGATION = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon, current: true },
  { name: 'Kategoriler', href: '/admin/categories', icon: TagIcon, current: false },
  { name: 'Ürünler', href: '/admin/products', icon: ShoppingBagIcon, current: false },
  { name: 'Siparişler', href: '/admin/orders', icon: FolderIcon, current: false },
  { name: 'Ödemeler', href: '/admin/payments', icon: CreditCardIcon, current: false },
  { name: 'Faturalar', href: '/admin/invoices', icon: DocumentDuplicateIcon, current: false },
  { name: 'Müşteriler', href: '/admin/users', icon: UsersIcon, current: false },
]

export const ADMIN_USER_NAVIGATION = [
  { name: 'Çıkış Yap', href: '/admin/logout' },
]