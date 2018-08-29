<template lang="pug">
div
  .level
    .level-left
      h3.title.is-3.level-item {{info.name}}
        b-tooltip(label="This apartment is a best match based on your preferences!" multilined v-if="info.bestMatch")
          b-icon(icon="heart" pack="fas").bullseye-icon
    .level-right
      star-rate(
        :value="info.rating"
        type="star1"
        :star-half="true"
        disabled).level-item
  .columns
    .column.is-half
      figure.image.is-4by3
        img(:src="info.pictureUrl")
    .column
      .level
        .level-left
          a.button.is-danger.level-item Pad App
        .level-right
          .level-item
            p
              |{{info.address.line1}}
              br
              |{{info.address.city}}, {{info.address.state}} {{info.address.zip}}
      .buttons.field
        a.button.is-primary.is-fullwidth
          b-icon(icon="envelope" pack="fas").is-small
          span Send {{info.owner}} a message!
        a.button.is-primary.is-fullwidth
          b-icon(icon="heart" pack="fas").is-small
          span Favorite
        a.button.is-primary.is-fullwidth
          b-icon(icon="file-alt" pack="fas").is-small
          span Details
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
<style>
.bullseye-icon {
  padding-left: 10px;
  color: red;
}

.buttons .button:not(:last-child).is-fullwidth {
  margin-right: 0
}
</style>
