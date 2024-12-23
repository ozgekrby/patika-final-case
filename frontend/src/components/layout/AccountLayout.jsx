import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './AccountLayout/Navigation'
import useAuth from '../../hooks/useAuth.js'

const AccountLayout = () => {
  useAuth('user')
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Hesabım</h1>
      </div>
      <div className="flex grow flex-row gap-x-5 px-6 mt-5">
        <div className="w-1/4">
          <Navigation />
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default AccountLayout