<template>
  <main class="main">
    <img class="img" src="https://cdn.getyourguide.com/niwziy2l9cvz/4WPfYLxDxeACwuO2qc2mM0/3ff5c2c4a752f316ba07b1db903d8f71/Gdansk-1112x630_7_.jpg" alt="gd">
    <!-- NAV -->
    <app-nav></app-nav>
    <!-- TI%LE -->
    <h1>{{this.city}}</h1>
    <!-- TABS -->
    <div class="tabs">
      <ul class="tabs__ul">
        <li 
          class="tabs__li" 
          v-for="(val, key) in this.allDays" :key="key"
          @click="chengeTab($event.target)"
          :data-role="key"
        >{{val}}</li>
      </ul>
    </div>
    <!-- Section info weather -->
    <section class="info-wether">
      <h2>{{this.currentDate}}</h2>
      <!-- 1 day -->
      <table class="info-wether__table" v-if="this.carrentTab == 0">
        <tr v-for="(val, key) in this.day0" :key="key">
          <td>{{val.dt_txt.slice(-8, -3)}}</td>
          <td>{{val.weather[0].description}}</td>
          <td>
            <img :src="`https://openweathermap.org/img/w/${val.weather[0].icon}.png`" alt="icon...">
          </td>
          <td>{{Math.floor(val.main.temp)}}&#176;</td>
        </tr>
      </table>
       <!-- 2 day -->
      <table class="info-wether__table" v-else-if="this.carrentTab == 1">
        <tr v-for="(val, key) in this.day1" :key="key">
          <td>{{val.dt_txt.slice(-8, -3)}}</td>
          <td>{{val.weather[0].description}}</td>
          <td>
            <img :src="`https://openweathermap.org/img/w/${val.weather[0].icon}.png`" alt="icon...">
          </td>
          <td>{{Math.floor(val.main.temp)}}&#176;</td>
        </tr>
      </table>
      <!-- 3  days-->
      <table class="info-wether__table" v-else-if="this.carrentTab == 2">
        <tr v-for="(val, key) in this.day2" :key="key">
          <td>{{val.dt_txt.slice(-8, -3)}}</td>
          <td>{{val.weather[0].description}}</td>
          <td>
            <img :src="`https://openweathermap.org/img/w/${val.weather[0].icon}.png`" alt="icon...">
          </td>
          <td>{{Math.floor(val.main.temp)}}&#176;</td>
        </tr>
      </table>
      <!-- 4 days -->
      <table class="info-wether__table" v-else-if="this.carrentTab == 3">
        <tr v-for="(val, key) in this.day3" :key="key">
          <td>{{val.dt_txt.slice(-8, -3)}}</td>
          <td>{{val.weather[0].description}}</td>
          <td>
            <img :src="`https://openweathermap.org/img/w/${val.weather[0].icon}.png`" alt="icon...">
          </td>
          <td>{{Math.floor(val.main.temp)}}&#176;</td>
        </tr>
      </table>
      <!-- 5 days -->
      <table class="info-wether__table" v-else-if="this.carrentTab == 4">
        <tr v-for="(val, key) in this.day4" :key="key">
          <td>{{val.dt_txt.slice(-8, -3)}}</td>
          <td>{{val.weather[0].description}}</td>
          <td>
            <img :src="`https://openweathermap.org/img/w/${val.weather[0].icon}.png`" alt="icon...">
          </td>
          <td>{{Math.floor(val.main.temp)}}&#176;</td>
        </tr>
      </table>
    </section>
  </main>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  const appNav = () => import('../Navigation');

export default {
  components: {
    appNav
  },
  data () {
    return {
      data: '',
      apiKey: '4546e7ef6204c8641d57614a1f45af9c',
			latitude: '',
      longitude: '',
      list: [],
      carrentTab: '0',
      currentDate: '',
      city: '',
      // массвы дней
      allDays: [],
      day0: [],
      day1: [],
      day2: [],
      day3: [],
      day4: [],
    }
  },
  computed: {
    date() {
			return moment().locale("ru").format('YYYY-MM-DD');
    }
  },
  methods: {
    getData () {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Zaporizhzhya&appid=${this.apiKey}&units=metric&lang=ru`)
        .then(res => {
          const data =  res.data;
          this.data = data;
          this.list = data.list;
          this.city = data.city.name;
//////////////////////////////////////////////////////////////
          const mySet = new Set();
          let arr = [];
          // Выбираем все уникальные дни
          this.list.map((val) => {
            mySet.add(val.dt_txt.slice(0, 10));
          });
          arr = [...mySet];
          arr.length = 5;
          this.allDays = arr;
          // console.log(this.data);
  /** 
  *  Каждый день добавляем в отдедный массив.
  *  временый полу-кастыль.Надо динамически подтягивать дни.
  */
          for(let i of this.list) {
            if(i.dt_txt.includes(arr[0])) {
              this.day0.push(i);
            } else if (i.dt_txt.includes(arr[1])) {
              this.day1.push(i);
            } else if (i.dt_txt.includes(arr[2])) {
              this.day2.push(i);
            }else if (i.dt_txt.includes(arr[3])) {
              this.day3.push(i);
            } else if (i.dt_txt.includes(arr[4])) {
              this.day4.push(i);
            }
          }
////////////////////////////////////////////////////////////
        })
        .catch(e => {
          // this.errors.push(e)
        })
    },
    chengeTab(e) {
      console.log(e);
      e.style.border = '1px solid red';
      this.currentDate = e.innerText;
      this.carrentTab = e.dataset.role;
    }
  },
  created () {
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
  @import './fivedays';
</style>
