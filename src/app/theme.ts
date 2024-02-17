'use client'

import { MantineColorsTuple, createTheme, rem } from '@mantine/core'

const mainColor: MantineColorsTuple = [
  '#f5f5f5',
  '#e7e7e7',
  '#cdcdcd',
  '#b2b2b2',
  '#9a9a9a',
  '#8b8b8b',
  '#848484',
  '#717171',
  '#656565',
  '#575757'
]

const highlightColor: MantineColorsTuple = [
  '#ffeaff',
  '#fad1ff',
  '#f1a1fb',
  '#e86df7',
  '#e041f3',
  '#dc26f2',
  '#da16f2',
  '#c107d8',
  '#ac00c1',
  '#9700a9'
]

export const theme = createTheme({
  colors: {
    highlight: highlightColor,
    main: mainColor
  },
  primaryColor: 'highlight',

  fontFamily: 'Kanit, sans-serif',
  headings: {
    fontFamily: 'Kanit, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) }
    }
  }

  //   components: {
  //     Button: Button.extend({
  //       defaultProps: {
  //         variant: 'default'
  //       }
  //     })
  //   }
})
