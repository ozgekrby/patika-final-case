import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input.jsx'
import { Button } from '../../../components/common/Button.jsx'
import { commerceService } from '../../../utils/serviceHelper.js'

function CreateCategory() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await commerceService('/admin/categories/create', {
      method: 'POST',
      body: JSON.stringify({ title, description, slug }),
    });
    if (response.success) {
      navigate('/admin/categories');
    } else {

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
      <Button type="submit">Oluştur</Button>
    </form>
  );
}

export default CreateCategory;