import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { useRef } from "react";
import { sanitizeContent } from "./utils/sanitaze-content";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions";
import { useNavigate } from "react-router-dom";

import { PROP_TYPE } from "../../../../constants/prop-type";

export const PostFormContainer = ({ className, post }) => {
	const { id, title, imgUrl, content, publishedAt } = post;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const imgRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const onSave = () => {
		const newImg = imgRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync({
				id,
				imgUrl: newImg,
				title: newTitle,
				content: newContent,
			}),
		).then(() => navigate(`/posts/${id}`));
	};

	return (
		<div className={className}>
			<Input ref={imgRef} defaultValue={imgUrl} placeholder="Изображение" />
			<Input ref={titleRef} defaultValue={title} placeholder="Заготовок" />

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
					<Icon iconId="fa-trash-o" margin="0 10px 0 0" size="21px"></Icon>
				</div>
			</div>

			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="text"
			>
				{content}
			</div>
		</div>
	);
};
export const PostForm = styled(PostFormContainer)`
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

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
