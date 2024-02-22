import styled from "styled-components";
import { Icon } from "../../../../components";

export const PostContentContainer = ({ className, post }) => {
	const { id, title, imgUrl, content, publishedAt } = post;

	return (
		<div className={className}>
			<img src={imgUrl} alt="img"></img>
			<h3>{title}</h3>
			<div className="special-panel">
				<div className="publishedAt">
					<Icon iconId="fa-calendar-o" margin="0 10px 0 0" size="21px"></Icon>
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon
						iconId="fa-pencil-square-o"
						margin="0 10px 0 0"
						size="21px"
					></Icon>
					<Icon iconId="fa-trash-o" margin="0 10px 0 0" size="21px"></Icon>
				</div>
			</div>

			<div className="text">{content}</div>
		</div>
	);
};
export const PostContent = styled(PostContentContainer)`
	padding: 20px 80px;

	& img {
		width: 200px;
		height: 134px;
		float: left;
		margin: 0 20px 10px 0;
	}
	& .special-panel {
		font-size: 18px;
		display: flex;
		justify-content: space-between;
	}
	& .publishedAt {
		display: flex;
		margin-bottom: 5px;
		align-items: center;
		font-size: 18px;
	}
	& i {
		font-size: 18px;
	}

	& h3 {
		font-size: 20px;
		text-align: left;
		margin-bottom: 10px;
	}

	& .text {
		text-align: left;
		text-indent: 30px;
	}
	& .buttons {
		display: flex;
		flex-direction: row;
		font-size: 18px;
	}
`;
