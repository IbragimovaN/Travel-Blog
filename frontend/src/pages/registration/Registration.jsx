import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Input, Button } from "../../components";
import { Navigate } from "react-router-dom";
import { setUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { selectUserRole } from "../../selectors/selectors";
import { ROLE } from "../../constants/roleId";
import { useResetForm } from "../../hooks/use-reset-form";
import { request } from "../../utils/request";

const regFromSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.required("Заполните повтор пароля")
		.oneOf([yup.ref("password"), null], "Повтор пароля не совпадает"),
});

export const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
			passcheck: "",
		},
		resolver: yupResolver(regFromSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request("/register", "POST", { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(error);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem("userData", JSON.stringify(user));
			},
		);
	};

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;

	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<h2>Регистрация</h2>
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
				<Input
					type="password"
					placeholder="Повтор пароля"
					{...register("passcheck", { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегестироваться
				</Button>

				{errorMessage && <ErrorMessageReg>{errorMessage}</ErrorMessageReg>}
			</form>
		</div>
	);
};
export const Registration = styled(RegistrationContainer)`
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

export const ErrorMessageReg = styled.div`
	color: red;
`;
