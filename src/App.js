import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
	color: blue;
`;

export const App = () => {
	useEffect(() => {
		console.log(
			new Date(Math.random() * 1000000000000 + 1999999999999)
				.toISOString()
				.substring(0, 16)
				.replace("T", " "),
		);
	}, []);

	return (
		<Container>
			<div className="fa fa-user-circle-o">Hello!</div>;
		</Container>
	);
};
