import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './Profile.scss';

function Profile() {
    const schema = yup.object().shape({
        name: yup.string().required('Please enter your name'),
        email: yup.string().email('Please enter a valid email address').required('Email is required'),
        phone: yup
            .string()
            .matches(/^(\+\d{1,3})?\d{10}$/, 'Please enter a valid phone number')
            .required('Phone number is required'),
        birthday: yup.date().max(new Date(), 'Birthday can not be in the future').typeError('Birthday is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (user) => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        alert('Success');
    };

    return (
        <div className="wrapp-form">
            <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="profile-title">Profile</h2>
                <label htmlFor="name" className="profile-label">
                    Name
                </label>
                <input type="text" name="name" className="profile-input" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}

                <label htmlFor="birthday" className="profile-label">
                    Birthday
                </label>
                <input {...register('birthday')} type="date" name="birthday" className="profile-input" />
                {errors.birthday && <p>{errors.birthday.message}</p>}

                <label htmlFor="email" className="profile-label">
                    Email
                </label>
                <input type="email" name="email" className="profile-input" {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="phone" className="profile-label">
                    Phone
                </label>
                <input type="tel" name="phone" className="profile-input" {...register('phone')} />
                {errors.phone && <p>{errors.phone.message}</p>}

                <div className="container-btn">
                    <button type="submit" className="profile-button">
                        Update
                    </button>
                    <button type="button" className="profile-button-cancel">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
