import { NavbarSegmented } from '@/components/dashboard/NavbarSegmented'
import { SideNav } from '@/components/dashboard/SideNav'
import { getServerSession } from 'next-auth'

import classes from './layout.module.css'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }
  return (
    <section className="h-full flex flex-row">
      <SideNav user={session?.user} />
      {children}
    </section>
  )
}
