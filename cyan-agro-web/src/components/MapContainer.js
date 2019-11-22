import React from 'react';
import vector from '../static/leaf.svg';

import {GoogleMap, Marker, withScriptjs, withGoogleMap} from "react-google-maps";
const Map = ({ lat, lng, items }) => {

    return(
        <GoogleMap
            zoom={10}
            center={{lat, lng}}
        >
            {items.map(item => (
                <Marker
                    key={item.id}
                    position={{
                        lat: item.point.coordinates[1],
                        lng: item.point.coordinates[0]
                    }}
                    icon={{
                        url: vector,
                        scaledSize: new window.google.maps.Size(42, 42)
                    }}
                />
            ))}

        </GoogleMap>

    )
};

export default withScriptjs(withGoogleMap(Map));
