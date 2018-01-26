<template>
	<main class="main">
		<img :src=this.imgSrc alt="bg" class="main__bg">
		<section class="content">
			<h1>Погода в вашем городе</h1>
			<table class="table">
				<thead>
					<!-- ДАТА и Город -->
					<tr>
						<td>{{date}}</td>
						<td><h2>{{this.country}} {{this.data.name}}</h2></td>
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
						<td>{{this.main.temp}}</td>
						<td>макс: {{this.main.temp_max}}<br>мин: {{this.main.temp_min}}</td>
						<!-- <td></td> -->
					</tr>
					<!-- Скорость ветра -->
					<tr>
						<td>Скорость ветра: {{this.windSpeed}} м/с</td>
					</tr>
				</tbody>
			</table>
		</section>
		
	</main>
	
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'MainPage',
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
			imgSrc: ''
    }
	},
	computed: {
		date () {
			return moment().locale("ru").format('ddd: DD-MMM YYYY');
		}
	},
  methods: {
		// Дынные с https://openweathermap.org/
    getData () {
			 navigator.geolocation.getCurrentPosition((pos) => {
				 this.latitude = pos.coords.latitude;
				 this.longitude = Math.floor(pos.coords.longitude);
				//  
					axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=metric&lang=ru`)
					
					.then((res) => {
						const resD = res.data;
						this.data = resD;
						this.icon = resD.weather[0].icon;
						this.description = resD.weather[0].description;
						this.dateNow =  resD.dt;
						this.main = resD.main;
						this.country = resD.sys.country;
						this.windSpeed = resD.wind.speed
						console.log(this.icon);
						// Смена фона при изменении погоды
						this.bgChange(this.icon);
					})
					.catch((error) => {
						console.log(error);
					});
			 });
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
				default:
						console.log("default");
							// this.imgSrc = 'https://www.cray.com/blog/wp-content/uploads/2015/09/Weather-Blog-Image.jpg';
						break;
			}
		}
	},
  created () {
		this.getData();
		this.bgChange();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	@import './main-page';
</style>
