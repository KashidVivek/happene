import React, {useEffect} from 'react';
import logo from './logo.svg';
import { Map, Marker, Popup, TileLayer, MapControl, withLeaflet, useLeaflet } from "react-leaflet";
import { Icon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import './App.css';
import './leaflet-search.css'

// const Search = (props) => {
//     const { map } = useLeaflet() // access to leaflet map
//     const { provider } = props
//
//     useEffect(() => {
//         const searchControl = new GeoSearchControl({
//             provider: new OpenStreetMapProvider(),
//             // style: 'bar',
//         })
//
//         map.addControl(searchControl) // this is how you add a control in vanilla leaflet
//         return () => map.removeControl(searchControl)
//     }, [props])
//
//     return null
// }

class SearchMap extends MapControl {
    createLeafletElement() {
      return GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        showMarker: true,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        searchLabel: 'search'
      });
    }
}

// function App(){
//   return (
//     <Map center={[40.61, -74.03]} zoom={12}>
//       <Search />
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//
//     </Map>
//   );
// }
class App extends React.Component {
  render(){
  const SearchBar = withLeaflet(SearchMap);
  return (
    <Map center={[40.61, -74.03]} zoom={12}>
      <SearchBar />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

    </Map>
  );
  }
}

export default App;
