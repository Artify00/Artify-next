'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        router.push('/login')
        return
      }
      setUserEmail(data.user.email ?? 'User')
    }
    getUser()
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl border border-gray-200 shadow-sm p-8 rounded-2xl">
        <h1 className="text-3xl font-semibold mb-4 text-gray-900">🎨 Welcome to Artify</h1>
        <h1 className="text-3xl text-blue-500">Tailwind is working!</h1>
        <p className="text-gray-600">You are logged in as:</p>
        <p className="text-lg font-medium text-black mt-1">{userEmail}</p>
      </div>
    </div>
  )
}
