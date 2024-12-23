import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { MagnifyingGlassIcon, FolderIcon, CubeIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import classNames from '../../../utils/classNames.js'
import { searchProducts } from '../../../services/productService.js'
import { Link } from 'react-router-dom'

export default function SearchBox({ open, setOpen }) {
  const [query, setQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await searchProducts(query)
      setFilteredProducts(products ?? [])
    }

    fetchProducts()
  }, [query])

  return (
    <Transition show={open} afterLeave={() => setQuery('')} appear>
      <Dialog className="relative z-10" onClose={setOpen}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <Combobox onChange={(item) => {
                if (item && item.slug) {
                  window.location = `/urun/${item.slug}`
                }
              }}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 text-opacity-40"
                    aria-hidden="true"
                  />
                  <ComboboxInput
                    autoFocus
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 sm:text-sm"
                    placeholder="Ürün Arama..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === '' || (filteredProducts && filteredProducts.length > 0)) && (
                  <ComboboxOptions
                    static
                    as="ul"
                    className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                  >
                    <li className="p-2">
                      {query === '' && (
                        <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-900">Arama sonuçları</h2>
                      )}
                      <ul className="text-sm text-gray-700">
                        {filteredProducts && filteredProducts.map((product) => (
                          <ComboboxOption
                            as="li"
                            key={product.id}
                            value={product}
                            className={({ focus }) =>
                              classNames(
                                'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                focus && 'bg-gray-900 bg-opacity-5 text-gray-900'
                              )
                            }
                          >
                            {({ focus }) => (
                              <Link to={`/urun/${product.slug}`} className="flex items-center w-full">
                                <CubeIcon
                                  className={classNames(
                                    'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                    focus && 'text-opacity-100'
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="ml-3 flex-auto truncate">{product.title}</span>
                                {focus && <span className="ml-3 flex-none text-gray-500">Jump to...</span>}
                              </Link>
                            )}
                          </ComboboxOption>
                        ))}
                      </ul>
                    </li>
                  </ComboboxOptions>
                )}

                {query !== '' && filteredProducts && filteredProducts.length === 0 && (
                  <div className="px-6 py-14 text-center sm:px-14">
                    <FolderIcon className="mx-auto h-6 w-6 text-gray-900 text-opacity-40" aria-hidden="true" />
                    <p className="mt-4 text-sm text-gray-900">
                      Bu terime ait herhangi bir ürün bulamadık. Lütfen tekrar deneyin.
                    </p>
                  </div>
                )}
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}