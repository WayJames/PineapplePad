<template lang="pug">
div
  .level
    .level-left
      h3.title.is-3 {{info.name}}
    .level-right
      star-rate(
        :value="info.rating"
        type="star1"
        :star-half="true"
        disabled)
  .columns
    .column.is-half
      figure.image.is-4by3
        img(:src="info.pictureUrl")
    .column
      div.is-pulled-left
        a.button Pad App
      div.is-pulled-right
        p {{info.address.line1}}
        p {{info.address.city}}, {{info.address.state}} {{info.address.zip}}
</template>
<script>
import StarRate from 'vue-cute-rate'
export default {
  props: ['info'],
  data () {
    return {

    }
  },
  components: {
    StarRate
  }
}
</script>
