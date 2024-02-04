'use client'

import { useState } from 'react'
import {
  UnstyledButton,
  Tooltip,
  Title,
  rem,
  ActionIcon,
  Avatar,
  Popover,
  Text
} from '@mantine/core'
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconMap,
  IconLogout
} from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
// import { MantineLogo } from '@mantinex/mantine-logo';

const mainLinksMockdata = [
  { icon: IconHome2, label: 'Home', link: '/dashboard' },
  { icon: IconMap, label: 'Maps', link: '/dashboard/maps' }
]

const linksMockdata = ['Map 1']

export function SideNav({ user }: { user: any }) {
  const router = useRouter()

  const [active, setActive] = useState('Releases')
  const [activeLink, setActiveLink] = useState('Settings')

  const [opened, { close, open }] = useDisclosure(false)

  return (
    <nav className="flex flex-col items-center w-[60px] border-r border-white">
      <p>logo</p>

      <div className="flex-1 flex flex-col">
        {mainLinksMockdata.map((link) => (
          <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionProps={{ duration: 0 }}
            key={link.label}
          >
            <ActionIcon
              size={42}
              variant="default"
              aria-label="Log out"
              onClick={() => {
                setActive(link.label)
                router.push(link.link)
              }}
              data-active={link.label === active || undefined}
            >
              <link.icon
                style={{ width: rem(22), height: rem(22) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        ))}
      </div>

      <Popover
        width={200}
        position="right"
        withArrow
        shadow="md"
        opened={opened}
      >
        <Popover.Target>
          <ActionIcon
            size={42}
            variant="subtle"
            aria-label="Open Settings"
            onMouseEnter={open}
            onMouseLeave={close}
          >
            <Avatar src={user.image} alt="Profile image" />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown style={{ pointerEvents: 'none' }}>
          <div className="flex flex-row">
            <Avatar src={user.image} alt="Profile image" />
            <div className="flex flex-col">
              <Text size="sm" fw={500}>
                Harriette Spoonlicker
              </Text>

              <Text c="dimmed" size="xs">
                hspoonlicker@outlook.com
              </Text>
            </div>
          </div>
        </Popover.Dropdown>
      </Popover>

      <Tooltip
        label="Log Out"
        position="right"
        withArrow
        transitionProps={{ duration: 0 }}
      >
        <ActionIcon size={42} variant="default" aria-label="Log out">
          <IconLogout style={{ width: rem(24), height: rem(24) }} />
        </ActionIcon>
      </Tooltip>
    </nav>
  )
}
