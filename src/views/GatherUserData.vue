<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <form @submit.prevent="submit()" class="columns is-multiline">
          <div class="column is-two-thirds">
            <label class="label ">Neighborhood</label>
            <b-input type="text" v-model="attributes.neighborhood" placeholder="Enter city, neighborhood, or area." required />
          </div>
          <div class="column is-one-third">
            <label class="label ">State</label>
            <b-select v-model="attributes.state" placeholder="State" icon="globe" icon-pack="fas">
              <option value="NC">NC</option>
            </b-select>
          </div>
          <div class="column is-one-third">
            <label class="label ">Max Rent</label>
            <b-input type="number" v-model="attributes.max_rent" required />
          </div>
          <div class="column is-one-third">
            <label class="label ">Bedrooms</label>
            <b-input type="number" v-model="attributes.bedrooms" required />
          </div>
          <div class="column is-one-third">
            <label class="label ">Move in date</label>
            <b-datepicker :date-formatter="formatDate" v-model="move_in_date_object" placeholder="Select a date..." icon="calendar-today">
            </b-datepicker>
          </div>
          <div class="column is-12">
            <label class="label">Any roommates or special requests?</label>
            <b-input type="textarea" rows="1" v-model="attributes.special_requests" />
          </div>
          <div class="column is-12">
            <label class="label ">How did you hear about us?</label>
            <b-input type="textarea" rows="1" v-model="attributes.source" />
          </div>
          <div class="column is-12">
            <label class="label">What options were you considering for this move?</label>
            <label class="label is-italic has-text-weight-light">Check all that apply.</label>
            <b-checkbox v-model="attributes.apartments" size="is-medium">Apartments</b-checkbox>
            <b-checkbox v-model="attributes.rent_house" size="is-medium">Rent a house or condo</b-checkbox>
            <b-checkbox v-model="attributes.buy_house" size="is-medium">Buy a house or condo</b-checkbox>
          </div>
          <button v-bind:class="{ 'is-loading': loading }" class="button is-medium is-fullwidth is-primary">Submit</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import {DateTime} from 'luxon'

export default {
  data () {
    return {
      attributes: {
        apartments: false,
        rent_house: false,
        buy_house: false,
        bedrooms: 3,
        max_rent: 1000,
        neighborhood: '',
        source: '',
        special_requests: '',
        state: ''
      },
      loading: false,
      move_in_date_object: new Date()
    }
  },
  methods: {
    formatDate (date) {
      return DateTime.fromJSDate(date).toLocaleString()
    },
    submit () {
      let luxonObj = DateTime.fromJSDate(this.move_in_date_object)
      this.attributes.move_in_date = luxonObj.toISODate()
      this.$store.dispatch('submitApartmentAttributes', this.attributes).then(resp => {
        console.log(resp)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
