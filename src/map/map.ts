import Dispatcher from '@/stores/Dispatcher'
import { Map, View } from 'ol'
import { fromLonLat } from 'ol/proj'
import { MapIsLoaded } from '@/actions/Actions'
import { defaults as defaultControls } from 'ol/control'
import styles from '@/map/Map.module.css'

let map: Map | undefined

export function createMap(): Map {
    map = new Map({
        view: new View({
            enableRotation: false,
            multiWorld: false,
            constrainResolution: true,
            center: fromLonLat([72.991685,19.076142]),
            zoom: 17,
        }),
        controls: defaultControls({
            zoom: true,
            zoomOptions: {
                className: styles.customZoom,
            },
            attribution: true,
            attributionOptions: {
                className: styles.customAttribution,
                collapsible: false,
            },
        }),
    })
    map.once('postrender', () => {
        Dispatcher.dispatch(new MapIsLoaded())
    })
    return map
}

export function setMap(m: Map) {
    map = m
}
export function getMap(): Map {
    if (!map) throw Error('Map must be initialized before it can be used. Use "createMap" when starting the app')
    return map
}
