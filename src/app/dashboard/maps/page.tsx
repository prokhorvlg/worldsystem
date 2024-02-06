'use client'

import SideSection from '@/components/dashboard/SideSection'
import { useMaps } from '@/services/maps/useMaps'

// list of maps here

export default async function MapsPage({ params }: { params: { id: string } }) {
  const { maps, error, isLoading } = useMaps()

  if (isLoading) return <>loading</>

  if (error) return <>error</>
  return (
    <>
      <SideSection>list</SideSection>
      <div className="body">{maps[0].name}</div>
    </>
  )
}
