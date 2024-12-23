import React, { useState } from 'react'
import { commerceService, paymentService } from '../../utils/serviceHelper.js'
import Logo from '../../components/common/Logo'
import { useCart } from '../../contexts/CartContext.jsx'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input.jsx'
import { Button } from '../../components/common/Button.jsx'
import LoadingOverlay from '../../components/common/LoadingOverlay.jsx'

const formatCardNumber = (number) => {
  return number.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export default function Checkout () {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    address: '',
    city: '',
    region: '',
    postalCode: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'cardNumber':
        const formattedValue = value.replace(/\D/g, '').slice(0, 16)
        setFormData((prevData) => ({ ...prevData, [name]: formattedValue }))
        break
      case 'expirationDate':
        let formattedExpirationDate = value.replace(/\D/g, '').slice(0, 4)
        if (formattedExpirationDate.length >= 3) {
          formattedExpirationDate = formattedExpirationDate.slice(0, 2) + '/' + formattedExpirationDate.slice(2)
        }
        setFormData((prevData) => ({ ...prevData, [name]: formattedExpirationDate }))
        break
      case 'cvc':
        const formattedCVC = value.replace(/\D/g, '').slice(0, 3)
        setFormData((prevData) => ({ ...prevData, [name]: formattedCVC }))
        break
      default:
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {

      const response = await commerceService('/orders/create', {
        method: 'POST',
        body: JSON.stringify(formData),
      })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (response.success) {

        const paymentResponse = await paymentService('/payments/create', {
          method: 'POST',
          body: JSON.stringify({ orderId: response.data.order._id }),
        })

        if (!paymentResponse.success) {
          navigate(`/odeme/basarisiz`)
        } else {
          clearCart()
          navigate(`/odeme/basarili/${response.data.order._id}`)
        }

      } else {

        setError('Sipariş oluşturulamadı')

      }
    } catch (error) {
      setError('Sipariş oluşturulurken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return <div className="bg-white"><p className="text-red-500">{error}</p></div>
  }

  return (
    <div className="bg-white">
      <LoadingOverlay isLoading={isLoading}/>
      <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true"/>
      <div className="fixed right-0 top-0 hidden h-full w-1/2 bg-purple-900 lg:block" aria-hidden="true"/>

      <header
        className="relative mx-auto max-w-7xl bg-purple-900 py-6 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:bg-transparent lg:px-8 lg:pb-10 lg:pt-16">
        <div className="mx-auto flex max-w-2xl px-4 lg:w-full lg:max-w-lg lg:px-0">
          <Logo className="ml-[-10px]  h-8 w-auto lg:hidden" fill={'#ffffff'}/>
          <Logo className="ml-[-10px]  hidden h-8 w-auto lg:block" fill={'#0e7490'}/>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8">
        <h1 className="sr-only">Checkout</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-purple-900 pb-12 pt-6 text-purple-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
        >
          <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
              Sipariş Özeti
            </h2>

            <dl>
              <dt className="text-sm font-medium">Ödenecek Tutar</dt>
              <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
                {cart.reduce((total, product) => total + (product.price - product.discountAmount) * product.quantity, 0) / 100} TRY
              </dd>
            </dl>

            <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
              {cart.map((product) => (
                <li key={product.id} className="flex items-start space-x-4 py-6">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3 className="text-white">{product.title}</h3>
                    <p>Adet {product.quantity}</p>
                  </div>
                  <p
                    className="flex-none text-base font-medium text-white">{(product.price - product.discountAmount) / 100} TRY</p>
                </li>
              ))}
            </ul>

            <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
              <div className="flex items-center justify-between">
                <dt>Ara Toplam</dt>
                <dd>{cart.reduce((total, product) => total + (product.price - product.discountAmount) * product.quantity, 0) / 100} TRY</dd>
              </div>
              <div
                className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                <dt className="text-base">Toplam</dt>
                <dd
                  className="text-base">{(cart.reduce((total, product) => total + (product.price - product.discountAmount) * product.quantity, 0) + 500 + 832) / 100} TRY
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            Ödeme ve Fatura Bilgileri
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">

              <div className="mt-3">
                <h3 id="payment-heading" className="text-lg font-medium text-zinc-900">
                  Ödeme Bilgileri
                </h3>
                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                  <div className="col-span-3 sm:col-span-4">
                    <Input
                      type="text"
                      id="card-number"
                      name="cardNumber"
                      autoComplete="cc-number"
                      value={formatCardNumber(formData.cardNumber)}
                      label="Kart numarası"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <Input
                      type="text"
                      id="expiration-date"
                      name="expirationDate"
                      autoComplete="cc-exp"
                      value={formData.expirationDate}
                      label="Son kullanma tarihi (AA/YY)"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      id="cvc"
                      name="cvc"
                      autoComplete="csc"
                      value={formData.cvc}
                      label="CVC"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 id="shipping-heading" className="text-lg font-medium text-zinc-900">
                  Fatura Bilgileri
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      value={formData.address}
                      label="Adres"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Input
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    value={formData.city}
                    label="Şehir"
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    id="region"
                    name="region"
                    autoComplete="address-level1"
                    value={formData.region}
                    label="İlçe"
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    id="postal-code"
                    name="postalCode"
                    autoComplete="postal-code"
                    value={formData.postalCode}
                    label="Posta Kodu"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="mt-10 flex justify-end border-t border-zinc-200 pt-6">
                <Button type={'submit'}>Ödeme yap</Button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}