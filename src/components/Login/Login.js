import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import './Login.scss';

function Login() {
    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);

    const account = {
        email: 'admin@gmail.com',
        password: 'Tien123@',
    };

    const schema = yup.object({
        email: yup.string().email('Please enter a valid email address').required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
            ),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const getUserInfo = () => {
        const userInfo = JSON.parse(window.localStorage.getItem('user'));
        console.log({ ...account, userInfo });

        return {
            ...account,
            ...userInfo,
        };
    };

    const onSubmit = (data) => {
        console.log(data);
        const user = getUserInfo();
        console.log(user);
        if (data.email === user.email && data.password === user.password) {
            navigate('/profile');
        } else {
            alert('Invalid username or password');
        }
    };

    // Handle show hide password
    const hanldeShowHidePassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className="wrapp-form">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="login-title">Login</h2>
                <label htmlFor="email" className="login-label">
                    Email
                </label>
                <input
                    {...register('email')}
                    type="email"
                    name="email"
                    className="login-input"
                    placeholder="kyanon@gmail.com"
                />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="password" className="login-label">
                    Password
                </label>
                <div className="custom-input-password">
                    <input
                        {...register('password')}
                        type={isShowPassword ? 'text' : 'password'}
                        name="password"
                        className="login-input"
                        placeholder="******"
                    />
                    {errors.password && <p>{errors.password.message}</p>}

                    <span onClick={hanldeShowHidePassword}>
                        <i className={isShowPassword ? 'icon fa-regular fa-eye' : 'icon fa-solid fa-eye-slash'}></i>
                    </span>
                </div>
                <div className="wrapper">
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
