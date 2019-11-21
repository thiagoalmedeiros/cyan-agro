import React from 'react';

import {GoogleMap, Marker, withScriptjs, withGoogleMap} from "react-google-maps";
const Map = ({ lat, lng, items }) => {

    console.log(' ======= lat, lng')
    console.log(lat, lng)

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
                    // icon={{
                    //     url: '../static/leaf.svg'
                    // }}
                />
            ))}

        </GoogleMap>

    )
};

export default withScriptjs(withGoogleMap(Map));
