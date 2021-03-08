<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'DOC ID',
            align: 'start',
            filterable: false,
            value: 'name',
          },
          { text: 'Name', value: 'calories' },
          { text: 'Date', value: 'fat' },
          
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
         
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
          
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
         
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
         
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
           
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
          },
          
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
        
          },
        ],
      }
    },
  }

</script>

