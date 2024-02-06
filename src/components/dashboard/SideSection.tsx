'use client'
import classes from './SideSection.module.css'

const SideSection = ({
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
        <p>Map</p>
        <h2>Locations</h2>
      </div>
      <div className={classes.body}>{children}</div>
      <div className={classes.footer}>
        <button>Add new</button>
      </div>
    </div>
  )
}

export default SideSection
