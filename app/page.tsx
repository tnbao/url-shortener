'use client'

import axios from 'axios'
import { useState } from 'react'

const lambdaUrl = process.env.NEXT_PUBLIC_AWS_LAMBDA_SHORTENER!
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
}

export default function Home() {
  const [link, setLink] = useState('')
  const [shortLink, setShortLink] = useState('')
  const [oldLink, setOldLink] = useState('')
  const [inProgress, setInProgress] = useState(false)

  const isValidUrl = (link: string) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
    return urlPattern.test(link)
  }

  const onShorten = async () => {
    if (!link) return

    setInProgress(true)
    if (!isValidUrl(link)) {
      alert('Not a valid URL')
    }

    const res = await axios.post(lambdaUrl, { link }, axiosConfig)
    if (res) {
      setShortLink(res.data)
      setOldLink(link)
      setLink('')
      setInProgress(false)
    }
  }

  const onCopy = () => {
    navigator.clipboard && navigator.clipboard.writeText(shortLink)
  }

  return (
    <main className="w-full">
      <form
        onSubmit={onShorten}
        className="flex gap-4 w-full flex-col md:flex-row"
      >
        <input
          type="text"
          placeholder="Shorten your link"
          className="rounded-md w-full bg-white text-black px-5 py-4"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <input
          type="submit"
          value="Shorten"
          className="rounded bg-emerald-900 enabled:hover:bg-emerald-700 transition-colors text-white px-16 py-4 text-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={onShorten}
          disabled={inProgress}
        />
      </form>
      {shortLink && (
        <div className="rounded-md mt-5 w-full bg-white px-5 py-4 gap-4 flex flex-col md:flex-row justify-between md:items-center">
          <div className="text-black truncate">{oldLink}</div>
          <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto gap-3 md:gap-5">
            <a href={shortLink} target="_blank" className="text-blue-600">
              {shortLink}
            </a>
            <button
              className="rounded bg-blue-100 text-blue-500 px-5 py-2"
              onClick={onCopy}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
