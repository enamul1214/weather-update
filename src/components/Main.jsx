import axios from "axios";
import { useState } from "react";
import {
	FaCloudMoonRain,
	FaCloudRain,
	FaCloudShowersHeavy,
	FaCloudSun,
	FaSearchLocation,
	FaSun,
	FaWater,
	FaWind,
} from "react-icons/fa";

function Main() {
	const [data, setData] = useState({
		celcius: 10,
		name: "Dhaka",
		country: "BD",
		humidity: 10,
		speed: 10,
		weatherType: "Clouds",
	});

	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const handleClick = () => {
		// console.log(process.env.WEATHER_API_KEY);
		if (name !== "") {
			const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=76dc168bb0d923c1c292a2a869a3a0f3&units=metric`;
			// const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${process.env.WEATHER_API_KEY}&units=metric`;
			axios
				.get(apiUrl)
				.then((response) => {
					setData({
						...data,
						celcius: response.data.main.temp,
						name: response.data.name,
						country: response.data.sys.country,
						humidity: response.data.main.humidity,
						speed: response.data.wind.speed,
						weatherType: response.data.weather[0].main,
					});
					setError("");
				})
				.catch((err) => {
					if (err.response.status === 404) {
						setError("City Name is not matched");
					} else {
						setError("");
					}
				});
		}
	};

	return (
		<div className="w-[320px] mx-auto bg-blue-300 rounded-lg p-5 mt-10">
			<div className="header mb-5">
				<div className="flex align-start">
					<input
						className="py-[8px] px-3 rounded-tl-lg rounded-bl-lg focus:outline-none  w-[100%]"
						type="text"
						placeholder="Enter your city"
						onChange={(e) => setName(e.target.value)}
					/>
					<button
						className="bg-white py-3 px-3 rounded-tr-lg rounded-br-lg"
						onClick={handleClick}
					>
						<FaSearchLocation />
					</button>
				</div>
				<div className="error text-red-700 text-[12px]">
					<p>{error}</p>
				</div>
			</div>

			<div className="text-center">
				{(() => {
					if (data.weatherType == "Clouds") {
						return (
							<FaCloudRain className="text-white text-[80px] mx-auto mb-5" />
						);
					} else if (data.weatherType == "Clear") {
						return (
							<FaSun className="text-white text-[80px] mx-auto mb-5" />
						);
					} else if (data.weatherType == "Rain") {
						return (
							<FaCloudShowersHeavy className="text-white text-[80px] mx-auto mb-5" />
						);
					} else if (data.weatherType == "Drizzle") {
						return (
							<FaCloudMoonRain className="text-white text-[80px] mx-auto mb-5" />
						);
					} else if (data.weatherType == "Mist") {
						return (
							<FaCloudSun className="text-white text-[80px] mx-auto mb-5" />
						);
					} else {
						return (
							<FaCloudRain className="text-white text-[80px] mx-auto mb-5" />
						);
					}
				})()}
				<h1 className="text-white text-[40px]">
					{Math.round(data.celcius)}°C
				</h1>
				<h2 className="text-white text-[40px]">
					{data.name}, {data.country}
				</h2>
			</div>
			<div className="footer mt-8">
				<div className="relative columns-1 sm:columns-2 gap-3">
					<div className="flex items-center">
						<FaWater className="text-white text-[40px] mr-3" />
						<div className="humidity-data">
							<p className="text-white text-[20px]">
								{Math.round(data.humidity)}%
							</p>
							<p className="text-white text-[20px]">humidity</p>
						</div>
					</div>
					<div className="flex items-center">
						<FaWind className="text-white text-[40px] mr-3" />
						<div className="speed-data">
							<p className="text-white text-[20px]">
								{Math.round(data.speed)} km/h
							</p>
							<p className="text-white text-[20px]">Speed</p>
						</div>
					</div>
				</div>
				<p className="text-white text-center text-[12px] pt-5">
					Developed by{" "}
					<a
						href="https://www.linkedin.com/in/enamul-kabir-69652744/"
						target="_blank"
						rel="noreferrer"
					>
						Enamul Kabir
					</a>
				</p>
			</div>
		</div>
	);
}

export default Main;
