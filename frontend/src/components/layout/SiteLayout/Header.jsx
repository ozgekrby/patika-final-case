import {
  Dialog, DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels,
  Transition,
  TransitionChild
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/16/solid/index.js'
import classNames from '../../../utils/classNames'
import { XMarkIcon } from '@heroicons/react/24/outline/index.js'
import { Fragment, useState } from 'react'
import Logo from '../../common/Logo'
import { CURRENCIES, SITE_NAVIGATION } from '../../../constants/siteConstants.js'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useCart } from '../../../contexts/CartContext';
import AccountDropdown from './AccountDropdown.jsx'
import SearchBox from './SearchBox.jsx'

const currencies = CURRENCIES
const navigation= SITE_NAVIGATION

export default function Header() {
  const { cart } = useCart();
  const { user, hasAuth, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const [searchBoxOpen, setSearchBoxOpen] = useState(false)

  return (
    <>
      <Transition show={open}>
        <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-zinc-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <TabGroup className="mt-2">
                  <div className="border-b border-zinc-200">
                    <TabList className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-purple-600 text-purple-600' : 'border-transparent text-zinc-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </TabList>
                  </div>
                  <TabPanels as={Fragment}>
                    {navigation.categories.map((category, categoryIdx) => (
                      <TabPanel key={category.name} className="space-y-12 px-4 pb-6 pt-10">
                        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                            <div>
                              <p id={`mobile-featured-heading-${categoryIdx}`} className="font-medium text-zinc-900">
                                Öne Çıkanlar
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                                className="mt-6 space-y-6"
                              >
                                {category.featured.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a href={item.href} className="text-zinc-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p id="mobile-categories-heading" className="font-medium text-zinc-900">
                                Kategoriler
                              </p>
                              <ul role="list" aria-labelledby="mobile-categories-heading" className="mt-6 space-y-6">
                                {category.categories.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a href={item.href} className="text-zinc-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                            <div>
                              <p id="mobile-collection-heading" className="font-medium text-zinc-900">
                                Kolleksiyonlar
                              </p>
                              <ul role="list" aria-labelledby="mobile-collection-heading" className="mt-6 space-y-6">
                                {category.collection.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a href={item.href} className="text-zinc-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <p id="mobile-brand-heading" className="font-medium text-zinc-900">
                                Markalar
                              </p>
                              <ul role="list" aria-labelledby="mobile-brand-heading" className="mt-6 space-y-6">
                                {category.brands.map((item) => (
                                  <li key={item.name} className="flex">
                                    <a href={item.href} className="text-zinc-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    ))}
                  </TabPanels>
                </TabGroup>

                <div className="space-y-6 border-t border-zinc-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-zinc-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-zinc-200 px-4 py-6">
                  <div className="flow-root">
                    <Link to={'/register'} className={"-m-2 block p-2 font-medium text-zinc-900"}>
                      Bir hesap oluşturun
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link to={'/login'} className={"-m-2 block p-2 font-medium text-zinc-900"}>
                      Giriş yapın
                    </Link>
                  </div>
                </div>

                <div className="space-y-6 border-t border-zinc-200 px-4 py-6">
                  <form>
                    <div className="inline-block">
                      <label htmlFor="mobile-currency" className="sr-only">
                        Currency
                      </label>
                      <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                        <select
                          id="mobile-currency"
                          name="currency"
                          className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-zinc-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-zinc-800"
                        >
                          {currencies.map((currency) => (
                            <option key={currency}>{currency}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <header className="relative">
        <nav aria-label="Top">

          <div className="bg-purple-800">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

              <form className="hidden lg:block lg:flex-1">
                <div className="flex">
                  <label htmlFor="desktop-currency" className="sr-only">
                    Döviz kuru
                  </label>
                  <div
                    className="group relative -ml-2 rounded-md border-transparent bg-purple-800 focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="desktop-currency"
                      name="currency"
                      className="flex items-center rounded-md border-transparent bg-purple-800 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-zinc-100"
                    >
                      {currencies.map((currency) => (
                        <option key={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>

              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                100 TL üzeri siparişlerde ücretsiz teslimattan yararlanın
              </p>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link to={'/register'} className={'text-sm font-medium text-white hover:text-zinc-100'}>
                  Bir hesap oluşturun
                </Link>
                {!hasAuth && (
                  <>
                    <span className="h-6 w-px bg-purple-500" aria-hidden="true"/>
                    <Link to={'/login'} className={'text-sm font-medium text-white hover:text-zinc-100'}>
                      Giriş yapın
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-zinc-200">
                <div className="flex h-16 items-center justify-between">

                  <div className="hidden lg:flex lg:items-center">
                    <Link to={'/'}>
                      <span className="sr-only">OK Commerce</span>
                      <Logo className="ml-[-10px] h-8 w-auto" fill={'#0e7490'}/>
                    </Link>
                  </div>
                  <div className="hidden h-full lg:flex">

                    <PopoverGroup className="ml-8">
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.categories.map((category, categoryIdx) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <PopoverButton
                                    className={classNames(
                                      open
                                        ? 'border-purple-600 text-purple-600'
                                        : 'border-transparent text-zinc-700 hover:text-zinc-800',
                                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                    )}
                                  >
                                    {category.name}
                                  </PopoverButton>
                                </div>

                                <Transition
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <PopoverPanel className="absolute inset-x-0 top-full z-10 text-zinc-500 sm:text-sm">

                                    <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"/>

                                    <div className="relative bg-white">
                                      <div className="mx-auto max-w-7xl px-8">
                                        <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                            <div>
                                              <p
                                                id={`desktop-featured-heading-${categoryIdx}`}
                                                className="font-medium text-zinc-900"
                                              >
                                                Öne Çıkanlar
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.featured.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-zinc-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                            <div>
                                              <p id="desktop-categories-heading" className="font-medium text-zinc-900">
                                                Katagoriler
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-categories-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.categories.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-zinc-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                            <div>
                                              <p id="desktop-collection-heading" className="font-medium text-zinc-900">
                                                Kolleksiyonlar
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-collection-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.collection.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-zinc-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>

                                            <div>
                                              <p id="desktop-brand-heading" className="font-medium text-zinc-900">
                                                Markalar
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby="desktop-brand-heading"
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {category.brands.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-zinc-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </PopoverPanel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-zinc-700 hover:text-zinc-800"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </PopoverGroup>
                  </div>

                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-zinc-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>

                    <a href="#" className="ml-2 p-2 text-zinc-400 hover:text-zinc-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true"/>
                    </a>
                  </div>

                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Ok Commerce</span>
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <Link to={'#'} className="-m-2 p-2 text-zinc-400 hover:text-zinc-500"
                                onClick={() => setSearchBoxOpen(true)}
                          >
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true"/>
                          </Link>
                        </div>
                        {hasAuth && (
                          <>
                            <div className="flex">
                              <AccountDropdown />
                            </div>
                          </>
                        )}
                      </div>

                      <span className="mx-4 h-6 w-px bg-purple-200 lg:mx-6" aria-hidden="true"/>

                      <div className="flow-root">
                        <Link to={'/sepet'} className="group -m-2 flex items-center p-2">
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-zinc-400 group-hover:text-zinc-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-zinc-700 group-hover:text-zinc-800">{cart.length}</span>
                          <span className="sr-only">Sepetteki ürünler, sepeti görüntüle</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <SearchBox open={searchBoxOpen} setOpen={setSearchBoxOpen}/>
    </>
  )
}
