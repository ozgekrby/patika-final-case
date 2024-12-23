import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../components/common/Logo';
import { commerceService } from '../../../utils/serviceHelper';
import { Button } from '../../../components/common/Button.jsx'
import Input from '../../../components/common/Input.jsx'
import Alert from '../../../components/common/Alert.jsx'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await commerceService('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.success && response.data.token) {
        Cookies.set('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/admin');
      } else {
        setError(response.error.message);
      }
    } catch (error) {
      console.error('Giriş yapılamadı:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-fuLogll sm:max-w-sm">
          <Logo className="mx-auto h-10 w-auto" fill={"#6b21a8"}/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900">
            Admin hesabınıza giriş yapın
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <Alert
                type="error"
                message={error}
              />
            )}
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="E-Posta"
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Şifre"
            />
            <div>
              <Button variant="primary" type="submit" className="w-full">
                Giriş Yap
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
