import { ACTION_TYPE } from "../actions";

const initialAppState = {
	wasLogout: false,
	modal: {
		text: "",
		isOpen: false,
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT: {
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		}
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState;

		case ACTION_TYPE.OPEN_MODAL: {
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		}
		default:
			return state;
	}
};
