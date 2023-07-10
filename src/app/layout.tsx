import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tong',
  description: 'Tong Web App',
  icons: {
    icon: {
      url: "/ZD.png",
      type: "image/png",
    },
    shortcut: { url: "/ZD.png", type: "image/png" },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className + ' main'}>
        {children}
      </body>
    </html>
  )
}
