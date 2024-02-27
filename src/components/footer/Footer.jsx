import { useEffect, useState } from "react";
import styled from "styled-components";
import { createWetherIcon } from "../utills/icon-weather";
import TELEGRAM_ICON from "../../image/free-icon-telegram-2111646.png";
import INSTA_ICON from "../../image/free-icon-instagram-2111463.png";
import YOUTUBE_ICON from "../../image/free-icon-youtube-174883.png";

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
			<Info>
				Авторский блог Артема Петрова
				<Social>
					<a href="/">
						<ImgSocialIcon src={TELEGRAM_ICON}></ImgSocialIcon>
					</a>
					<a href="/">
						<ImgSocialIcon src={INSTA_ICON}></ImgSocialIcon>
					</a>
					<a href="#/">
						<ImgSocialIcon src={YOUTUBE_ICON}></ImgSocialIcon>
					</a>
				</Social>
			</Info>
			<WeatherWrapper>
				<ImgWeatherIcon src={weatherIcon} alt="weather-icon"></ImgWeatherIcon>
				{city}, {temperature} градусов <br /> {weather}
			</WeatherWrapper>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	// background-color: #4a72ce;
	background: url("https://i.baraholka.com.ru/files/1/8/1862507_5.jpg");
	background-size: 100%;
	background-repeat: no-repeat;
	position: fixed;
	bottom: 0;
	width: 1200px;
	height: 80px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	color: #fff;
	box-sizing: border-box;
	padding: 0 20px;
	align-items: center;
`;

const Info = styled.div`
	height: 60px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`;

const Social = styled.div`
	width: 120px;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
`;

const ImgSocialIcon = styled.img`
	width: 28px;
	height: 28px;
`;
const ImgWeatherIcon = styled.img`
	width: 50px;
	height: 40px;
	backgroung-color: none;
`;
const WeatherWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;

	& img {
		margin-right: 5px;
	}
`;
