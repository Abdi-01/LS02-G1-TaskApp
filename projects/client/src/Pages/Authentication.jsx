import React, { useState, useEffect } from 'react';
import '../index.css';
import { AiFillCloseCircle, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputGroup, Input, InputRightElement, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function AuthenticationPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [formType, setFormType] = useState('login');
	const [form, setForm] = useState({ email: '', password: '' });
	const [isSuccess, setIsSuccess] = useState(null);

	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const login = await axios.post(API_URL + '/user/login', form);
			if (login.data?.success) {
				setIsSuccess((prev) => (prev = true));
				navigate('/todo')
				return;
			}
			setIsSuccess((prev) => (prev = false));
		} catch (error) {
			setIsSuccess((prev) => (prev = false));
			console.log(error);
		}
	};

	const handleRegister = async () => {
		try {
			const register = await axios.post(API_URL + '/user/register', form);
			if (register.data?.success) {
				setIsSuccess((prev) => (prev = true));
				return;
			}
			setIsSuccess((prev) => (prev = false));
		} catch (error) {
			setIsSuccess((prev) => (prev = false));
			console.log(error);
		}
	};

	const resetForm = () => {
		setForm((prev) => (prev = { email: '', password: '' }));
	};

	useEffect(() => {
		if (isSuccess === true || isSuccess === false) {
			setTimeout(() => {
				setIsSuccess((prev) => (prev = null));
			}, 3000);
		}
	}, [isSuccess]);

	return (
		<>
			{isSuccess === false && (
				<div className="alert">
					<Alert status="error">
						<AlertIcon />
						<AlertTitle>{formType === 'login' ? 'LOGIN FAILED -' : 'REGISTER FAILED -'}</AlertTitle>
						<AlertDescription>Something went wrong! Please try again.</AlertDescription>
					</Alert>
				</div>
			)}
			{isSuccess === true && (
				<div className="alert">
					<Alert status="success">
						<AlertIcon />
						<AlertTitle>{formType === 'login' ? 'LOGIN SUCCESS -' : 'REGISTER SUCCESS -'}</AlertTitle>
						<AlertDescription>{formType === 'login' ? 'You login successfuly!' : 'Your registration success!'}</AlertDescription>
					</Alert>
				</div>
			)}

			<main className="login-page-background">
				<section>
					<div className="login-card">
						<div className="grid grid-cols-6 gap-4">
							<div className="col-start-1 col-end-3 pt-[35px] pb-[35px] pl-[30px] text-[#200c44] font-bold font-sans text-2xl">{formType === 'login' ? 'Log in' : 'Register'}</div>
							<div className="col-end-7 col-span-2 text-center btn-close pt-[35px] pb-[35px] pr-[30px]">
								<AiFillCloseCircle className="cursor-pointer" color="rgb(32,12,68, 0.2)" size="35" />
							</div>
						</div>
						<hr style={{ border: '2px solid white', borderBottom: 'none' }} />

						<div className="mt-[30px] mb-[20px] mx-[30px]">
							<Input
								value={form.email}
								size="lg"
								_focusVisible={{ outline: '2px solid rgb(125,67,226, 0.7)' }}
								backgroundColor="white"
								className="input-form"
								pr="4.5rem"
								type={'email'}
								placeholder="E-mail"
								color="#200c44"
								_placeholder={{ color: 'inherit' }}
								onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
							/>
						</div>

						<div className="mt-[20px] mb-[20px] mx-[30px]">
							<InputGroup>
								<Input
									value={form.password}
									size="lg"
									backgroundColor="white"
									className="input-form"
									pr="4.5rem"
									type={showPassword ? 'text' : 'password'}
									placeholder="Password"
									color="#200c44"
									_placeholder={{ color: 'inherit' }}
									_focusVisible={{ outline: '2px solid rgb(125,67,226, 0.7)' }}
									onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
								/>
								<InputRightElement width="4.5rem">
									{showPassword ? (
										<AiFillEyeInvisible className="cursor-pointer mt-[10px]" size={25} color="rgb(32,12,68, 0.6)" onClick={() => setShowPassword((prev) => (prev = !prev))} />
									) : (
										<AiFillEye className="cursor-pointer mt-[10px]" size={25} color="rgb(32,12,68, 0.6)" onClick={() => setShowPassword((prev) => (prev = !prev))} />
									)}
								</InputRightElement>
							</InputGroup>
						</div>
						{formType === 'login' ? (
							<h1 className="forgot-password cursor-pointer">Forgot your password?</h1>
						) : (
							<h1 className="forgot-password" style={{ color: '#ebe9f5' }}>
								-
							</h1>
						)}
						<Button
							className="mt-[20px] mb-[30px] mx-[30px] btn-login"
							style={{ width: '88%' }}
							size="lg"
							onClick={() => {
								if (form.email !== '' && form.password !== '') {
									formType === 'login' ? handleLogin() : handleRegister();
									resetForm();
									return;
								}

								setIsSuccess((prev) => (prev = false));
							}}
						>
							{formType === 'login' ? 'Login' : 'Register'}
						</Button>

						<hr style={{ border: '2px solid white', borderBottom: 'none', display: 'flex', position: 'relative' }} />
						{formType === 'login' ? (
							<h1 className="auth-option mt-[40px]">
								Don&apos;t have an account yet?
								<span
									className="font-bold cursor-pointer"
									onClick={() => {
										setFormType((prev) => (prev = formType === 'login' ? 'register' : 'login'));
										resetForm();
									}}
								>
									{' '}
									Sign up!
								</span>
							</h1>
						) : (
							<h1 className="auth-option mt-[40px]">
								Already have an account?
								<span
									className="font-bold cursor-pointer"
									onClick={() => {
										setFormType((prev) => (prev = formType === 'login' ? 'register' : 'login'));
										resetForm();
									}}
								>
									{' '}
									Log in!
								</span>
							</h1>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
