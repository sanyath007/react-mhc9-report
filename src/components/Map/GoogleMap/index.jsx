import React, { useEffect, useState } from 'react'
import { Map } from '@vis.gl/react-google-maps'
import PoiMarkers from './PoiMarkers'
import axios from 'axios';

const locations = [
    {key: 'โพธิ์กลาง', location: { lat: 14.906, lng: 102.102  }},
    {key: 'หนองจะบก', location: { lat: 14.916, lng: 102.064 }},
    {key: 'โคกสูง', location: { lat: 15.095, lng: 102.116 }},
    {key: 'มะเริง', location: { lat: 14.980, lng: 102.164 }},
    {key: 'หนองระเวียง', location: { lat: 14.946, lng: 102.199 }},
];

const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY;

const GoogleMap = ({ onSelect }) => {
    const [center, setCenter] = useState({ lat: 14.975, lng: 102.098 });

    useEffect(() => {
        // getLocation();
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position);
                setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
            }, function(err) {
                console.log(err);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const getPlaceDetail = async (placeId) => {
        try {
            const res = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?fields=name&place_id=${placeId}&key=${GMAP_API_KEY}`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Map
            mapId='6353336373326b35'
            style={{width: '100%', height: '640px'}}
            defaultCenter={center}
            defaultZoom={9}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onCameraChanged={(ev) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }
            onClick={(e) => {
                console.log(e);
                // getPlaceDetail(e.detail.placeId);
                onSelect(e.detail.latLng);
            }}
        >
            <PoiMarkers pois={locations} />
        </Map>
    )
}

export default GoogleMap