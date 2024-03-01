import styled from "styled-components";
import { Input } from "../input/Input";
import { Icon } from "../icon/Icon";

export const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input placeholder="поиск" value={searchPhrase} onChange={onChange} />
			<Icon iconId="fa-search" margin="0 10px 0 0" size="14px"></Icon>
		</div>
	);
};
export const Search = styled(SearchContainer)`
	display: flex;
	align-items: center;
	width: 340px;
	height: 40px;
	margin: 10px auto 0 auto;

	& input {
		margin: 0;
		padding: 0 25px 0 5px;
	}

	& div {
		margin: -20px;
	}
`;
