<template>
  <div class="mini-address">
    <div>
      <span>省份：</span>
      <mini-picker
        :list-item="provinceList"
        @confirm="provinceConfirm"
        class="mini-address-item"
        :itemHeight="itemHeight"
        :color="color"
      ></mini-picker>
    </div>
    <div>
      <span>城市：</span>
      <mini-picker
        :list-item="cityList"
        @confirm="cityConfirm"
        ref="cityList"
        class="mini-address-item"
        :itemHeight="itemHeight"
         :color="color"
      ></mini-picker>
    </div>
    <div>
      <span>区县：</span>
      <mini-picker
        :list-item="countyList"
        @confirm="countyConfirm"
        ref="countyList"
        class="mini-address-item"
        :itemHeight="itemHeight"
         :color="color"
      ></mini-picker>
    </div>
  </div>
</template>

<script>
import MiniPicker from "../picker/mini-picker.vue";
import area from "./area.js";
export default {
  name: "MiniAddress",
  props: {
    itemHeight: {
      type: Number,
      default: 76
    },
    color:{
      type:String,
      default:'#333'
    }
  },
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
      active: true,
      provinceList: [],
      cityList: [],
      countyList: [],
      provinceName: "",
      cityName: ""
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
        result = result.filter(item => item.code.indexOf(code) === 0);
      }

      return result;
    },
    setValues() {
      this.provinceList = this.getList("province");
    },
    provinceConfirm(index, data) {
      let code = this.provinceList[index].code;
      this.provinceName = data;
      const city = this.getList("city", code.slice(0, 2));
      this.cityList = city;
      this.$refs.cityList.clearData();
      this.$refs.countyList.clearData();
    },
    cityConfirm(index, data) {
      let code = this.cityList[index].code;
      this.cityName = data;
      const county = this.getList("county", code.slice(0, 4));
      this.countyList = county.length > 0 ? county : ["空"];
      this.$refs.countyList.clearData();
    },
    countyConfirm(index, data) {
      let area = {
        province: this.provinceName,
        city: this.cityName,
        county: data
      };
      this.$emit("getValues", area);
    }
  }
};
</script>
<style lang='scss'>
@import "../theme/layout.scss";
.mini-address {
  @include flex;
  & > div {
    height: 60px;
    @include flex(row);
    align-items: center;
    justify-content: center;
    .mini-address-item {
      flex: 1;
     height:40px;
    }
  }
}
</style>
