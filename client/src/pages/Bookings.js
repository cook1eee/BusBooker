import React, { useEffect, useState, useRef } from "react";
import { Table, Modal, message } from "antd";
import PageTitle from "../components/PageTitle";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import { useReactToPrint } from "react-to-print";

function Bookings() {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-user-id",
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

  const columns = [
    {
      title: "Bus",
      dataIndex: ["bus", "name"],
      key: "bus",
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
      render: (text, record) => (
        <div>
          <h1
            className="text-md underline"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print
          </h1>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="d-flex justify-content-between mb-4 mt-3">
        <PageTitle title="Bookings" />
      </div>

      <Table columns={columns} dataSource={bookings} />

      {showPrintModal && (
        <Modal
          title="Booking Detail"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          open={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <hr />
          <div className="d-flex flex-column mt-3 p-5" ref={componentRef}>
            <div className="col">
              <span className="text-muted">Bus: </span>{" "}
              {selectedBooking.bus.name}
            </div>
            <div className="row mt-3 ">
              <div className="col mb-1">
                <span className="text-muted">From: </span>{" "}
                {selectedBooking.bus.from}
              </div>
              <div className="col mb-1">
                <span className="text-muted">From: </span>{" "}
                {selectedBooking.bus.to}
              </div>
            </div>

            <hr />

            <p className="mb-1">
              <span className="text-muted">TravelDate: </span>{" "}
              {selectedBooking.bus.travelDate}
            </p>

            <p className="mb-1">
              <span className="text-muted">Departure Time: </span>{" "}
              {selectedBooking.bus.departure}
            </p>

            <p className="mb-1">
              <span className="text-muted">Arrival Time: </span>{" "}
              {selectedBooking.bus.arrival}
            </p>

            <hr />

            <p className="mb-1">
              <span className="text-muted">Seats: </span> <br />
              {selectedBooking.seats.join(", ")}
            </p>

            <hr />

            <p className="mb-1">
              <span className="text-muted ">Total Amount: </span> $
              {selectedBooking.bus.price * selectedBooking.seats.length}
            </p>
          </div>

        </Modal>
      )}
    </div>
  );
}

export default Bookings;
