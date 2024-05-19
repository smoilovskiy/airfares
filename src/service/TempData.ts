export default class DataService {
    // getProductsSmall() {
    //     return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }
  
    // getProducts() {
    //     return fetch('/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }
  
    // getProductsMixed() {
    //     return fetch('/demo/data/products-mixed.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }
  
    // getProductsWithOrdersSmall() {
    //     return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }
  
    // getProductsWithOrdersLarge() {
    //     return fetch('/demo/data/products-orders.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }
  
    async getActiveAirports() {
      const res = await fetch('/demo/data/activeAirports.json', {
        headers: { 'Cache-Control': 'no-cache' }
      })
      const d = await res.json()
      return d.data
    }
  }