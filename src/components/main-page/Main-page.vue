<template>
	<main class="main">
		<app-nav></app-nav>
		<img :src=this.imgSrc alt="bg" class="main__bg">
		<section class="content" v-if="!err">
			<h1>Погода в вашем городе</h1>
			<table class="table">
				<thead>
					<!-- ДАТА и Город -->
					<tr>
						<td>{{date}}</td>
						<td><h2>{{this.country}} {{this.city}}</h2></td>
					</tr>
				</thead>
				<tbody>
					<!-- Описание погоды -->
					<tr>
						<td>
							<img :src="`https://openweathermap.org/img/w/${this.icon}.png`" alt="icon">
						</td>
						<td>
							<p>
								{{this.description}}
							</p>
						</td>
					</tr>
					<!-- Температура -->
					<tr>
						<td>Температура</td>
						<td>{{this.temp}} &#176;</td>
						<td>макс: {{this.main.temp_max}} &#176;<br>мин: {{this.main.temp_min}} &#176;</td>
						<!-- <td></td> -->
					</tr>
					<!-- Скорость ветра -->
					<tr>
						<td>Скорость ветра: {{this.windSpeed}} м/с</td>
					</tr>
				</tbody>
			</table>
		</section>
		<!-- Error AXIOS section -->
		<section class="err" v-else>
						{{errorMsg.cod}} {{errorMsg.message}} <br>
						{{errorMsg}}
		</section>
	</main>
	
</template>

<script>
import axios from 'axios';
import moment from 'moment';
const appNav = () => import('../Navigation');

export default {
	name: 'MainPage',
	components: {
		appNav
	},
  data () {
    return {
			data: '',
			apiKey: '4546e7ef6204c8641d57614a1f45af9c',
			latitude: '',
			longitude: '',
			country: '',
			icon: '',
			description: '',
			dateNow: '',
			currentTime: null,
			main: '',
			windSpeed: '',
			imgSrc: '',
			temp: '',
			err: false,
			errorMsg: '',
			city: '',
    }
	},
	computed: {
		date () {
			return moment().locale("ru").format('ddd: DD-MMM YYYY');
		}
	},
  methods: {
		// Дынные с https://openweathermap.org/ Geolocation function
    getData () {
			if ("geolocation" in navigator) {
				 navigator.geolocation.getCurrentPosition(this.reqAxios, this.errGeoloc, {timeout: 60000});
			} else {
				alert("Геолокация не доступна");
			};
		},
		// Axios req Запрос на сервер
		reqAxios(pos) {
			this.latitude = pos.coords.latitude;
			this.longitude = Math.floor(pos.coords.longitude);
				//  
			axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=metric&lang=ru`)
				.then((res) => {
							const resD = res.data;
							this.data = resD;
							this.icon = resD.weather[0].icon;
							this.description = resD.weather[0].description;
							this.dateNow =  resD.dt;
							this.main = resD.main;
							this.temp = Math.floor(resD.main.temp);
							this.country = resD.sys.country;
							this.windSpeed = resD.wind.speed
							this.city = resD.name;
							// console.log(this.icon);
							// Смена фона при изменении погоды
							this.bgChange(this.icon);
				})
				.catch((error) => {
					console.log(error);
					this.err = true;
					this.errorMsg = error.response.data;
				});
		},
		// Error Axios Geolocation fanction
		errGeoloc(err) {
			if (err.code == 1) {
				this.err = true;
				this.errorMsg = "Включите геолокацию";
			} else if (err.code == 2) {
				this.err = true;
				this.errorMsg = "Сеть не работает или нет связи со спутником";
			}	else if (err.code == 3) {
				this.err = true;
				this.errorMsg = "ОЙ! Чёт сервер тупит.Или программист пьяный код писал...Подождите чуток.";
			} else {
				this.err = false;
				this.errorMsg = "";
			}
		},
		//Функция Смены фона при изменении погоды
		bgChange (icon) {
			switch (this.icon) {
				case '01n':
					this.imgSrc = 'http://sympathink.com/wp-content/uploads/night-photography-tips-ideas.jpg';
						break;
				case '01d':
						this.imgSrc = 'https://www.ihdimages.com/wp-content/uploadsktz/2014/11/nature_sunshine_background_wallpaper.jpg';
						break;
				case '13d' || '13n':
						this.imgSrc = 'https://smart-lab.ru/uploads/images/04/69/24/2017/03/28/0099a7339a.jpg';
						break;
				case '50n':
						this.imgSrc = 'http://o-planete.ru/wp-content/uploads/2013/10/%D1%82%D1%83%D0%BC%D0%B0%D0%BD-.jpg';
						break;
				default: 
						this.imgSrc = 'https://abc10up.com/wp-content/uploads/2016/12/WEATHER-755x437.jpg';
						break;
			}
		}
	},
  created () {
		this.getData();
		// this.reqAxios(pos);
		this.bgChange();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	@import './main-page';
</style>
