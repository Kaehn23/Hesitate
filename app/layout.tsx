'use client'

import React from 'react'


import { usePathname, useRouter } from 'next/navigation'

import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

import { Geist, Geist_Mono } from 'next/font/google'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import './globals.css'
import { Metadata } from 'next'

// your fonts
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })





export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: 'en' | 'fr' }
}) {
  // pick translations
  const t = locale === 'fr' ? fr : en

  // strip the /en or /fr prefix from the current path
  const path = usePathname().replace(/^\/(en|fr)/, '')
  const router = useRouter()
  const toggleLocale = () => {
    const next = locale === 'en' ? 'fr' : 'en'
    router.push(`/${next}${path}`)
  }

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body>
        <ThemeProvider>
          <Navbar />

          {/* your locale toggle */}
          

          {/* inject `t` into pages */}
          {React.cloneElement(children as React.ReactElement, {  })}

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
