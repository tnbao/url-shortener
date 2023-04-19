import axios from 'axios'
import { NextApiRequest, NextPage } from 'next'

const lambdaUrl = process.env.NEXT_PUBLIC_AWS_LAMBDA_SHORTENER!

export async function getServerSideProps(request: NextApiRequest) {
  const hash = request.query.hash as string
  const { data } = await axios.get(`${lambdaUrl}?shortUrl=${hash}`)
  if (data) {
    return {
      redirect: {
        destination: data,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const HashPage: NextPage = () => {
  return (
    <div>
      <h1>Requested link not found</h1>
    </div>
  )
}

export default HashPage
