import axios from 'axios'
import { redirect } from 'next/navigation'

const lambdaUrl = process.env.NEXT_PUBLIC_AWS_LAMBDA_SHORTENER!

type Props = {
  params: {
    slug: string
  }
}

async function HashPage({ params: { slug } }: Props) {
  const link = await axios.get(`${lambdaUrl}?shortUrl=${slug}`)
  if (link && link.data) {
    redirect(link.data)
  }

  return (
    <div>
      <h1>Requested link not found</h1>
    </div>
  )
}

export default HashPage
