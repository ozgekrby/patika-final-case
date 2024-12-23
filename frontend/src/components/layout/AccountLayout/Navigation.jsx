import classNames from '../../../utils/classNames.js'

const navigation = [
  { name: 'Dashboard', href: '/hesabim', current: true },
  { name: 'Profil', href: '/hesabim/profilim', current: false },
  { name: 'Siparişler', href: '/hesabim/siparislerim', current: false },
]

export default function Navigation() {
  return (
    <nav className="flex flex-1 flex-col" aria-label="Sidebar">
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={classNames(
                item.current ? 'bg-zinc-50 text-purple-600' : 'text-zinc-700 hover:text-purple-600 hover:bg-zinc-50',
                'group flex gap-x-3 rounded-md p-2 pl-3 text-sm leading-6 font-semibold'
              )}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}