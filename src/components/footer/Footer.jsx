import styled from "styled-components";

export const FooterContainer = ({ className }) => {
	return (
		<footer className={className}>
			<div> Footer</div>
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
`;
