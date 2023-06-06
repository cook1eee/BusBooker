import React, { useState } from "react";
import { Col, Form, Modal, Row, message, Select } from "antd";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function BusForm({
  showBusForm,
  setShowBusForm,
  type,
  selectedBus,
  getData,
  setSelectedBus,
}) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/buses/add-bus", values);
      } else {
        response = await axiosInstance.post("/api/buses/update-bus", {
          ...values,
          _id: selectedBus._id,
        });
      }

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }

      getData();
      setShowBusForm(false);
      setSelectedBus(null);
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <Modal
      width={800}
      title={
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
          {type === "add" ? "Add Bus" : "Update Bus"}
        </h2>
      }
      open={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="name">
              <input
                type="text"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Number" name="number">
              <input
                type="text"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Capacity" name="capacity">
              <input
                type="text"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from">
              <input
                type="text"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to">
              <input
                type="text"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item label="Travel Date" name="travelDate">
              <input
                type="date"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Departure" name="departure">
              <input
                type="time"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Arrival" name="arrival">
              <input
                type="time"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Type" name="type">
              <select
                id="form3Example3cg"
                className="form-control form-control-lg"
              >
                <option value=""></option>
                <option value="Non-AC">Non-AC</option>
                <option value="AC">AC</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Comfort">Comfort</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Price" name="price">
              <input
                type="text"
                id="form3Example3cg"
                className="form-control form-control-lg"
              />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="status">
              <select
                id="form3Example3cg"
                className="form-control form-control-lg"
              >
                <option value="Yet To Start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button
            className="btn btn-light gradient-custom-4 custom-text-color"
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;
