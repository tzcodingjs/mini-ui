<template>
  <div>
    <mini-picker :listItem="listItem"></mini-picker>
    <mini-address @getValues="getValues"></mini-address>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      listItem:[1,2,3,4,5,6,7,8,9,10]
    }
  },
  methods:{
    getValues(data){
      console.log(data)
    }
  }
}
</script>


<style>
</style>
