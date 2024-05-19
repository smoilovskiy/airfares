<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import DataService from './service/TempData.ts'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

const dataService = new DataService()
//let response: any = []

onMounted(async () => {
  // const instance = axios.create({
  //   baseURL: 'https://www.ryanair.com/api'
  // })
  // const res: any = await instance
  //   .get('/views/locate/3/airports/en/active')
  //   .then((data) => (airports.value = data))
  //   .then(() => console.log('Airports:', airports))
  //console.log('RES>>>>>>', res.data)
  //console.log('RES>>>>>>', JSON.stringify(res.data))

  dataService
    .getActiveAirports()
    .then((data) => (airports.value = data))
    .then(() => console.log('Airports:', airports))
})

const airports = ref()

const text = ref()
//const value = ref(null);

const selectedCountry = ref()

const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' }
])
</script>

<template>
  <div class="card flex justify-content-center ml-6">
    <FloatLabel>
      <InputText id="username" v-model="text" />
      <label for="username">Username</label>
    </FloatLabel>

    <Dropdown
      v-model="selectedCountry"
      :options="countries"
      filter
      optionLabel="name"
      placeholder="Select a Country"
      class="w-full md:w-14rem"
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

  <div class="container">
    <DataTable :value="airports">
      <Column field="iataCode" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>

    <!-- <span class="p-float-label">
      <InputText id="txt" v-model="text" />
      <label for="txt">Text</label>
    </span> -->
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
