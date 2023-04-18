import './globals.css'

export const metadata = {
  title: 'URL Shortener',
  description: 'URL Shortener',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center p-5 md:p-12 lg:p-24 max-w-6xl mx-auto">
        {children}
      </body>
    </html>
  )
}
