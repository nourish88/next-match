import React from 'react'

export default function CustomerEditPage({ params }: { params: { id: string } }) {
  return (
    <div>CustomerEditPage id: {params.id}</div>
  )
}
