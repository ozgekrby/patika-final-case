import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commerceService } from "../../../utils/serviceHelper";
import { useAuth } from "../../../contexts/AuthContext";
import Alert from "../../../components/common/Alert";

const ProfileDetail = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await commerceService("/account/profile");
        setUser(response.data.user);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          password: "",
          passwordConfirm: "",
        });
        if (response.status === 200) {
          navigate('/login');
        }
      } catch (error) {
        setError(error.message || "Profil bilgileri alınırken bir hata oluştu");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter uzunluğunda olmalıdır");
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError("Şifreler uyuşmuyor");
      return;
    }
    setError("");
    try {
      const response = await commerceService("/account/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      setError(error.message || "Güncelleme sırasında bir hata oluştu");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-zinc-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-zinc-900">
            Profil bilgileriniz
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-600">
            Posta alabileceğiniz kalıcı bir adres kullanın.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {error && <Alert type="error" message={error} />}
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                İsminiz
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                E-Posta Adresiniz
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                Şifre
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium leading-6 text-zinc-900"
              >
                Şifre Tekrar
              </label>
              <div className="mt-2">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 mb-5">
        <button
          type="submit"
          className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          Güncelle
        </button>
      </div>
    </form>
  );
};

export default ProfileDetail;
