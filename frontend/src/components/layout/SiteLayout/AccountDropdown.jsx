import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import classNames from '../../../utils/classNames.js'
import { UserIcon } from '@heroicons/react/16/solid/index.js'
import { useAuth } from '../../../contexts/AuthContext.jsx'

export default function AccountDropdown() {
  const { logout } = useAuth()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center text-zinc-400 hover:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-100">
          <span className="sr-only">Hesabım</span>
          <UserIcon className="h-6 w-6" aria-hidden="true"/>
        </MenuButton>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ focus }) => (
                <a
                  href="/hesabim"
                  className={classNames(
                    focus ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Hesabım
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <a
                  href="/hesabim/profilim"
                  className={classNames(
                    focus ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profilim
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <a
                  href="/hesabim/siparislerim"
                  className={classNames(
                    focus ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Siparişlerim
                </a>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={() => logout('user')}
                  className={classNames(
                    focus ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-700',
                    'block w-full text-left px-4 py-2 text-sm'
                  )}
                >
                  Çıkış yap
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  )
}
