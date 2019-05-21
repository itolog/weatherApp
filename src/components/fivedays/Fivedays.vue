<template>
  <main class="main">
    <img
      class="img"
      src="https://cdn.getyourguide.com/niwziy2l9cvz/4WPfYLxDxeACwuO2qc2mM0/3ff5c2c4a752f316ba07b1db903d8f71/Gdansk-1112x630_7_.jpg"
      alt="gd"
    >
    <!-- NAV -->
    <app-nav></app-nav>
    <!-- TI%LE -->

    <div class="errGet" v-if="this.errrorGet">
      {{this.errrorGet}}
      <p>{{this.errCont}}</p>
    </div>
    <!-- Section info weather -->
    <section class="info-wether" v-if="this.allDays.length != 0">
      <h1>{{this.summaryAll}}</h1>
      <table class="info-wether__table" v-for="(val, key) in this.allDays" :key="key">
        <tr>
          <td>{{dateDays(val.time)}}</td>
        </tr>
        <tr>
          <td>{{val.summary}}</td>
        </tr>
        <tr v-bind:class="{'worm': val.temperatureMin >= 0}">
          <td>макс :{{Math.floor(val.temperatureMax)}}&#176;</td>
          <td>мин :{{Math.floor(val.temperatureMin)}}&#176;</td>
        </tr>
      </table>
    </section>
    <div class="lds-facebook" v-else>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import moment from "moment";
import jsonpAdapter from "axios-jsonp";
const appNav = () => import("../Navigation");

export default {
  components: {
    appNav
  },
  data() {
    return {
      apiKey: "099d3dee535be493e82943c9e95dc5dc",
      latitude: "",
      longitude: "",
      summaryAll: "",
      // массвы дней
      allDays: [],
      errrorGet: "",
      errCont: ""
    };
  },
  computed: {
    date() {
      return moment()
        .locale("ru")
        .format("YYYY-MM-DD");
    }
  },
  methods: {
    getGeoDate() {
      let geo = JSON.parse(localStorage.getItem("geo"));
      this.latitude = geo.lat;
      this.longitude = geo.lon;
    },
    async getData() {
      const url = `https://api.darksky.net/forecast/${this.apiKey}/${
        this.latitude
      },${this.longitude}?lang=ru&units=si`;

      let config = {
        adapter: jsonpAdapter
      };

      await axios
        .get(url, config)
        .then(res => {
          const daily = res.data.daily;
          this.allDays = daily.data;
          this.summaryAll = daily.summary;
        })
        .catch(e => {
          this.errrorGet = e.message;
          if (e.request.status) {
            this.errCont =
              "Возможно поменялось API или НаДо уже перейти на платный тариф";
          } else {
            this.errCont = "Чё оно так?Нипанятна";
          }
        });
    },
    dateDays(e) {
      return moment
        .unix(e)
        .locale("ru")
        .format("dddd, DD-MMMM YYYY");
    }
  },
  created() {
    this.getGeoDate();
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
@import "./fivedays";
</style>
