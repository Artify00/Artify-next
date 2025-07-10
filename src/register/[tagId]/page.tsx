'use client'

export default function Register({ params }: { params: { tagId: string } }) {
  return (
    <div>
      <h1>Register page for tag ID: {params.tagId}</h1>
    </div>
  )
}
