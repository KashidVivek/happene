import React from 'react';
import logo from './logo.svg';
import { Map, Marker, Popup, TileLayer, MapControl, withLeaflet } from "react-leaflet";
import { Icon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import './App.css';

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
        keepResult: false,
        searchLabel: 'search'
      });
    }
}

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
