import PropTypes from "prop-types";
import { ROLE } from "./roleId";

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE));

export const PROP_TYPE = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string.isRequired,
	}),
	COMMENT: PropTypes.shape({
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		postId: PropTypes.string.isRequired,
	}),
	POST: PropTypes.shape({
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
		imgUrl: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}),
};
