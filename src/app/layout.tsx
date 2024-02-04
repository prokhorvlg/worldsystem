import '@/styles/globals.css'
import '@mantine/core/styles.css'

import { getServerSession } from 'next-auth'
import SessionProvider from './SessionProvider'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

export const metadata = {
  title: 'Worldsystem',
  description:
    'A web app for storing and sharing worldbuilding content, built using NextJS.'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en" className="h-full">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="h-full">
        <SessionProvider session={session}>
          <MantineProvider defaultColorScheme="dark">
            {children}
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
