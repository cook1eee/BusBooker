import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="card p-2">
      <h1 className="text-lg mt-2" style={{ color: "#34cfbc" }}>
        {bus.name}
      </h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div className="mb-1">
          <p className="text-sm">From</p>
          <p className="text-sm">{bus.from}</p>
        </div>
        <div className="mb-1">
          <p className="text-sm">To</p>
          <p className="text-sm">{bus.to}</p>
        </div>

        <div className="mb-1">
          <p className="text-sm">Price</p>
          <p className="text-sm">${bus.price} /-</p>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-between align-items-end">
        <div className="mb-2">
          <p className="text-sm">Travel Date</p>
          <p className="text-sm">{bus.travelDate}</p>
        </div>
        <div>
          <p
            className="text-lg underline"
            onClick={() => {
              navigate(`/book-now/${bus._id}`);
            }}
            style={{ color: "#316e41" }}
          >
            Book Now
          </p>
        </div>
      </div>
    </div>
  );
}

export default Bus;
