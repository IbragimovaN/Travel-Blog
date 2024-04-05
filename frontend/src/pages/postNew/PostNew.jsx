import styled from "styled-components";
import { Icon, Input } from "../../components";
import { useEffect, useState } from "react";
import { addPostAsync } from "../../actions/add-post-async";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Content } from "../../components/content/content";
import { ROLE } from "../../constants/roleId";

export const PostNewContainer = ({ className }) => {
	const [title, setTitle] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [publishedAt, setPublishedAt] = useState("");
	const [content, setContent] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setPublishedAt(new Date().toISOString().substring(0, 16).replace("T", " "));
	}, []);

	const onSave = () => {
		dispatch(addPostAsync({ title, imgUrl, content })).then(({ id }) =>
			navigate(`/posts/${id}`),
		);
	};

	return (
		<div className={className}>
			<Content access={[ROLE.ADMIN]}>
				<div className="special-panel">
					<div className="publishedAt">
						<Icon iconId="fa-calendar-o" margin="0 10px 0 0" size="21px"></Icon>
						{publishedAt}
					</div>
					<div className="buttons">
						<Icon
							iconId="fa-floppy-o"
							margin="0 10px 0 0"
							size="21px"
							onClick={onSave}
						></Icon>
					</div>
				</div>
				<Input
					placeholder="Изображение"
					onChange={({ target }) => setImgUrl(target.value)}
				/>
				<Input
					placeholder="Заголовок"
					onChange={({ target }) => setTitle(target.value)}
				/>
				<textarea
					placeholder="Текст"
					onChange={({ target }) => setContent(target.value)}
				/>
			</Content>
		</div>
	);
};
export const PostNew = styled(PostNewContainer)`
	padding: 20px 80px;
	white-space: pre-line;

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

	& textarea {
		text-align: left;
		font-family: inherit;
		line-height: inherit;
		width: 100%;
		margin: 0;
		box-sizing: border-box;
		padding: 10px;
		border: 1px solid #000;
		font-size: 16px;
	}
	& .buttons {
		display: flex;
		flex-direction: row;
		font-size: 18px;
	}
`;
