import React, {useRef, useEffect} from 'react';
import {loadModules} from 'esri-loader';


 const Map = () => {

    const MapEl = useRef(null);
    // console.log(MapEl); // For debugging purpose

    useEffect(() => {
        let view;
        loadModules(['esri/views/MapView', 'esri/WebMap'], {
            css: true
        }).then(([MapView, WebMap]) => {
            const webmap = new WebMap({
                basemap: 'topo-vector'
            })

            view = new MapView({
                map: webmap,
                zoom: 8,
                container: MapEl.current
            })
            console.log(view);
        })

        return () => {
            if(!!view) {
                view.destroy();
                view = null;
            }
        }
    })
  return (
    <div style={{height: 800}} ref={MapEl}></div>
  )
}

export default Map;
