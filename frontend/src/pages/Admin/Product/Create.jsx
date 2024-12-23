import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { commerceService } from '../../../utils/serviceHelper.js';

function CreateProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await commerceService('/admin/products/create', {
      method: 'POST',
      body: JSON.stringify({ title, description, slug, category, price, stockQuantity, thumbnail, images }),
    });
    if (response.success) {
      navigate('/admin/products');
    } else {
      console.error('Failed to create product');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        label="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        label="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        label="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-zinc-700">
          Kategori
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-zinc-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
        >
          <option value="">Kategori Seçin</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>
      <Input
        label="Fiyat"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <Input
        label="Stok Miktarı"
        value={stockQuantity}
        onChange={(e) => setStockQuantity(e.target.value)}
        required
      />
      <Input
        label="Vitrin Resmi"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        required
      />
      <Input
        label="Resimler (virgül ile ayırarak)"
        value={images.join(', ')}
        onChange={(e) => setImages(e.target.value.split(',').map(img => img.trim()))}
        required
      />
      <Button type="submit">Oluştur</Button>
    </form>
  );
}

export default CreateProduct;