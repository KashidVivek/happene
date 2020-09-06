import React, {useEffect} from 'react';
import logo from './logo.svg';
import { Map, Marker, Popup, TileLayer, MapControl, withLeaflet, useLeaflet } from "react-leaflet";
import { Icon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import * as inputData from "./sample.json"
import './App.css';
import './leaflet-search.css'


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
      description:null,time:null,location:null,url:"null",show:false
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
  render(){
  const SearchBar = withLeaflet(SearchMap);

  return (
    <Map center={[29.614805, -82.378831]} zoom={12}>
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
            this.setActive("cur.description","cur.time","cur.location","cur.url",false);
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

//
// import React from "react";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import { Icon } from "leaflet";
// import * as parkData from "./sample.json";
// import "./App.css";
//
// export const icon = new Icon({
//   iconUrl: "/skateboarding.svg",
//   iconSize: [25, 25]
// });
//
// export default function App() {
//   const [activePark, setActivePark] = React.useState(null);
//
//   return (
//     <Map center={[29.624533, -82.374590]} zoom={12}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//
//       {parkData.features.map(park => (
//         <Marker
//           key={park.description}
//           position={[
//             park.location[0],
//             park.location[1]
//           ]}
//           onClick={() => {
//             setActivePark(park);
//           }}
//           icon={icon}
//         />
//       ))}
//
//       {activePark && (
//         <Popup
//           position={[
//             activePark.location[0],
//             activePark.location[1]
//           ]}
//           onClose={() => {
//             setActivePark(null);
//           }}
//         >
//           <div>
//             <h2>{activePark.description}</h2>
//             <p>{activePark.time}</p>
//           </div>
//         </Popup>
//       )}
//     </Map>
//   );
// }
