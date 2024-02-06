import styled from "styled-components";

const Container = styled.div`
	color: blue;
`;

export const App = () => {
	return (
		<Container>
			<div className="fa fa-user-circle-o">Hello!</div>;
		</Container>
	);
};
