"use client";
import { useEffect, useState } from "react";

const centerLat = 28.47509000850516;
const centerLng = 77.0313186307907;
const mockStores = [
  { id: 1, name: "Walmart Supercenter - Downtown", lat: centerLat, lng: centerLng },
  { id: 2, name: "Walmart Neighborhood Market - Oakwood", lat: centerLat + 0.005, lng: centerLng + 0.005 },
  { id: 3, name: "Walmart Express - Riverside", lat: centerLat - 0.004, lng: centerLng + 0.003 },
  { id: 4, name: "Walmart Supercenter - Westgate", lat: centerLat + 0.003, lng: centerLng - 0.004 },
  { id: 5, name: "Walmart Distribution Center - North", lat: centerLat - 0.006, lng: centerLng - 0.002 },
  { id: 6, name: "Walmart Neighborhood Market - Eastside", lat: centerLat + 0.007, lng: centerLng + 0.001 },
  { id: 7, name: "Walmart Pickup - Midtown", lat: centerLat - 0.002, lng: centerLng - 0.006 },
  { id: 8, name: "Walmart Supercenter - Southpark", lat: centerLat + 0.004, lng: centerLng + 0.007 },
  { id: 9, name: "Walmart Express - Lakeside", lat: centerLat - 0.005, lng: centerLng + 0.005 },
  { id: 10, name: "Walmart Neighborhood Market - Hillcrest", lat: centerLat + 0.006, lng: centerLng - 0.003 },
  // More stores in between
  { id: 11, name: "Walmart Supercenter - Greenfield", lat: centerLat + 0.01, lng: centerLng + 0.002 },
  { id: 12, name: "Walmart Express - Brookside", lat: centerLat - 0.012, lng: centerLng + 0.008 },
  { id: 13, name: "Walmart Neighborhood Market - Maplewood", lat: centerLat + 0.014, lng: centerLng - 0.009 },
  { id: 14, name: "Walmart Pickup - Sunnyside", lat: centerLat - 0.011, lng: centerLng - 0.012 },
  { id: 15, name: "Walmart Supercenter - Willow Creek", lat: centerLat + 0.017, lng: centerLng + 0.011 },
  { id: 16, name: "Walmart Distribution Center - West", lat: centerLat - 0.016, lng: centerLng + 0.013 },
  { id: 17, name: "Walmart Express - Pinehill", lat: centerLat + 0.019, lng: centerLng - 0.015 },
  { id: 18, name: "Walmart Neighborhood Market - Cedar Grove", lat: centerLat - 0.018, lng: centerLng - 0.017 },
  // More distant stores
  { id: 19, name: "Walmart Supercenter - Grandview", lat: centerLat + 0.02, lng: centerLng + 0.01 },
  { id: 20, name: "Walmart Express - Riverbend", lat: centerLat - 0.025, lng: centerLng + 0.015 },
  { id: 21, name: "Walmart Neighborhood Market - Elmwood", lat: centerLat + 0.03, lng: centerLng - 0.02 },
  { id: 22, name: "Walmart Pickup - Bayside", lat: centerLat - 0.018, lng: centerLng - 0.022 },
  { id: 23, name: "Walmart Supercenter - Highland", lat: centerLat + 0.04, lng: centerLng + 0.025 },
  { id: 24, name: "Walmart Distribution Center - South", lat: centerLat - 0.035, lng: centerLng + 0.03 },
  { id: 25, name: "Walmart Express - Fairview", lat: centerLat + 0.05, lng: centerLng - 0.04 },
  { id: 26, name: "Walmart Neighborhood Market - Oakridge", lat: centerLat - 0.045, lng: centerLng - 0.038 },
];

type StoreMapProps = {
  searching: boolean;
};

export default function StoreMap({ searching }: StoreMapProps) {
  const [LeafletMap, setLeafletMap] = useState<JSX.Element | null>(null);
  const [dashOffset, setDashOffset] = useState(0);

  // Animate dash offset
  useEffect(() => {
    const interval = setInterval(() => {
      setDashOffset((prev) => (prev - 2 + 16) % 16);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const L = await import("leaflet");
      const { MapContainer, TileLayer, Marker, Popup, Polyline } = await import("react-leaflet");
      // @ts-ignore
      const markerIcon2x = (await import("leaflet/dist/images/marker-icon-2x.png")).default;
      // @ts-ignore
      const markerIcon = (await import("leaflet/dist/images/marker-icon.png")).default;
      // @ts-ignore
      const markerShadow = (await import("leaflet/dist/images/marker-shadow.png")).default;
      await import("leaflet/dist/leaflet.css");

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x.src ?? markerIcon2x,
        iconUrl: markerIcon.src ?? markerIcon,
        shadowUrl: markerShadow.src ?? markerShadow,
      });

      const center: [number, number] = [centerLat, centerLng];

      if (isMounted) {
        setLeafletMap(
          <div className="w-full h-[700px] rounded overflow-hidden relative">
            <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {mockStores.map((store) => (
                <Marker key={store.id} position={[store.lat, store.lng]}>
                  <Popup>{store.name}</Popup>
                </Marker>
              ))}
              {searching && mockStores
                .filter((store) => store.name !== "Your Store")
                .map((store) => (
                  <Polyline
                    key={store.id}
                    positions={[
                      [centerLat, centerLng],
                      [store.lat, store.lng],
                    ]}
                    pathOptions={{
                      color: "blue",
                      weight: 3,
                      dashArray: "8 8",
                      dashOffset: `${dashOffset}`,
                      opacity: 0.7,
                    }}
                  />
                ))}
            </MapContainer>
            {searching && (
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-20" style={{ transform: 'translate(-50%, -50%)' }}>
                <span className="ripple block w-24 h-24 rounded-full bg-blue-400 opacity-30 absolute animate-ripple"></span>
                <span className="ripple block w-24 h-24 rounded-full bg-blue-400 opacity-20 absolute animate-ripple delay-300"></span>
                <span className="ripple block w-24 h-24 rounded-full bg-blue-400 opacity-10 absolute animate-ripple delay-600"></span>
              </div>
            )}
          </div>
        );
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [searching, dashOffset]);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Nearby Stores Map</h2>
      {LeafletMap}
    </div>
  );
} 