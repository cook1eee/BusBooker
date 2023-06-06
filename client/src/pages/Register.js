import React from 'react';
import { Form, message } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertsSlice';


function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish=async(values)=>{
        try{
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/register", values);
            dispatch(HideLoading());
            if(response.data.success) {
                message.success(response.data.message);
                navigate("/login");
            } else{
                message.error(response.data.message);
            }
        }catch(error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

  return (
    <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80')" }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <Form layout="vertical" onFinish={onFinish}>

                    
                        <Form.Item className="form-outline mb-4" name='name' label={<span className="form-check-label" for="form2Example3g">Your Name</span>}>
                        <input type="text" id="form3Example1cg" className="form-control form-control-lg" />
                        </Form.Item>

                        <Form.Item className="form-outline mb-4" name='email' label={<span className="form-check-label" for="form2Example3g">Your Email</span>}>
                        <input type="text" id="form3Example3cg" className="form-control form-control-lg" />
                        </Form.Item>

                        <Form.Item className="form-outline mb-4" name='password' label={<span className="form-check-label" for="form2Example3g">Password</span>}>
                        <input type="password" id="form3Example4cg" className="form-control form-control-lg" />
                        </Form.Item>

                        <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                        <label className="form-check-label" for="form2Example3g">
                            I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                        </label>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" type="submit">Register</button>
                        </div>
                
                        <p className="text-center text-muted mt-5 mb-0">Have already an account? 
                            <Link to="/login" className="fw-bold text-body">Login here</Link>
                        </p>
                    
                    </Form>

                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>

  )
};


export default Register