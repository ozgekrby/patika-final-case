import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { commerceService } from '../../utils/serviceHelper.js';
import Alert from '../../components/common/Alert.jsx';
import { formatPrice } from '../../utils/formatHelper.js';

export default function TrendProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await commerceService('/products/search?q=');
        if (response.success) {
          setProducts(response.data.products ?? []);
        } else {
          setError('Ürünler yüklenemedi');
        }
      } catch (error) {
        setError('Ürünler yüklenirken bir hata oluştu');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Trend Ürünler</h2>
          <Link to={'/kategori/kadin'} className="hidden text-sm font-semibold text-purple-600 hover:text-purple-500 sm:block">
            Tüm Trend Ürünleri Gör
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        {error && <Alert type="error" message={error} />}

        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative">
              <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-900">
                <Link to={`/urun/${product.slug}`}>
                  <span className="absolute inset-0" />
                  {product.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-zinc-500">{formatPrice(product.displayDiscountedPrice)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link to={'/kategori/kadin'} className="block text-sm font-semibold text-purple-600 hover:text-purple-500">
            Tüm Trend Ürünleri Gör
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}