<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref, onMounted, watch, toRaw } from 'vue'

let roundTripFares = ref([]) // <---- use const to make the error impossible

onMounted(() => {})

const getData = async () => {
  // const instance = axios.create({
  //   baseURL: 'https://www.ryanair.com/api'
  // })
  // const res: any = await instance
  //   .get('/views/locate/3/airports/en/active')
  //   .then((response) => (airports = response.data))
  //   .then(() => console.log('Airports:', airports))

  fetch(
    'https://www.ryanair.com/api/farfnd/v4/roundTripFares?departureAirportIataCode=POZ&market=en-gb&adultPaxCount=1&outboundDepartureDateFrom=2024-06-01&outboundDepartureDateTo=2024-06-30&inboundDepartureDateFrom=2024-06-01&inboundDepartureDateTo=2024-06-30&outboundDepartureTimeFrom&outboundDepartureTimeTo&inboundDepartureTimeFrom&inboundDepartureTimeTo&durationFrom&durationTo'
  )
    .then((res) => res.json())
    // .then((response) => {
    //   roundTripFares = response // <---- assign to the ref's value
    // })
    // .then((res) => res.json())
    .then((response) => {
      console.log('RESPONSE:', { response })
      roundTripFares.value = response.fares
      console.log('>>>>>', roundTripFares)
    })
    .catch((error) => {
      console.log(error)
    })
}

getData()
console.log('roundTripFares', roundTripFares.value)
//console.log([{ ...roundTripFares.value }])

const formatDate = (value: any) => {
  return value.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<template>
  <button @click="$router.back()" class="btn btn-primary btn-sm">&lt; Back</button>
  <div v-if="roundTripFares.length === 0">Loading...</div>

  <div v-else="roundTripFares.length > 0" class="container">
    <DataTable :value="roundTripFares" sortField="inbound.price.value" :sortOrder="1">
      <Column field="outbound.departureDate" header="Date">
        <template #body="{ data }">{{
          new Date(data.outbound.departureDate).toLocaleString()
        }}</template>
      </Column>
      <Column field="outbound.departureAirport.city.name" header="From"></Column>
      <Column field="outbound.arrivalAirport.city.name" header="To"></Column>
      <!-- <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column> -->
      <Column field="inbound.price.value" header="Price"></Column>
    </DataTable>
  </div>

  <RouterView />
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
