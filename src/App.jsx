import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
	color: pink;
	text-align: center;
	padding: 250px 0 166px 0;
`;

const Header = () => {
	return <div>Header</div>;
};
const Footer = () => {
	return <div>Footer</div>;
};

export const App = () => {
	return (
		<>
			<Header>Header</Header>
			<Content>
				<h2>Контент страницы</h2>;
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/postId" element={<div>Статья</div>} />
					<Route path="/*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer>Footer</Footer>
		</>
	);
};
