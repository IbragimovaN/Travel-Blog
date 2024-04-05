import styled from "styled-components";
import { Icon } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../../actions";
import { closeModal } from "../../../../actions";
import { deletePostAsync } from "../../../../actions/delete-post-async";
import { ROLE } from "../../../../constants/roleId";
import { selectUserRole } from "../../../../selectors/selectors";
import { PROP_TYPE } from "../../../../constants/prop-type";

export const PostContentContainer = ({ className, post }) => {
	const { id, title, imgUrl, content, publishedAt } = post;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	const onPostDelete = (id) => {
		dispatch(
			openModal({
				text: "Удалить статью?",
				onConfirm: () => {
					dispatch(deletePostAsync(id)).then(() => {
						navigate("/");
					});
					dispatch(closeModal);
				},
				onCancel: () => {
					dispatch(closeModal);
				},
			}),
		);
	};
	const isAdmin = [ROLE.ADMIN].includes(roleId);

	return (
		<div className={className}>
			<img src={imgUrl} alt="img"></img>
			<h3>{title}</h3>
			<div className="special-panel">
				<div className="publishedAt">
					<Icon iconId="fa-calendar-o" margin="0 10px 0 0" size="21px"></Icon>
					{publishedAt}
				</div>
				{isAdmin && (
					<div className="buttons">
						<Icon
							iconId="fa-pencil-square-o"
							margin="0 10px 0 0"
							size="21px"
							onClick={() => navigate(`/posts/${id}/edit`)}
						></Icon>
						<Icon
							iconId="fa-trash-o"
							margin="0 10px 0 0"
							size="21px"
							onClick={() => onPostDelete(id)}
						></Icon>
					</div>
				)}
			</div>

			<div className="text">{content}</div>
		</div>
	);
};
export const PostContent = styled(PostContentContainer)`
	padding: 20px 80px;
	white-space: pre-line;

	& img {
		width: 400px;
		height: 220px;
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
PostContent.propTypes = {
	post: PROP_TYPE.POST,
};
