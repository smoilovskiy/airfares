<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

import DataService from '../service/TempData'

import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

//import { isProxy, toRaw } from 'vue'
import { reactive, toRaw } from 'vue'

const dataService = new DataService()
//let response: any = []

onMounted(async () => {
  // const instance = axios.create({
  //   baseURL: 'https://www.ryanair.com/api'
  // })
  // const res: any = await instance
  //   .get('/views/locate/3/airports/en/active')
  //   .then((response) => (airports = response.data))
  //   .then(() => console.log('Airports:', airports))
  // dataService
  //   .getActiveAirports()
  //   .then((data) => (airports.value = data))
  //   .then(() => console.log('Airports:', airports))
})

let airports = ref([]) // <---- use const to make the error impossible

const getData = async () => {
  // const instance = axios.create({
  //   baseURL: 'https://www.ryanair.com/api'
  // })
  // const res: any = await instance
  //   .get('/views/locate/3/airports/en/active')
  //   .then((response) => (airports = response.data))
  //   .then(() => console.log('Airports:', airports))

  fetch('https://www.ryanair.com/api/views/locate/3/airports/en/active')
    .then((res) => res.json())
    .then((response) => {
      airports.value = response // <---- assign to the ref's value
    })
    .catch((error) => {
      console.log(error)
    })
}

getData()
console.log('airports', airports)
//let airports = ref()

function airportSelectHandler(event: any) {
  console.log('>>>>', event.value)
  console.log({ ...event.value })

  //console.log(JSON.parse(JSON.stringify(event.value)))
}

const text = ref()
//const value = ref(null);

const selectedAirport = ref()

// const allAirports = ref([
//   { name: 'Australia', code: 'AU' },
//   { name: 'Brazil', code: 'BR' },
//   { name: 'China', code: 'CN' },
//   { name: 'Egypt', code: 'EG' },
//   { name: 'France', code: 'FR' },
//   { name: 'Germany', code: 'DE' },
//   { name: 'India', code: 'IN' },
//   { name: 'Japan', code: 'JP' },
//   { name: 'Spain', code: 'ES' },
//   { name: 'United States', code: 'US' }
// ])

const allAirports = airports
</script>

<template>
  <div v-if="!airports">Loading...</div>

  <div v-else class="container">
    <Dropdown
      v-model="selectedAirport"
      :options="airports"
      @change="airportSelectHandler($event)"
      filter
      optionLabel="name"
      placeholder="Select an Airport"
      style="width: 200px"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          <!-- <img
            :alt="slotProps.value.label"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
            style="width: 18px"
          /> -->
          <div>{{ slotProps.value.name }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex align-items-center">
          <!-- <img
            :alt="slotProps.option.label"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
            style="width: 18px"
          /> -->
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Dropdown>
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
