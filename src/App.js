import React, {useEffect} from 'react';
import logo from './logo.svg';
import { Map, Marker, Popup, TileLayer, MapControl, withLeaflet, useLeaflet } from "react-leaflet";
import { Icon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import * as inputData from "./sample.json"
import './App.css';
import useSwr from "swr";
import './leaflet-search.css'
import Geocode from "react-geocode";


class SearchMap extends MapControl {
    createLeafletElement() {
      return GeoSearchControl({
        provider: new OpenStreetMapProvider(),
        style: 'bar',
        showMarker: true,
        showPopup: true,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        searchLabel: 'Where do you live?'
      });
    }
}

class App extends React.Component {
  state = {
      description:null,time:null,location:[29.614805, -82.378831],url:"null",show:false
  }
  setActive = (descript,tim,loc,ur,showEvent) =>{
    this.setState({
      description:descript,
        time:tim,
        location:loc,
        url:ur,
        show:showEvent
    })
  }

  changeLocation = (viewPort) =>{
    console.log(viewPort.center)
    Geocode.setApiKey("AIzaSyAJymTbHGi6YwH8H-LDIkjBk7s-hDP5nCM");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.enableDebug();
    Geocode.fromLatLng(viewPort.center[0], viewPort.center[1]).then(
      response => {
        const city = response.results[0].address_components[2].short_name;
        const st = response.results[0].address_components[4].short_name;
        console.log(city);
        console.log(st);
        const url = "http://localhost:8081/scrape+?state=${st}+?city=${city}"

      },
      error => {
        console.error(error);
      }
    );
  }

  render(){
  const SearchBar = withLeaflet(SearchMap);
  console.log(this.state.location)
  return (
    <Map center={[this.state.location[0],this.state.location[1]]} zoom={12} onViewportChanged={this.changeLocation}>
      <SearchBar />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {inputData.features.map(cur => (
        <Marker key = {cur.description}
        position = {[
          cur.location[0],
          cur.location[1]
        ]}
        onClick = { () =>{
          this.setActive(cur.description,cur.time,cur.location,cur.url,true);
        }}
        />
      ))}

      {this.state.show && (
        <Popup
          position={[
            this.state.location[0],
            this.state.location[1]
          ]}
          onClose={() => {
            this.setActive("cur.description","cur.time",[29.614805, -82.378831],"cur.url",false);
          }}
        >
          <div>
            <h2>{this.state.description}</h2>
            <p>{this.state.time}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
  }
}

export default App;
