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
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        /> */}
        {/* <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""
        ></script> */}
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
