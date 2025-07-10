'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import QRCode from 'react-qr-code'

export default function AdminDashboard() {
  const [tagId, setTagId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user || data.user.email !== 'admin@artifynow.net') {
        router.push('/login')
        return
      }
      setUserEmail(data.user.email)
    }
    getUser()
  }, [])

  const handleGenerateQR = () => {
    const newTagId = uuidv4()
    setTagId(newTagId)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Logged in as: <strong>{userEmail}</strong></p>
      <button
        onClick={handleGenerateQR}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Generate QR
      </button>

      {tagId && (
        <div className="mt-6">
          <p className="mb-2">QR Code for Tag ID:</p>
          <QRCode value={`https://artifynow.net/register/${tagId}`} />
          <p className="mt-2 text-sm text-gray-500">{tagId}</p>
        </div>
      )}
    </div>
  )
}
