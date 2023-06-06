import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { message, Row, Col, Divider } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import StripeCheckout from "react-stripe-checkout";

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  const { user } = useSelector((state) => state.users);

  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
        transactionId: transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * bus.price * 100,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <div>
      {bus && (
        <div className="row">
          <div className="col-lg-8 col-xl-6">
            <div
              className="card border-top-bottom border-2"
              style={{
                borderTopColor: "#84fab0",
                borderBottomColor: "#84fab0",
                borderWidth: "3px",
                borderStyle: "solid",
              }}
            >
              <div className="w-100 card-body p-5">
                <p className="lead fw-bold mb-3" style={{ color: "#5edee0" }}>
                  Bus Detail
                </p>

                <hr />

                <div className="row">
                  <div className="col mb-3">
                    <p className="small text-muted mb-1">From</p>
                    <p>{bus.from}</p>
                  </div>
                  <div className="col mb-3">
                    <p className="small text-muted mb-1">To</p>
                    <p>{bus.to}</p>
                  </div>
                </div>

                <div className="w-100 py-4 bg-light">
                  <div className="row ">
                    <div className="col mb-3">
                      <p className="small text-muted mb-1">TravelDate</p>
                      <p>{bus.travelDate}</p>
                    </div>
                    <div className="col mb-3">
                      <p className="small text-muted mb-1">Price</p>
                      <p>${bus.price}</p>
                    </div>
                    <div className="row">
                      <div className="col mb-3">
                        <p className="small text-muted mb-1">Departure Time</p>
                        <p>{bus.departure}</p>
                      </div>
                      <div className="col mb-3">
                        <p className="small text-muted mb-1">Arrival Time</p>
                        <p>{bus.arrival}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className="small text-muted mb-1">Bus Type</p>
                        <p>{bus.type}</p>
                      </div>
                      <div className="col">
                        <p className="small text-muted mb-1">Seats Left</p>
                        <p>{bus.capacity - bus.seatsBooked.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <p
                  className="lead fw-bold mb-1 pb-2"
                  style={{ color: "#5edee0" }}
                >
                  Selected Seats
                </p>

                <div className="row">
                  <div className="col-lg-12 horizontal-timeline">
                    <p className="text-md" style={{ marginRight: "-8px" }}>
                      {selectedSeats.join(", ")}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="row my-4">
                  <p className="lead fw-bold mb-0" style={{ color: "#3f4747" }}>
                    Total : $ {bus.price * selectedSeats.length}
                  </p>
                </div>

                <div className="d-flex justify-content-end">
                  <StripeCheckout
                    billingAddress
                    token={onToken}
                    amount={bus.price * selectedSeats.length * 100}
                    stripeKey="pk_test_51NFMK5Gu0aot8lXx4p1GWTxMNBeHbUquttsQsOSSPR6oMHDotlkFJwa6XsjNOBfJmzqdX34EJ6dE3KLJmq1QeKlv00d0278kCD"
                  >
                    <button
                      type="button"
                      className="btn btn-light btn-lg"
                      disabled={selectedSeats.length === 0}
                      style={{
                        cursor:
                          selectedSeats.length === 0
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      Check Out
                    </button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BookNow;
