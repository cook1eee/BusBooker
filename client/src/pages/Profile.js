import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Form, Modal, Row, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function Profile() {
  let { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(user);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());

      const response = await axiosInstance.post(
        "/api/users/update-user",
        values
      );

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="my-2">
            <h3>My Profile</h3>
            <hr />
          </div>
          <Form onFinish={onFinish}>
            <div className="row  gx-5">
              <div className="col-xxl-8 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 mt-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Contact detail</h4>
                    <Form.Item name="name">
                      <div className="col-md-6">
                        <label className="form-label">Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={user.name}
                        />
                      </div>
                    </Form.Item>

                    <Form.Item name="email">
                      <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">
                          Email *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          defaultValue={user.email}
                        />
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-2 ">
              {/* Updated class: mb-2 */}
              <div className="col-xxl-6">
                <div className="bg-secondary-soft px-4  rounded">
                  <div className="row g-3">
                    <h4 className="my-4">Change Password</h4>
					

                    {/* New password */}
                    <Form.Item name="password">
                      <div className="col-md-6">
                        <label
                          htmlFor="exampleInputPassword2"
                          className="form-label"
                        >
                          New password *
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword2"
                        />
                      </div>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="gap-3 d-md-flex mt-5 justify-content-md-end text-center">
              <button type="submit" className="btn btn-primary">
                Update profile
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
