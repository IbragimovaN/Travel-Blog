import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Input, Button } from "../../components";
import { Link, Navigate } from "react-router-dom";
import { setUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors/selectors";
import { ROLE } from "../../constants/roleId";
import { useResetForm } from "../../hooks/use-reset-form";
import { request } from "../../utils/request";

const authFromSchema = yup.object().shape({
	login: yup
		.string()
		.required("Заполните логин")
		.matches(/^\w+$/, "Неверный логин. Допускаются только буквы и цифры")
		.min(3, "Не верный логин. Минимум 3 символа.")
		.max(15, "Не верный логин. Максимум 15 символов"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/^[\w#%]+$/,
			"Неверно заполнен пароль, допускаются буквыб цифры и знаки № %",
		)
		.min(6, "Не верный пароль. Минимум 6 символа.")
		.max(30, "Не верный пароль. Максимум 30 символов"),
});

export const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: yupResolver(authFromSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request("/login", "POST", { login, password }).then(({ user, error }) => {
			if (error) {
				setServerError(error);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem("userData", JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register("login", { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register("password", { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Войти
				</Button>

				<Link to="/register">Регистрация</Link>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</form>
		</div>
	);
};
export const Authorization = styled(AuthorizationContainer)`
	margin-top: 25px;
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;

export const ErrorMessage = styled.div`
	color: red;
`;
