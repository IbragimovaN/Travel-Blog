import { Route, Routes } from "react-router-dom";
import { Header, Footer, Modal } from "./components";
import styled from "styled-components";
import { Authorization, Registration, Users, Post } from "./pages";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";

const Page = styled.div`
	text-align: center;
`;

const AppWrapper = styled.div`
	positin: relative;
	padding: 200px 0 80px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1200px;
	// min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

export const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");
		const currentUserData = JSON.parse(currentUserDataJSON);

		if (!currentUserData) {
			return;
		}

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	});

	return (
		<AppWrapper>
			<Header>Header</Header>
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/posts" element={<div>Статьи</div>} />
					<Route path="/posts/:id" element={<Post />} />
					<Route path="/*" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer>Footer</Footer>
			<Modal />
		</AppWrapper>
	);
};
