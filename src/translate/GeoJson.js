
export default function readGeoJsonPoints (json) {
  const acc = json.features.reduce((acc, feature) => {
    const geom = feature.geometry
    if (geom.type === 'Point') { acc.push(geom.coordinates) }
    return acc
  }, [])
  return acc
}
