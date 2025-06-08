import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'BibleReader - Scripture Study App',
  description: 'A modern Bible reading application with an intuitive interface for studying scripture.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer style={{ textAlign: 'center', marginTop: '20px', padding: '10px', fontSize: '0.8em', color: '#555' }}>
          Developed by Igor Kan | 
          <a href="https://igorkan.com" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>igorkan.com</a> | 
          <a href="https://github.com/igor-kan" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>GitHub</a> | 
          <a href="https://x.com/1gor_kan" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>X (@1gor_kan)</a>
        </footer>
      </body>
    </html>
  )
}
