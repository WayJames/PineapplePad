<template>
  <div class="notification is-white columns">
    <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
    <form @submit.prevent="submit()" class="columns is-multiline">
      <div class="column is-12">
        <label class="label ">Neighborhood</label>
        <b-input type="text" v-model="apartmentPrefs.neighborhood" placeholder="Enter city, neighborhood, or area." required />
      </div>
      <div class="column is-6">
        <label class="label">State</label>
        <b-select v-model="apartmentPrefs.state" placeholder="State" icon="globe" icon-pack="fas">
          <option value="NC">NC</option>
        </b-select>
      </div>
      <div class="column is-6">
        <label class="label ">Move in date</label>
        <b-datepicker :date-formatter="formatDate" v-model="move_in_date_object" placeholder="Select a date..." icon="calendar-today">
        </b-datepicker>
      </div>
      <div class="column is-6">
        <label class="label ">Max Rent</label> <!-- TODO: make turn red when not number -->
        <b-input type="number" v-model="apartmentPrefs.max_rent" required />
      </div>
      <div class="column is-6">
        <label class="label ">Bedrooms</label>
        <b-input type="number" v-model="apartmentPrefs.bedrooms" required />
      </div>
      <div class="column is-12">
        <label class="label">Any roommates or special requests?</label>
        <b-input type="textarea" rows="1" v-model="apartmentPrefs.special_requests" />
      </div>
      <div class="column is-12">
        <label class="label ">How did you hear about us?</label>
        <b-input type="textarea" rows="1" v-model="apartmentPrefs.source" />
      </div>
      <div class="column is-12">
        <label class="label">What options were you considering for this move?</label>
        <label class="label is-italic has-text-weight-light">Check all that apply.</label>
        <div class="field">
        <b-checkbox v-model="apartmentPrefs.apartments" size="has-text-black is-medium">Apartments</b-checkbox>
        </div>
        <div class="field">
        <b-checkbox v-model="apartmentPrefs.rent_house" size="has-text-black is-medium">Rent a house or condo</b-checkbox>
        </div>
        <div class="field">
          <b-checkbox v-model="apartmentPrefs.buy_house" size="has-text-black is-medium">Buy a house or condo</b-checkbox>
        </div>
      </div>
      <button v-bind:class="{ 'is-loading': buttonLoading }" class="button is-medium is-fullwidth is-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import {DateTime} from 'luxon'

export default {
  data () {
    return {
      buttonLoading: false,
      loading: false,
      move_in_date_object: new Date(),
      apartmentPrefs: {}
    }
  },
  mounted () {
    this.loading = true
    this.$store.dispatch('getApartmentPrefs').then((resp) => {
      this.loading = false
      let date
      if (this.$store.state.apartmentPrefs.move_in_date) {
        date = DateTime.fromISO(this.$store.state.apartmentPrefs.move_in_date).toJSDate()
      } else {
        date = new Date()
      }
      this.move_in_date_object = date
      this.apartmentPrefs = this.$store.state.apartmentPrefs
    })
  },
  methods: {
    formatDate (date) {
      return DateTime.fromJSDate(date).toLocaleString()
    },
    submit () {
      this.buttonLoading = true
      let luxonObj = DateTime.fromJSDate(this.move_in_date_object)
      this.apartmentPrefs.move_in_date = luxonObj.toISODate()
      this.$store.dispatch('submitApartmentPrefs', this.apartmentPrefs).then(resp => {
        this.buttonLoading = false
        this.$snackbar.open('Apartment data saved!')
      }).catch(err => {
        this.buttonLoading = false
        throw err
      })
    }
  }
}
</script>
