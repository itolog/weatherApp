<template>
	<main class="main">
		<app-nav></app-nav>
		<img :src='this.imgSrc' alt="bg" class="main__bg">
		<section class="content" v-if="!err">
			<h1>Погода в вашем городе</h1>
			<table class="table">
				<thead>
					<td>{{date}}</td>
				</thead>
				<tbody>
					<!--  и Город -->
					<tr>
						<td v-if="this.pod == 'd'">
								<img title="День" class="pod__img" src="http://icons.iconarchive.com/icons/jaan-jaak/weather/256/cloudy-partly-icon.png" alt="day">
						</td>
						<td v-else>
								<img title="Ночь" class="pod__img" src="http://www.pf-arkhbum.ru/skin/img/icons/weather/night/02n.png" alt="night">
						</td>
						<td><h2>{{this.data.country_code}} {{this.data.city_name}}</h2></td>
					</tr>
					<!-- Описание погоды -->
					<tr>
						<td>
							<img class="icon" :src="`https://www.weatherbit.io/static/img/icons/${this.icon}.png`" alt="icon">
						</td>
						<td>
							<p>
								{{this.description}}
							</p>
						</td>
					</tr>
					<!-- Температура -->
					<tr>
						<th>Температура:</th>
						<td v-bind:style="styleObject">{{Math.floor(this.data.temp)}} &#176;</td>
					</tr>
					<!-- Скорость ветра -->
					<tr>
						<th>Ветер:  </th>
						<td>{{this.data.wind_cdir_full}} <br>{{this.data.wind_spd}} м/с</td>
					</tr>
					<!-- Восход заход солнца -->
					<!-- <tr>
						<td>Рассвет: {{this.data.sunrise}}</td>
						<td>Закат: {{this.data.sunset}}</td>
					</tr> -->
					<!-- Относительная влажность -->
					<tr>
						<td>Относительная влажность: {{this.data.rh}}&#37;</td>
					</tr>
				</tbody>
			</table>
		</section>
		<!-- Error AXIOS section -->
		<section class="err" v-else>
						{{errorMsg.cod}} {{errorMsg.message}} <br>
						{{errorMsg}}
			<div class="geo-err" v-if="geoErr">
				<img src="http://smartphonus.com/wp-content/uploads/2017/08/081417_0836_3.png" alt="geoErr" class="geo-err__img">
				<img src="http://smartphonus.com/wp-content/uploads/2017/08/081417_0836_4.png" alt="geoErr" class="geo-err__img">
			</div>
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
			data: {},
			apiKey: '7a6fc49e3e7a4a16a50ca3115f3e20d8',
			latitude: '',
			longitude: '',
			icon: '',
			description: '',
			pod: '',
			temperatura: null,
			styleObject: {
				color: 'orange'
			},
			dateNow: '',
			currentTime: null,
			imgSrc: './../../assets/mist.jpg',
			err: false,
			errorMsg: '',
			geoErr: false
    }
	},
	computed: {
		date () {
			return moment().locale("ru").format('dddd: DD-MMM YYYY');
		}
	},
  methods: {
		// Дынные с https://www.weatherbit.io Geolocation function
    async getData () {
			if ("geolocation" in navigator) {
				await navigator.geolocation.getCurrentPosition(this.reqAxios, this.errGeoloc, {timeout: 30000, enableHighAccuracy: true});
			} else {
				alert("Геолокация не доступна");
			};
		},
		// Axios req Запрос на сервер
		async reqAxios(pos) {
			this.latitude = pos.coords.latitude;
			this.longitude = pos.coords.longitude;
				//  
			await	axios.get(`https://api.weatherbit.io/v2.0/current?&lat=${this.latitude}&lon=${this.longitude}&key=${this.apiKey}&lang=ru`)
				.then((res) => {
							const resD = res.data.data[0];
							const code = resD.weather.code;
							this.data = resD;
							this.icon = resD.weather.icon;
							this.description = resD.weather.description;
							this.pod = resD.pod;
							this.temperatura = resD.temp;
							// console.log(this.temperatura);
							// Смена фона при изменении погоды
							this.bgChange(code);
				})
				.catch((error) => {
					console.log(error);
					this.err = true;
					this.errorMsg = error.response.data;
				});
		},
		changeColorTemp() {
			if(this.temperatura <= 0) {
				this.styleObject.color = 'aqua'
			}
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
				this.geoErr = true;
				this.errorMsg = 'Хороший программист,Неее Очень...Возможно вам поможет эта инструкция';
			} else {
				this.err = false;
				this.errorMsg = "";
			}
		},
		//Функция Смены фона при изменении погоды
		bgChange (code) {
			switch (code) {
				case '200':case '201':case '202':case '230':case '231':case '232':case '233':case '300':case '301':case '302':
						case '500': case '501': case '502': case '511': case '520': case '521': case '522':
						// Дождь
					this.imgSrc = 'https://i.ytimg.com/vi/ap8xVjt5smA/maxresdefault.jpg';
						break;
				case '600': case '602': case '603': case '610': case '611': case '612': case '621': case '622': case '623':
				// Снегь
						this.imgSrc = 'http://media.nyckelpiganjenny.se/2015/12/star-winter.jpg';
						break;
				case '700': case '711': case '721': case '731': case '741': case '751':
				// Туман
						this.imgSrc = 'https://i.ytimg.com/vi/L_FZy2iFRZM/maxresdefault.jpg';
						break;
				case '800': case '801': case '802': case '803': case '804':
				// Солнце
						this.imgSrc = 'https://avatars.mds.yandex.net/get-pdb/27625/7eee2880-7d86-481b-91b5-d49d59ce807e/s800';
						break;
				default: 
						this.imgSrc = 'http://www.gvirt.com/uploads/posts/2014-04/1396979891_photo1572242-from-lostpic.net-with-love.jpg';
						break;
			}
		}
	},
  created () {
		this.getData();
		// this.reqAxios(pos);
		this.bgChange();
		this.changeColorTemp();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
	@import './main-page';
</style>