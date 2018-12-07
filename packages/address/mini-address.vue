<template>
  <div>
    <mini-picker :list-item="provinceList" @change="provinceChange"></mini-picker>
    <mini-picker :list-item="cityList" @change="cityChange" ref="cityList"></mini-picker>
    <mini-picker :list-item="countyList" ref="countyList"></mini-picker>
  </div>
</template>

<script>
import MiniPicker from "../picker/mini-picker.vue";
import area from "./area.js";
export default {
  name: "MiniAddress",
  components: {
    MiniPicker
  },
  computed: {
    province() {
      return area.province_list || {};
    },
    city() {
      return area.city_list || {};
    },
    county() {
      return area.county_list || {};
    }
  },
  data() {
    return {
      active:true,
      provinceList: [],
      cityList: [],
      countyList: []
    };
  },
  mounted() {
    this.setValues();
  },
  methods: {
    getList(type, code) {
      let result = [];
      if (type !== "province" && !code) {
        return result;
      }
      const list = this[type];
      result = Object.keys(list).map(code => ({
        code,
        name: list[code]
      }));

      if (code) {
        result = result.filter(item => item.code.indexOf(code) === 0)
      }

      return result;
    },
    setValues() {
      this.provinceList = this.getList("province");
    },
    provinceChange(data) {
      let code = this.provinceList[data].code;
      const city = this.getList("city", code.slice(0, 2));
      this.cityList = city;
      this.$refs.cityList.clearData();
      this.$refs.countyList.clearData();
    },
    cityChange(data) {
      let code = this.cityList[data].code;
      const county = this.getList("county", code.slice(0, 4));
      this.countyList = county.length>0?county:['空']
      this.$refs.countyList.clearData();
    }
  }
};
</script>
<style lang='scss'>
</style>
