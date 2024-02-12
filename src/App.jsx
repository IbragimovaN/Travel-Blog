import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import styled from "styled-components";
import { Authorization } from "./pages";

const Content = styled.div`
	text-align: center;
`;

const AppWrapper = styled.div`
	positin: relative;
	padding: 250px 0 100px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1200px;
	// min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
	height: 100vh;
	box-shadow: 0 0 20px #000;
`;

export const App = () => {
	return (
		<AppWrapper>
			<Header>Header</Header>
			<Content>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/postId" element={<div>Статья</div>} />
					<Route path="/*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer>Footer</Footer>
		</AppWrapper>
	);
};
