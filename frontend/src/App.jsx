import { Route, Routes } from "react-router-dom";
import { Header, Footer, Modal, Error } from "./components";
import styled from "styled-components";
import {
	Authorization,
	Registration,
	Users,
	Post,
	PostNew,
	Main,
} from "./pages";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";

const Page = styled.div`
	text-align: center;
	min-height: calc(100vh - 250px);
`;

const AppWrapper = styled.div`
	positin: relative;
	padding: 200px 0 0px 0;
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
		fetch("/posts")
			.then((data) => data.json())
			.then((data) => console.log(data));

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
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/posts" element={<div>Статьи</div>} />
					<Route path="/posts/:id" element={<Post />} />
					<Route path="/post" element={<PostNew />} />
					<Route path="/posts/:id/edit" element={<Post />} />

					<Route
						path="/*"
						element={<Error error="Такая страница не существует" />}
					/>
				</Routes>
			</Page>
			<Footer>Footer</Footer>
			<Modal />
		</AppWrapper>
	);
};
