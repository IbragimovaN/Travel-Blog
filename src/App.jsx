import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components";
import styled from "styled-components";
import { Authorization, Registration, Users } from "./pages";

const Page = styled.div`
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
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/postId" element={<div>Статья</div>} />
					<Route path="/*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer>Footer</Footer>
		</AppWrapper>
	);
};
