import DashboardMap from '@/app/dashboard/maps/[mapId]/DashboardMap'

export default async function MapPage({
  params
}: {
  params: { mapId: string }
}) {
  return <DashboardMap mapId={parseInt(params.mapId)} />
}
