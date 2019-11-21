import React, {Component} from 'react';
import Map from './MapContainer';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {fields: [], lat: 0, lng: 0}
    }


    fetchLocations() {
        fetch('http://localhost:8000/fields').then(response => response.json()).then(data => {
            const fields = data.data;
            this.setState({
                fields: fields
            })

        })
    }

    componentDidMount() {
        this.fetchLocations();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
            })
        }

    }
    render() {
        const {fields, lat, lng} = this.state;
        return(
            <div style={{width: '100%', height: '100%'}}>
                <Map items={fields}
                     lat={lat}
                     lng={lng}
                     googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDu1X-qRDG3h5tbKZwC9QgqpNWaE54BXs0`}
                     loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                     containerElement={<div style={{ height: `100%`, width: `100%` }} />}
                     mapElement={<div style={{ height: `100%`, width: `100%` }} />}/>
            </div>)
    }
}
