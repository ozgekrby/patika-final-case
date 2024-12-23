import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/common/Button.jsx';
import { commerceService } from '../../../utils/serviceHelper.js';
import { Link } from 'react-router-dom'

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await commerceService('/admin/categories');
        if (response.success) {
          setCategories(response.data.categories);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-zinc-900">Kategoriler</h1>
          <p className="mt-2 text-sm text-zinc-700">
            OK Commerce kategorilerinizi yönetin
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button variant="primary" to="/admin/categories/create">
            Yeni Kategori Oluştur
          </Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-900 sm:pl-0">
                    Başlık
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Açıklama
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Slug
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Düzenle</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 sm:pl-0">
                      {category.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{category.description}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{category.slug}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Link to={`/admin/categories/${category._id}/edit`} className="text-purple-600 hover:text-purple-900">
                        Düzenle<span className="sr-only">, {category.title}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}