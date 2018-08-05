<template>
  <div>
    <section class="hero ">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Sign up to find
            <i>your</i> perfect pad.
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="box column is-two-thirds is-offset-one-third">
            <form @submit.prevent="submit()" class="columns is-multiline">
              <div class="column is-two-thirds">
                <label class="label ">Neighborhood</label>
                <b-input type="text" v-model="attributes.db.neighborhood" placeholder="Enter city, neighborhood, or area." required />
              </div>
              <div class="column is-one-third">
                <label class="label ">State</label>
                <b-select
                    placeholder="State"
                    icon="globe"
                    icon-pack="fas">
                    <option value="NC">NC</option>
                </b-select>
              </div>
              <div class="column is-one-third">
                <label class="label ">Max Rent</label>
                <b-input type="number" v-model="attributes.db.max_rent" required />
              </div>
              <div class="column is-one-third">
                <label class="label ">Bedrooms</label>
                <b-input type="number" v-model="attributes.db.bedrooms" required />
              </div>
              <div class="column is-one-third">
                <label class="label ">Move in date</label>
                <b-datepicker
                  :date-formatter="formatDate"
                  v-model="attributes.db.move_in_date_object"
                  placeholder="Select a date..."
                  icon="calendar-today">
                </b-datepicker>
              </div>
              <div class="column is-12">
                <label class="label">Any roommates or special requests?</label>
                <b-input type="textarea" rows="1" v-model="attributes.db.special_requests"/>
              </div>
              <div class="column is-12">
                <label class="label ">How did you hear about us?</label>
                <b-input type="textarea" rows="1" v-model="attributes.db.source"/>
              </div>
              <div class="column is-12">
                <label class="label">What options were you considering for this move?</label>
                <label class="label is-italic has-text-weight-light">Check all that apply.</label>
                <b-checkbox v-model="attributes.db.apartments" size="is-medium">Apartments</b-checkbox>
                <b-checkbox v-model="attributes.db.rent_house" size="is-medium">Rent a house or condo</b-checkbox>
                <b-checkbox v-model="attributes.db.buy_house" size="is-medium">Buy a house or condo</b-checkbox>
              </div>
              <div class="column is-4">
                <label class="label ">Username</label>
                <b-input type="username" v-model="username" required />
              </div>
              <div class="column is-4">
                <label class="label ">Password</label>
                <b-input password-reveal type="password" v-model="password" required />
              </div>
              <div class="column is-4">
                <label class="label ">First and Last name</label>
                <b-input type="text" v-model="attributes.cognito.name" required />
              </div>
              <div class="column is-half">
                <label class="label ">Email Address</label>
                <b-input type="email" v-model="attributes.cognito.email" required />
              </div>
              <div class="column is-half">
                <label class="label ">Phone Number</label>
                <b-input type="text" v-model="attributes.cognito.phone_number" required />
              </div>
              <div class="column is-half is-offset-one-quarter">
                <button :loading="loading" class="button is-medium is-fullwidth is-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import {DateTime} from 'luxon'

export default {
  data () {
    return {
      loading: true,
      attributes: {
        cognito: {
          email: '',
          phone_number: '',
          name: ''
        },
        db: {
          apartments: false,
          rent_house: false,
          buy_house: false,
          bedrooms: 3,
          max_rent: 1000,
          move_in_date_object: new Date(),
          neighborhood: '',
          source: '',
          special_requests: '',
          state: ''
        }
      },
      username: '',
      password: ''
    }
  },
  methods: {
    submit () {
      this.loading = true
      if (!this.attributes.cognito.phone_number.startsWith('+1')) {
        this.attributes.cognito.phone_number = `+1${this.attributes.cognito.phone_number}`
      }
      var args = {attributes: this.attributes, username: this.username, password: this.password}
      let ISODate = DateTime.fromJSDate(this.attributes.db.move_in_date_object).toISODate()
      args.attributes.move_in_date = ISODate
      this.$store.dispatch('signUp', args)
        .then((resp) => {
          console.log(resp)
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    formatDate (date) {
      return DateTime.fromJSDate(date).toLocaleString()
    }
  }
}
</script>
