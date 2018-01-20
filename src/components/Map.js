import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
  render() {
    return (
      <div className="map col-4-md col-0-sm" style={{ height: '510px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDcMeoj6PSTQDXbPjWHTtEIrW1bT6946UQ',
            language: 'en'
          }}
          center={{ lat: +this.props.location.latitude, lng: +this.props.location.longitude }}
          defaultZoom={12}
        />
      </div>
    );
  }
}

export default Map;
