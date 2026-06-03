import type { Metadata } from 'next'
import { Montserrat, Space_Grotesk } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lyra Solutions | Web Design for El Paso & Ciudad Juárez',
  description:
    'We build websites for local businesses in El Paso and Ciudad Juárez. Fast, custom, and built to bring in more clients.',
  keywords: ['web design El Paso', 'web design Ciudad Juárez', 'websites for local businesses', 'SEO El Paso'],
  openGraph: {
    title: 'Lyra Solutions',
    description: 'Web design for local businesses in El Paso and Ciudad Juárez.',
    url: 'https://lyrasolutions.dev',
    siteName: 'Lyra Solutions',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
