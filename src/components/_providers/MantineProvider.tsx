// 'use client'

import {
  MantineColorsTuple,
  MantineProvider,
  Popover,
  PopoverDropdown,
  createTheme,
  rem
} from '@mantine/core'
import { theme } from '@/app/theme'

const ThemedMantineProvider = ({ children }) => {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  )
}

export default ThemedMantineProvider
