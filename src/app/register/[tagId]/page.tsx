'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage({ params }: { params: { tagId: string } }) {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data?.user) {
        router.push(`/login?callbackUrl=/register/${params.tagId}`)
      }
    }

    checkAuth()
  }, [params.tagId])

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Register artwork for tag: {params.tagId}</h1>
      {/* Registration form will go here */}
    </div>
  )
}
