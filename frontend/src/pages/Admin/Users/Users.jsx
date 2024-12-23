import React, { useEffect, useState } from 'react';
import { commerceService } from '../../../utils/serviceHelper.js';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await commerceService('/admin/users');
        if (response.success) {
          setUsers(response.data.users);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-zinc-900">Kullanıcılar</h1>
          <p className="mt-2 text-sm text-zinc-700">
            OK Commerce kullanıcılarınızı yönetin
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-900 sm:pl-0">
                    İsim
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    E-posta
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Roller
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Oluşturulma Tarihi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 sm:pl-0">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{user.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{user.roles.join(', ')}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{new Date(user.createdAt).toLocaleDateString()}</td>
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