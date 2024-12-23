import React, { useState, useEffect } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import classNames from '../../utils/classNames.js'
import { PRODUCT_REVIEWS, PRODUCT_POLICIES } from '../../constants/siteConstants.js'
import { commerceService } from '../../utils/serviceHelper.js'
import Alert from '../../components/common/Alert.jsx'
import { useParams } from 'react-router-dom'
import { formatPrice } from '../../utils/formatHelper.js'
import { useCart } from '../../contexts/CartContext';

const policies = PRODUCT_POLICIES
const reviews = PRODUCT_REVIEWS

export default function ProductDetail () {
  const { addToCart } = useCart();
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await commerceService(`/products/${slug}`)
        if (response.success && response.data.product) {
          setProduct(response.data.product)
          setSelectedColor(response.data.product.colors[0])
          setSelectedSize(response.data.product.sizes[2])
        } else {
          setError('Ürün bulunamadı')
        }
      } catch (error) {
        setError('Ürün yüklenirken bir hata oluştu')
      }
    }

    fetchProduct()
  }, [slug])

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await commerceService('/products/search?q=')
        if (response.success) {
          let products = response.data.products ?? []
          while (products.length < 4) {
            products = [...products, ...products.slice(0, 4 - products.length)]
          }
          setRelatedProducts(products)
        } else {
          setError('İlgili ürünler yüklenemedi')
        }
      } catch (error) {
        setError('İlgili ürünler yüklenirken bir hata oluştu')
      }
    }

    fetchRelatedProducts()
  }, [])

  if (!product) {
    return <Alert type="error" message={error}/>
  }

  return (
    <div className="bg-white">
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-zinc-900">{product.title}</h1>
              <p className="text-xl font-medium text-zinc-900">{formatPrice(product.displayPrice)}</p>
            </div>

            <div className="mt-4">
            <h2 className="sr-only">Yorumlar</h2>
              <div className="flex items-center">
                <p className="text-sm text-zinc-700">
                  {reviews.average}
                  <span className="sr-only"> out of 5 stars</span>
                </p>
                <div className="ml-1 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-yellow-400' : 'text-zinc-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div aria-hidden="true" className="ml-4 text-sm text-zinc-300">
                  ·
                </div>
                <div className="ml-4 flex">
                  <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                    Tüm {reviews.totalCount} yorumları gör
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
            <h2 className="sr-only">Görseller</h2>

            <div className="grid grid-cols-1 lg:gap-8">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="rounded-lg lg:col-span-2 lg:row-span-2"
              />
            </div>
          </div>

          <div className="mt-8 lg:col-span-5">
            <form>

              <div>
                <h2 className="text-sm font-medium text-zinc-900">Renk</h2>

                <fieldset aria-label="Bir renk seçin" className="mt-2">
                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                    {[
                      { name: 'Siyah', bgColor: 'bg-zinc-900', selectedColor: 'ring-zinc-900' },
                      { name: 'Gri', bgColor: 'bg-zinc-400', selectedColor: 'ring-zinc-400' },
                      { name: 'Kırmızı', bgColor: 'bg-red-600', selectedColor: 'ring-red-600' },
                    ].map((color) => (
                      <Radio
                        key={color.name}
                        value={color.name}
                        aria-label={color.name}
                        className={({ focus, checked }) =>
                          classNames(
                            color.bgColor,
                            focus && checked ? 'ring ring-offset-1' : '',
                            !focus && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                          )
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.selectedColor,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-zinc-900">Beden</h2>
                  <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                    Beden tablosunu gör
                  </a>
                </div>

                <fieldset aria-label="Bir beden seçin" className="mt-2">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-3 gap-3 sm:grid-cols-6"
                  >
                    {[
                      { name: 'XXS', inStock: true },
                      { name: 'XS', inStock: true },
                      { name: 'S', inStock: true },
                      { name: 'M', inStock: true },
                      { name: 'L', inStock: true },
                      { name: 'XL', inStock: false },
                    ].map((size) => (
                      <Radio
                        key={size.name}
                        value={size.name}
                        className={({ focus, checked }) =>
                          classNames(
                            'cursor-pointer focus:outline-none',
                            focus ? 'ring-2 ring-purple-500 ring-offset-2' : '',
                            checked
                              ? 'border-transparent bg-purple-600 text-white hover:bg-purple-700'
                              : 'border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50',
                            'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                          )
                        }
                      >
                        {size.name}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product.id, 1)}
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Sepete ekle
              </button>
            </form>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-zinc-900">Açıklama</h2>

              <div
                className="prose prose-sm mt-4 text-zinc-500"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <div className="mt-8 border-t border-zinc-200 pt-8">
              <h2 className="text-sm font-medium text-zinc-900">Kumaş &amp; Bakım</h2>

              <div className="prose prose-sm mt-4 text-zinc-500">
                <ul role="list">
                  <li>Sadece en iyi malzemeler</li>
                  <li>Etik ve yerel üretim</li>
                  <li>Önceden yıkanmış ve çekmez</li>
                  <li>Benzer renklerle soğuk makinede yıkayın</li>
                </ul>
              </div>
            </div>

            <section aria-labelledby="policies-heading" className="mt-10">
            <h2 id="policies-heading" className="sr-only">
                Politikalarımız
              </h2>

              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {policies.map((policy) => (
                  <div key={policy.name} className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center">
                    <dt>
                      <policy.icon className="mx-auto h-6 w-6 flex-shrink-0 text-zinc-400" aria-hidden="true"/>
                      <span className="mt-4 text-sm font-medium text-zinc-900">{policy.name}</span>
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-500">{policy.description}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

        <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
          <h2 id="reviews-heading" className="text-lg font-medium text-zinc-900">
            Son yorumlar
          </h2>

          <div className="mt-6 space-y-10 divide-y divide-zinc-200 border-b border-t border-zinc-200 pb-10">
            {reviews.featured.map((review) => (
              <div key={review.id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <div
                  className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                  <div className="flex items-center xl:col-span-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            review.rating > rating ? 'text-yellow-400' : 'text-zinc-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="ml-3 text-sm text-zinc-700">
                      {review.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                  </div>

                  <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                    <h3 className="text-sm font-medium text-zinc-900">{review.title}</h3>

                    <div
                      className="mt-3 space-y-6 text-sm text-zinc-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>

                <div
                  className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                  <p className="font-medium text-zinc-900">{review.author}</p>
                  <time
                    dateTime={review.datetime}
                    className="ml-4 border-l border-zinc-200 pl-4 text-zinc-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                  >
                    {review.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
          <h2 id="related-heading" className="text-lg font-medium text-zinc-900">
            Müşteriler ayrıca satın aldı
          </h2>

          {error && <Alert type="error" message={error}/>}

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct, index) => (
              <div key={relatedProduct.id + index} className="group relative">
                <div
                  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={relatedProduct.thumbnail}
                    alt={relatedProduct.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-zinc-700">
                      <a href={`/urun/${relatedProduct.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0"/>
                        {relatedProduct.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">{relatedProduct.color}</p>
                  </div>
                  <p className="text-sm font-medium text-zinc-900">{formatPrice(relatedProduct.displayPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}