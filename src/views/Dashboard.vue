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
            p test
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
export default {
  data () {
    return {
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
          id: 'qwefafd',
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
  components: {
    apartment
  }
}
</script>
