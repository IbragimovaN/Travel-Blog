export const debounce = (func, delay) => {
	let timeoutId;
	return (...arg) => {
		setTimeout(timeoutId);
		timeoutId = setTimeout(() => func(...arg), delay);
	};
};
