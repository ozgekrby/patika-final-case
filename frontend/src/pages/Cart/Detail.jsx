import React, { useState, useEffect } from 'react'
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext';

export default function CartDetail() {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (error) {
    return <div className="bg-white"><p className="text-red-500">{error}</p></div>
  }

  return (
    <div className="bg-white">
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl pt-16">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Alışveriş Sepetim</h1>

            <form className="mt-12">
              <section aria-labelledby="cart-heading">
                <h2 id="cart-heading" className="sr-only">
                  Alışveriş sepetinizdeki ürünler
                </h2>

                <ul role="list" className="divide-y divide-zinc-200 border-b border-t border-zinc-200">
                  {cart.map((product, productIdx) => (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                        />
                      </div>

                      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div>
                          <div className="flex justify-between sm:grid sm:grid-cols-2">
                            <div className="pr-6">
                              <h3 className="text-sm">
                                <a href={`/product/${product.slug}`} className="font-medium text-zinc-700 hover:text-zinc-800">
                                  {product.title}
                                </a>
                              </h3>
                              <p className="mt-1 text-sm text-zinc-500">Adet: {product.quantity}</p>
                            </div>

                            <p className="text-right text-sm font-medium text-zinc-900">{(product.price - product.discountAmount) / 100} TRY</p>
                          </div>

                          <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                            <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                              Quantity, {product.title}
                            </label>
                            <select
                              id={`quantity-${productIdx}`}
                              name={`quantity-${productIdx}`}
                              className="block max-w-full rounded-md border border-zinc-300 py-1.5 text-left text-base font-medium leading-5 text-zinc-700 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                              value={product.quantity}
                              onChange={(e) => updateCartQuantity(product.id, product.quantity, parseInt(e.target.value))}
                            >
                              {[...Array(product.stockQuantity).keys()].map((i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                              ))}
                            </select>

                            <button
                              type="button"
                              className="ml-4 text-sm font-medium text-purple-600 hover:text-purple-500 sm:ml-0 sm:mt-3"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <span>Sepetten sil</span>
                            </button>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-zinc-700">
                          {product.stockQuantity > 0 ? (
                            <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                          ) : (
                            <ClockIcon className="h-5 w-5 flex-shrink-0 text-zinc-300" aria-hidden="true" />
                          )}

                          <span>{product.stockQuantity > 0 ? 'Stokta' : 'Stokta yok'}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="summary-heading" className="mt-10 sm:ml-32 sm:pl-6">
                <div className="rounded-lg bg-zinc-50 px-4 py-6 sm:p-6 lg:p-8">
                  <h2 id="summary-heading" className="sr-only">
                    Order summary
                  </h2>

                  <div className="flow-root">
                    <dl className="-my-4 divide-y divide-zinc-200 text-sm">
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-zinc-600">Ara Toplam</dt>
                        <dd className="font-medium text-zinc-900">{cart.reduce((total, product) => total + (product.price - product.discountAmount) * product.quantity, 0) / 100} TRY</dd>
                      </div>
                      <div className="flex items-center justify-between py-4">
                        <dt className="text-base font-medium text-zinc-900">Sipariş toplamı</dt>
                        <dd className="text-base font-medium text-zinc-900">{(cart.reduce((total, product) => total + (product.price - product.discountAmount) * product.quantity, 0)) / 100} TRY</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full rounded-md border border-transparent bg-purple-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-50"
                  >
                    Alışverişi Tamamla
                  </button>
                </div>

                <div className="mt-6 text-center text-sm text-zinc-500">
                  <p>
                    veya{' '}
                    <a href="/" className="font-medium text-purple-600 hover:text-purple-500">
                      Alışverişe devam et
                      <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </p>
                </div>
              </section>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}