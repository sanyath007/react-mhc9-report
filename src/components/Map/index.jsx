import React from 'react'
import GoogleMap from './GoogleMap';

const Map = () => {
    return (
        <div>
            <GoogleMap
                onSelect={(latLng) => {
                    onSelect(latLng);
                    setTimeout(() => hide(), 1000);
                }}
            />
        </div>
    )
}

export default Map