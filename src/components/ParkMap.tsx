"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue in webpack/Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ParkPin {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
}

interface ParkMapProps {
  parks: ParkPin[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
}

export default function ParkMap({ parks, center = [39.8, -98.5], zoom = 4, height = "400px", className = "" }: ParkMapProps) {
  return (
    <div className={`rounded-xl overflow-hidden border border-gray-200 shadow-sm ${className}`} style={{ height }}>
      <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "100%" }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parks.map((p) => (
          <Marker key={p.id} position={[p.latitude, p.longitude]} icon={greenIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold text-charcoal">{p.name}</p>
                {p.city && <p className="text-gray-500 text-xs">{p.city}</p>}
                <Link href={`/parks/${p.id}`} className="text-forest text-xs font-semibold hover:underline mt-1 inline-block">View Details &rarr;</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
