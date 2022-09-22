import React, {useRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';
// import GeoJSONLayer from 'esri/layers/GeoJSONLayer';



 const Map = () => {

    const mapElement = useRef(null);

    useEffect(() => {
        let view;
        loadModules(['esri/views/MapView', 'esri/WebMap', 'esri/layers/GeoJSONLayer'], {
            css: true
        }).then(([MapView, WebMap, GeoJSONLayer]) => {
            const webMap = new WebMap({
                basemap: 'topo-vector'
            })

            view = new MapView({
                map: webMap,
                center: [-85, 42],
                zoom: 10,
                container: mapElement.current // Use ref as container
            })

            const geoJsonLayer = new GeoJSONLayer({
                // Using sample data url from documentation
                url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
            });
    
            webMap.add(geoJsonLayer);
    
        })

        // Close the map view
        return () => {
            if(!!view) {
                view.destroy();
                view = null;
            }
        }
    })
  return (
    <div style={{height: 800}} ref={mapElement}></div>
  )
}

export default Map;
