import { getSingleTwitter } from '@/lib/twitterApi'
import React from 'react'

const SingleTwitterPage = async ({params}) => {
  const { slug } = await params
  const singleData = await getSingleTwitter(slug)
  return (
    <div>
      <h1>Twitter Detail</h1>
      <p>This is the detail page for a specific 
      Twitter post.</p>

      <article>
        <h2>{singleData.title}</h2>
        <p>{singleData.body}</p>
      </article>
    </div>
  )
}

export default SingleTwitterPage