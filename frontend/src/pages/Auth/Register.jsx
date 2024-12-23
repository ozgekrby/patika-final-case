import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import Input from '../../components/common/Input';
import Alert from '../../components/common/Alert';
import { commerceService } from '../../utils/serviceHelper.js';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', passwordConfirm: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter uzunluğunda olmalıdır');
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError('Şifreler uyuşmuyor');
      return;
    }
    setError('');
    try {
      const response = await commerceService('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.success) {
        navigate('/login');
      } else {
        setError(response.error.message || 'Kayıt başarısız');
      }
    } catch (error) {
      setError(error.message || 'Kayıt sırasında bir hata oluştu');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
            Bir hesap oluşturun
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && <Alert type="error" message={error} />}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              label="Adınız"
              onChange={handleChange}
            />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              label="E-Posta"
              onChange={handleChange}
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              label="Şifre"
              onChange={handleChange}
            />
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="current-password"
              required
              label="Şifre Tekrar"
              onChange={handleChange}
            />
            <Button type="submit">Kayıt ol</Button>
          </form>
          <p className="mt-10 text-center text-sm text-zinc-500">
            Bir hesabınız var mı?{' '}
            <Link to="/login" className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
              Giriş yapın
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}