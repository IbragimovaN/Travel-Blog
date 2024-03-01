import { Link } from "react-router-dom";
import { Logo, ControlPanel } from "./header-components";
import styled from "styled-components";

export const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Link to="/">
				<LogoSection>
					<Logo></Logo>
					<TitleWrapper>
						<Title>Travel-Blog</Title>
						<SubTitle>заметки путешественника</SubTitle>
					</TitleWrapper>
				</LogoSection>
			</Link>

			<ControlPanel></ControlPanel>
		</header>
	);
};

export const Header = styled(HeaderContainer)`
	box-sizing: border-box;
	background: url("https://i.baraholka.com.ru/files/1/8/1862507_5.jpg");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	box-shadow: 0 0 20px #000;
	position: fixed;
	top: 0;
	width: 1200px;
	height: 200px;
	padding: 0 20px;
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Title = styled.h1`
	font-size: 30px;
	margin-bottom: 5px;
	font-weight: bold;
`;

export const SubTitle = styled.h3`
	font-size: 15px;
`;

export const LogoSection = styled.div`
	display: flex;
	flex-direction: row;
	width: 280px;
	justify-content: space-between;
	text-decoration: none;
	color: #fff;
`;
