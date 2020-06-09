<template>
  <div class="selectdistrict">
    <div>
      <select v-model="provinceId">
        <option disabled value="">请选择</option>
        <option v-for="(province,name) in map" :value="name" :key="name">{{province.provinceName}}</option>
      </select>
      <select v-model="cityId">
        <option disabled value="">请选择</option>
        <option v-for="(city,name) in cityMap" :value="name" :key="name">{{city.cityName}}</option>
      </select>
      <select v-model="districtId">
        <option disabled value="">请选择</option>
        <option v-for="(district,name) in districtMap" :value="name" :key="name">{{district.districtName}}</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectDistrict',
  data () {
    return {
      map: {},
      provinceId: '',
      cityId: '',
      districtId: ''
    }
  },
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    cityMap () {
      return this.provinceId === '' || typeof this.map[this.provinceId] == "undefined" ? {} : this.map[this.provinceId].cityDTOMap// eslint-disable-line
    },
    districtMap () {
      return this.cityId === '' || typeof this.map[this.provinceId] == "undefined" || typeof this.map[this.provinceId].cityDTOMap[this.cityId] == "undefined" ? {} : this.map[this.provinceId].cityDTOMap[this.cityId].districtDTOMap// eslint-disable-line
    }
  },
  watch: {
    districtId: function (newvalue, oldvalue) {
      this.$emit('input', {
        provinceId: this.provinceId,
        cityId: this.cityId,
        districtId: this.districtId
      })
    },
    provinceId: function (newvalue, oldvalue) {
      if (newvalue !== oldvalue && oldvalue !== '') {
        this.cityId = ''
      }
    },
    cityId: function (newvalue, oldvalue) {
      if (newvalue !== oldvalue && oldvalue !== '') {
        this.districtId = ''
      }
    },
    value: function (newvalue, oldvalue) {
      if (Object.keys(oldvalue).length === 0 && Object.keys(newvalue).length > 0) {
        this.provinceId = this.value.provinceId
        this.cityId = this.value.cityId
        this.districtId = this.value.districtId
      }
    }
  },
  created () {
    this.$axios.get('/district').then((res) => {
      const data = res.data
      if (data.code === 0) {
        this.map = data.data
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  select
    background-color: #fff
    text-align: center
    option
      background-color: #fff
      text-align: center
</style>
