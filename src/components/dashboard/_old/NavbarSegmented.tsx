'use client'
import { useState } from 'react'
import { SegmentedControl, Text } from '@mantine/core'
import {
  IconShoppingCart,
  IconLicense,
  IconMessage2,
  IconBellRinging,
  IconMessages,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconUsers,
  IconFileAnalytics,
  IconDatabaseImport,
  IconReceipt2,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal,
  IconMap,
  IconArticle,
  IconTimeline
} from '@tabler/icons-react'
import classes from './NavbarSegmented.module.css'
import { UserButton } from '@/components/dashboard/_old/UserButton'

const tabs = [
  // FEATURES
  { link: '', label: 'Maps', icon: IconMap },
  { link: '', label: 'Timelines', icon: IconTimeline },
  { link: '', label: 'Articles', icon: IconArticle }
  // Secrets

  // GENERAL
  // Structure (overall displayed site structure?)
  // Appearance (appearance of site)
  // Assets (uploads linked elsewhere)
]

export function NavbarSegmented({ user }: { user: any }) {
  const [active, setActive] = useState('Billing')

  const links = tabs.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <nav className={classes.navbar}>
      <div>
        <Text fw={500} size="sm" className={classes.title} c="dimmed" mb="xs">
          company logo here
        </Text>
      </div>

      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <UserButton user={user} />

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
