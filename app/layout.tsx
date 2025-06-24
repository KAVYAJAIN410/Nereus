import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
export const metadata: Metadata = {
  title: '',
  description: '',
  generator: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">

      <body className='font-Gerante'>
               <Navbar />
        {children
        }</body>
    </html>
  )
}
