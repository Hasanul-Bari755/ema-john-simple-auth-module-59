import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Signup.css'
const Signup = () => {
    const [error, setError] = useState(null);
    const {createUser } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if (password.length < 6) {
            setError('Password should be 6 character long');
            return;
        }
        if (password !== confirm) {
            setError('Your password did not match');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset()
            })
            .catch(error => {
            console.error(error)
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id=""  required/>
                </div>
                <div className="form-control">
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" id=""  required/>
                </div>
                <div className="form-control">
                    <label htmlFor='password'>Confirm Password</label>
                    <input type="password" name="confirm" id=""  required/>
                </div>
                <input className='btn-submit' type='submit' value='Login'/>
            </form>
            <p>Already have a Account <Link to='/login'>Login</Link></p>
            <p className='text-error'>{error }</p>
        </div>
    );
};

export default Signup;