import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useNavigate  } from "react-router-dom"; 

import { googleLogin, signup, login } from "../../redux/User.js";

import ShowSVG from "./ShowSVG/ShowSVG.js";
import HideSVG from "./HideSVG/HideSVG.js";

import "./Auth.css";

const Auth = () => {
    const CLIENT_ID = "18229699408-lt9gun1vb3r6moqak9fs3oh21sugscb1.apps.googleusercontent.com";

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ isSignup, setIsSignup ] = useState(true);
    const [ passVisible, setPassVisible] = useState(false);
    const [ formData, setFormData ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: ""
    })
    const[formErrors, setFormErrors] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        repasswordError: "",
        accountExists: "",
    });

    const handlePassVisible = (e) => {
        e.preventDefault();

        passVisible ? setPassVisible(false) : setPassVisible(true);
    }

    const switchMode = (e) => {
        e.preventDefault();

        isSignup ? setIsSignup(false) : setIsSignup(true);
    }

    const handleCallbackResponse = (res) => {
        googleLogin({result: jwt_decode(res.credential), token: res.credential}, dispatch);

        navigate("/");
    }
    useEffect(() => {
        /* global google */

        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("googleLogIn"),
            { 
                theme: "outline", 
                size: "large"}
        );

        },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let hasError = false;

        const fieldsToValidate = ['firstName', 'lastName', 'email', "password"];
        fieldsToValidate.forEach((field) => {
        if (formData[field].trim() === '') {
            console.log(field);
            hasError = true;
            setFormErrors((prevFormErrors) => ({...prevFormErrors, [`${field}Error`]: `${field} is required`}));
        }
        });

        if(formData.password !== formData.repassword){
            setFormErrors((prevFormErrors) => ({...prevFormErrors,  repasswordError: "passwords do not match"}));
            hasError = true;
        }

        if(!hasError){
            if(isSignup){
                const res = await signup(formData, navigate, dispatch);
                
                if(res.message === "Account already exists."){
                    setFormErrors((prevFormErrors) => ({...prevFormErrors,  accountExists: res.message}));

                    console.log(formErrors);
                }
            }else{
                login(formData, navigate, dispatch)
            }
        }else{
            console.log(formErrors);
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
        setFormErrors({ ...formErrors, [`${e.target.name}Error`]: '' });

        if(e.target.name === "email"){
            console.log(formErrors);
            setFormErrors((prevFormErrors) => ({...prevFormErrors,  accountExists: ""}));
        }
    }
    
  return (
    <div className="formContainerContainer">
        <div className="formContainer">
            <h1 className="authFormHeader">{ isSignup ? "Sign Up" : "Log In"}</h1>
            <form>
                {
                    isSignup && (<div className="flName">
                                    <div className='inputError' style={{width: "45%"}}>
                                        <input type="text" name="firstName" className="firstName" onChange={ handleChange }></input>
                                        <h5 className="lableInput">First Name</h5>
                                        {formErrors.firstNameError && (<div className="error">{formErrors.firstNameError}</div>)}
                                    </div>
                                    
                                    <div className='inputError' style={{width: "45%"}}>
                                        <input type="text" name="lastName" className="lastName" onChange={ handleChange }></input>
                                        <h5 className="lableInput">Last Name</h5>
                                        {formErrors.lastNameError && (<div className="error">{formErrors.lastNameError}</div>)}
                                    </div>
                                </div>)
                }
                
                
                <div className='inputError'>
                    <input type="email" name="email" className="email" onChange={ handleChange }></input>
                    <h5 className="lableInput">E-Mail</h5>
                    {
                        formErrors.emailError ? (
                            <div className="error">{formErrors.emailError}</div>
                        ) : (
                            formErrors.accountExists && (
                                <div className="error">{formErrors.accountExists}</div>
                            )
                        )
                    }
                </div>

                <div className='inputError'>
                    <div className="passwordContainer"> 
                        <input type={ passVisible ? "text" : "password" } name="password" className="password" onChange={ handleChange }></input>
                        <h5 className="lableInput">Password</h5>
                        <button style={{backgroundColor: "transparent", border: "none"}} onClick={ handlePassVisible }>{passVisible ? <HideSVG /> : <ShowSVG />}</button>
                    </div>

                    {formErrors.passwordError && (<div className="error">{formErrors.passwordError}</div>)}
                </div>
                {
                    isSignup && (
                        
                        <div className='inputError'>
                            <input type="password" name="repassword" className="repassword" onChange={ handleChange }></input>
                            <h5 className="lableInput">Re-Enter Password</h5>
                            {formErrors.repasswordError && (<div className="error">{formErrors.repasswordError}</div>)}
                        </div>
                    )
                }
                
                <div className="signupinContainer">
                    <button className="signupin" onClick={ handleSubmit }>{ isSignup ? "Sign Up" : "Log In"}</button>
                </div>

                <div className="googleLogInContainer">
                    <div id="googleLogIn"></div>
                </div>
            </form>
                
            <div className="switchContainer">
                { 
                    isSignup ? (
                                <>
                                    <p>Already have an account? </p>
                                    <button onClick={switchMode}>Log In</button>
                                </>
                    ) : (
                        <>
                            <p>Don't have an account yet?</p>
                            <button onClick={switchMode}>Sign Up</button>
                        </>  
                    )
                }
            </div>
        </div>
    </div>


  )
}

export default Auth