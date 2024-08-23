import React from 'react'
import Link from 'next/link'

export const Sidebar = () => {
  return (
    <div className="flex flex-col align-sub w-64 bg-gray-800 text-white">
      <Link href="/">Home</Link>
      <Link href="/create">Create</Link>
      <Link href="/myProfile">My Profile</Link>
      <Link href="/messenger">Messenger</Link>
      <Link href="/search">Search</Link>
      <Link href="/statistics">Statistics</Link>
      <Link href="/favorites">Favorites</Link>
    </div>
  )
}
