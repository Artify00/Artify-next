'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterArtwork({ params }: { params: { tagId: string } }) {
  const { tagId } = params
  const router = useRouter()
  const searchParams = useSearchParams()

  const [title, setTitle] = useState('')
  const [dimension, setDimension] = useState('')
  const [image1, setImage1] = useState<File | null>(null)
  const [image2, setImage2] = useState<File | null>(null)
  const [image3, setImage3] = useState<File | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [artistName, setArtistName] = useState<string>('')
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData?.session?.user

      if (!user) {
        // 로그인 페이지로 리다이렉트하면서 현재 페이지 기억
        const redirectTo = encodeURIComponent(`/register/${tagId}`)
        router.push(`/login?redirectTo=${redirectTo}`)
        return
      }

      setUserId(user.id)
      setArtistName(user.user_metadata?.name || user.email || '')

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude)
          setLongitude(pos.coords.longitude)
        },
        (err) => {
          console.warn('Location access denied', err)
        }
      )

      const { data } = await supabase
        .from('artworks')
        .select('id')
        .eq('tag_id', tagId)
        .maybeSingle()

      setIsRegistered(!!data)
      setLoading(false)
    }

    init()
  }, [tagId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image1 || !image2 || !image3) {
      alert('Please upload all 3 images.')
      return
    }

    const files = [image1, image2, image3]
    const uploadedUrls: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const path = `artworks/${tagId}-img${i + 1}.jpg`
      const { error } = await supabase.storage
        .from('artwork-images')
        .upload(path, file, { upsert: true })

      if (error) {
        alert('Image upload failed: ' + error.message)
        return
      }

      const { data: publicUrl } = supabase.storage
        .from('artwork-images')
        .getPublicUrl(path)

      uploadedUrls.push(publicUrl.publicUrl)
    }

    const { error } = await supabase.from('artworks').insert({
      title,
      dimension,
      image_1_url: uploadedUrls[0],
      image_2_url: uploadedUrls[1],
      image_3_url: uploadedUrls[2],
      user_id: userId,
      artist_name: artistName,
      latitude,
      longitude,
      tag_id: tagId,
    })

    if (error) {
      alert('Error saving artwork: ' + error.message)
    } else {
      router.push('/dashboard')
    }
  }

  if (loading) return <p className="p-8">Loading...</p>
  if (isRegistered) return <p className="p-8">⚠️ This tag is already registered.</p>

  return (
    <div className="p-8 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Register Artwork</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dimension (e.g. 60 x 90 cm)"
          className="w-full border p-2"
          value={dimension}
          onChange={(e) => setDimension(e.target.value)}
          required
        />

        <div className="space-y-2">
          <label className="block font-medium">Image 1</label>
          <input type="file" accept="image/*" onChange={(e) => setImage1(e.target.files?.[0] ?? null)} />
          <label className="block font-medium">Image 2</label>
          <input type="file" accept="image/*" onChange={(e) => setImage2(e.target.files?.[0] ?? null)} />
          <label className="block font-medium">Image 3</label>
          <input type="file" accept="image/*" onChange={(e) => setImage3(e.target.files?.[0] ?? null)} />
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2 w-full">
          Submit
        </button>
      </form>
    </div>
  )
}
