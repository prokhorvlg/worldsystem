'use client'
import { Title, Text } from '@mantine/core'
import classes from './DashboardAside.module.css'

const DashboardAside = ({
  children,
  header,
  footer
}: {
  children?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Text>Map Editor</Text>
        <Title>Kim's New Map</Title>
      </div>
      <div className={classes.body}>{children}</div>
      <div className={classes.footer}></div>
    </div>
  )
}

export default DashboardAside
