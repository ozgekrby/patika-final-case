import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/common/Input.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { commerceService } from '../../../utils/serviceHelper.js';

function EditCategory() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await commerceService(`/admin/categories/detail/${id}`);
        if (response.success) {
          const category = response.data.category;
          setTitle(category.title);
          setDescription(category.description);
          setSlug(category.slug);
        } else {
          console.error('Failed to fetch category');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await commerceService(`/admin/categories/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description, slug }),
    });
    if (response.success) {
      navigate('/admin/categories');
    } else {
      console.error('Failed to update category');
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
      <Button type="submit">Güncelle</Button>
    </form>
  );
}

export default EditCategory;