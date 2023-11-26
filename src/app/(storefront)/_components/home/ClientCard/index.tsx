'use client'

import { getSession, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export const ClientCard = () => {
  const sessionFromHook = useSession()

  useEffect(() => {
    getSession().then((session) => {
      console.log('client side session', session)
    })
  }, [])

  return (
    <pre className="bg-gray-900 p-4 text-white">
      {JSON.stringify({ sessionFromHook }, null, 2)}
    </pre>
  )
}
