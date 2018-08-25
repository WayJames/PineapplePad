<template lang="pug">
  div.container
    section.hero
      .hero-body
        .container
          h1.title Your Portal
          h2.subtitle {{apartments.length}} Apartments Found
    .columns
      .column.is-6
        .tile.is-parent.is-vertical
          .tile.is-child.box
            //- GmapMap(
            //-   :center="markers[0]"
            //-   :zoom="7"
            //-   map-type-id="terrain"
            //-   style="width: 100%; height: 300px"
            //- )
              //- GmapMarker(
              //-   :key="index"
              //-   v-for="(m, index) in markers"
              //-   :position="m.position"
              //-   :clickable="true"
              //-   :draggable="true"
              //-   @click="center=m.position"
              //- )
          .tile.is-child.box
            p test
      .column
        .tile.is-parent.is-vertical
          apartment(
            v-for="apartment in apartments"
            :info = "apartment"
            :key = "apartment.id"
          ).tile.is-child.box

</template>
<script>
import apartment from '@/components/Apartment.vue'
import {gmapApi} from 'vue2-google-maps'

export default {
  data () {
    return {
      markers: [ ],
      apartments: [
        {
          id: 'fsauhdfias',
          name: 'University Heights',
          address: {
            line1: '2401 Taylor Ave',
            city: 'Bellingham',
            state: 'WA',
            zip: '95003'
          },
          pictureUrl: 'https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4105-6/2201-wilson-apartments-building.jpg',
          rating: 3.5,
          bestMatch: true
        },
        {
          id: 'jcfvhfkbukh',
          name: 'Rowan Grove',
          address: {
            line1: '2831 20th St',
            city: 'Bellingham',
            state: 'WA',
            zip: '95003'
          },
          pictureUrl: 'https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4105-6/2201-wilson-apartments-building.jpg',
          rating: 5,
          bestMatch: false
        }
      ]
    }
  },
  computed: {
    google: gmapApi
  },
  methods: {
    async geocode (address) {
      let geocoder = new this.google.maps.Geocoder()
      geocoder.geocode({address: `${address.line1} ${address.zip}`}, (results, status) => {
        if (status === 'OK') {
          return results
        } else {
          throw status
        }
      })
    }
  },
  // TODO: Remove testing code
  created () {
    for (var i = 0; i < this.apartments.length; i++) {
      let address = this.apartments[i].address
      this.geocode(address).then((res) => {
        this.markers.push(res)
        console.log(res)
      })
    }
  },
  watch: {
    apartments: function (apartments) {
      for (var i = 0; i < apartments.length; i++) {
        let address = apartments[i].address
        this.geocode(address).then((res) => {
          this.markers.push(res)
          console.log(res)
        })
      }
    }
  },
  components: {
    apartment
  }
}
</script>
