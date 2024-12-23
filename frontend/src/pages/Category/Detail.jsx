import { Fragment, useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import classNames from '../../utils/classNames.js'
import { formatPrice } from '../../utils/formatHelper.js'
import {
  SORT_OPTIONS,
  SUB_CATEGORIES,
  CATEGORY_FILTERS,
} from '../../constants/siteConstants.js'
import { getBySlug } from '../../services/categoryService.js'
import { searchProducts } from '../../services/productService.js'

const sortOptions = SORT_OPTIONS;
const subCategories = SUB_CATEGORIES;
const filters = CATEGORY_FILTERS;

export default function CategoryDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [category, setCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await getBySlug(slug);
      if (!result) {
        navigate('/404');
      } else {
        setCategory(result);
      }
    };

    fetchCategory();
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (category) {
        const products = await searchProducts('', category._id);
        setFilteredProducts(products);
      }
    };

    fetchProducts();
  }, [category]);

  if (!category) {
    return null;
  }

  return (
    <>
      <Transition show={mobileFiltersOpen}>
        <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-zinc-900">Filters</h2>
                  <button
                    type="button"
                    className="relative -mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-zinc-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <form className="mt-4 border-t border-zinc-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="px-2 py-3 font-medium text-zinc-900">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-t border-zinc-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-zinc-400 hover:text-zinc-500">
                              <span className="font-medium text-zinc-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-zinc-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Kadın Giyim</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-zinc-700 hover:text-zinc-900">
                  Sıralama
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-zinc-400 group-hover:text-zinc-500"
                    aria-hidden="true"
                  />
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
                <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        {({ focus }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-zinc-900' : 'text-zinc-500',
                              focus ? 'bg-zinc-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Transition>
            </Menu>

            <button type="button" className="-m-2 ml-5 p-2 text-zinc-400 hover:text-zinc-500 sm:ml-7">
              <span className="sr-only">View grid</span>
              <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-zinc-400 hover:text-zinc-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="space-y-4 border-b border-zinc-200 pb-6 text-sm font-medium text-zinc-900">
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href}>{category.name}</a>
                  </li>
                ))}
              </ul>

              {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-b border-zinc-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-zinc-400 hover:text-zinc-500">
                          <span className="font-medium text-zinc-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-zinc-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
              {filteredProducts.map((product) => (
                <a key={product._id} href={`/urun/${product.slug}`} className="group text-sm">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-zinc-100 group-hover:opacity-75">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-4 font-medium text-zinc-900">{product.title}</h3>
                  <p className="italic text-zinc-500">{product.stockQuantity > 0 ? 'Stokta var' : 'Stokta yok'}</p>
                  <p className="mt-2 font-medium text-zinc-900">{formatPrice(product.price)}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
