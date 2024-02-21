import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

export default function MyMap({ children }: { children?: React.ReactNode }) {
  return (
    <MapContainer
      bounds={[
        [-100, -100],
        [100, 100]
      ]}
      maxBounds={[
        [-100, -100],
        [100, 100]
      ]}
      //   center={position}
      //   zoom={zoom}
      center={[51.505, -0.09]}
      zoom={10}
      maxZoom={15}
      minZoom={5}
      //   scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      {/* <ImageOverlay url={''} bounds={new LatLngBounds} ></ImageOverlay> */}
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {children}
    </MapContainer>
  )
}
