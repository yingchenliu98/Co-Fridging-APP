<template>
    <div class="row justify-content-center map-div">
        <div class="col-12 map-col">
            <l-map :center="center" :zoom="zoom" class="map" ref="map" @update:zoom="zoomUpdated" @update:center="centerUpdated">
                <l-tile-layer :url="url">
                </l-tile-layer>
                <MapIcon v-for="marker in markers" :key="marker.id" :marker="marker">
                </MapIcon>
            </l-map>
        </div>
    </div>
</template>

<script>
import {
    LMap,
    LTileLayer
} from 'vue2-leaflet';
import MapIcon from './MapIcon'
import 'leaflet/dist/leaflet.css';

export default {
    components: {
        LMap,
        LTileLayer,
        MapIcon
    },
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            center: [42.365417, -71.103965],
            zoom: 15,
            markers: [{
                    id: 1,
                    
                    coordinates: [42.37549302094566, -71.11719117880114]
                },
                {
                    id: 2,
                    
                    coordinates: [42.36249289982931, -71.09193585749776]
                },
                {
                    id: 3,
                    
                    coordinates: [42.3635983600157, -71.09248599624361]
                },
                {
                    id: 4,
                    
                    coordinates: [42.36552971141377, -71.11572217837725]
                },
                {
                    id: 5,
                  
                    coordinates: [42.36745966007717, -71.11493054593114]
                },
                {
                    id: 6,
                   
                    coordinates: [42.3546600520048, -71.10945935241219]
                },
                   {
                    id: 6,
                 
                    coordinates: [42.35746600520048, -71.10945935241219]
                },

            ]
        }
    },
    methods: {
        zoomUpdated(zoom) {
            this.zoom = zoom;
        },
        centerUpdated(center) {
            this.center = center;
        }
    }
}
</script>

<style scoped>
.map-div{
    width: 100vw;
    height: 58vh;
}
.map {
    justify-content: center;
    height: 100%;
}
</style>
