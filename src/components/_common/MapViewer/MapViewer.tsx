// 'use client'

import { useMemo } from 'react'
import classes from './MapViewer.module.css'
import dynamic from 'next/dynamic'

const MyAwesomeMap = dynamic(() => import('./Map'), { ssr: false })

export default function MapViewer(props: any) {
  //   const Map = useMemo(
  //     () =>
  //       dynamic(() => import('./Map'), {
  //         loading: () => <p>A map is loading</p>,
  //         ssr: false
  //       }),
  //     []
  //   )

  return (
    <div className={classes.container}>
      <MyAwesomeMap {...props} />
    </div>
  )
}
