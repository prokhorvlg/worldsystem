import { TextInput } from '@mantine/core'

export default async function MapPage({ params }: { params: { id: string } }) {
  return (
    <>
      Map Editor!!
      <TextInput type="text" placeholder="here" label="JSON here" />
    </>
  )
}
