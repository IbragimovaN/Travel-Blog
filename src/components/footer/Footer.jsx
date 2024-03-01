import { useEffect, useState } from "react";
import styled from "styled-components";
import { createWetherIcon } from "../utills/icon-weather";
import { Icon } from "../icon/Icon";

export const FooterContainer = ({ className }) => {
	const [city, setCity] = useState("");
	const [temperature, setTemperature] = useState("");
	const [weather, setWeather] = useState("");
	const [weatherIcon, setWeatherIcon] = useState("");

	useEffect(() => {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=fda79cebbaa2f0262bc4bc8d80a3a984",
		)
			.then((data) => data.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
				setWeatherIcon(createWetherIcon(weather[0].description));
			});
	}, []);
	return (
		<footer className={className}>
			<div className="info">
				Авторский блог Артема Петрова
				<div className="social">
					<Icon iconId="fa-telegram" margin="0 10px 0 0" size="18px"></Icon>
					<Icon iconId="fa-youtube-play" margin="0 10px 0 0" size="18px"></Icon>
					<Icon iconId="fa-instagram" margin="0 10px 0 0" size="18px"></Icon>
				</div>
			</div>
			<div className="weatherWrapper">
				<img className="weatherIcon" src={weatherIcon} alt="weather-icon"></img>
				<div className="weather">
					{city}, {temperature} градусов {weather}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	// background-color: #4a72ce;
	background: url("https://i.baraholka.com.ru/files/1/8/1862507_5.jpg");
	background-size: 100%;
	background-repeat: no-repeat;
	// position: fixed;
	bottom: 0;
	width: 1200px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	color: #fff;
	box-sizing: border-box;
	padding: 0 20px;
	align-items: center;
	font-size: 16px;

	& .info {
		display: flex;
		align-items: center;
	}

	& .social {
		display: flex;
		align-items: center;
		margin-left: 10px;
	}

	& i {
		color: #fff;
	}

	& .weatherWrapper {
		display: flex;
		align-items: center;
	}

	& img {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}

	& .weather {
	}
`;
