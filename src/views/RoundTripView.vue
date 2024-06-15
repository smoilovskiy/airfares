<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref, onMounted, watch } from 'vue'

let roundTripFares = ref([]) // <---- use const to make the error impossible

const getData = async () => {
  // const instance = axios.create({
  //   baseURL: 'https://www.ryanair.com/api'
  // })
  // const res: any = await instance
  //   .get('/views/locate/3/airports/en/active')
  //   .then((response) => (airports = response.data))
  //   .then(() => console.log('Airports:', airports))

  fetch('')
    .then((res) => res.json())
    .then((response) => {
      roundTripFares.value = response // <---- assign to the ref's value
    })
    .catch((error) => {
      console.log(error)
    })
}

getData()
console.log('roundTripFares', roundTripFares)
</script>

<template>
  <div v-if="!roundTripFares">Loading...</div>
  <!-- <div v-else>{{ airports }}</div> -->

  <div v-else class="container">
    <DataTable :value="roundTripFares">
      <Column field="iataCode" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
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
