import styled from "styled-components";
import { Button } from "../button/Button";
import { useSelector } from "react-redux";
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from "../../selectors/selectors";

export const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text} </h3>
				<div className="buttons">
					<Button width={"120px"} onClick={onConfirm}>
						Да
					</Button>
					<Button width={"120px"} onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};
export const Modal = styled(ModalContainer)`
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	position: fixed;
	z-index: 20;

	& .overlay {
		background-color: rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: 30;
	}

	& .box {
		width: 400px;
		height: 150px;
		background-color: #fff;
		z-index: 40;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& h3 {
		margin-bottom: 30px;
	}

	& .buttons {
		display: flex;
	}

	& .buttons button {
		margin: 0 5px 0 5px;
		background-color: #fff;
	}

	& .buttons button:hover {
		background-color: #426ac2;
	}
`;
