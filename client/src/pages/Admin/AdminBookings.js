import React, { useEffect, useState } from "react";
import { message, Table } from "antd";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosInstance";

function AdminBookings() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-all-bookings",
        {}
      );
      dispatch(HideLoading());

      if (response.data.success) {
        setBookings(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteBooking = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/delete-booking",
        {
          _id: id,
        }
      );
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        getBookings();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: ["user", "name"],
      key: "name",
    },
    {
      title: "Bus",
      dataIndex: ["bus", "name"],
      key: "name",
    },
    {
      title: "Number",
      dataIndex: ["bus", "number"],
      key: "number",
    },
    {
      title: "Date",
      dataIndex: ["bus", "travelDate"],
      key: "travelDate",
    },
    {
      title: "Departure",
      dataIndex: ["bus", "departure"],
      key: "departure",
    },
    {
      title: "Arrival",
      dataIndex: ["bus", "arrival"],
      key: "arrival",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render: (seats) => seats.join(", "),
      key: "seats",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <i
            class="ri-delete-bin-line"
            onClick={() => {
              deleteBooking(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <PageTitle title="Bookings" />
      </div>

      <Table columns={columns} dataSource={bookings} />
    </div>
  );
}

export default AdminBookings;
