// import '@/styles/globals.css'
import '@/styles/defaults.css'
import '@mantine/core/styles.css'

import { getServerSession } from 'next-auth'
import SessionProvider from '../components/_providers/SessionProvider'
import {
  Button,
  ColorSchemeScript,
  MantineColorsTuple,
  MantineProvider,
  createTheme,
  rem
} from '@mantine/core'
import QueryProvider from '@/components/_providers/QueryProvider'
import ThemedMantineProvider from '@/components/_providers/MantineProvider'
import { theme } from '@/app/theme'

export const metadata = {
  title: 'worldarium',
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
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryProvider>
          <SessionProvider session={session}>
            <MantineProvider defaultColorScheme="dark" theme={theme}>
              {children}
            </MantineProvider>
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
