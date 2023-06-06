import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { message, Row, Col } from "antd";
import Bus from "../components/Bus";
import axios from "axios";


function Home() {
  const dispatch = useDispatch();
  const [filters = {}, setFilters] = useState({});
  const [buses, setBuses] = useState([]);
  const { user } = useSelector((state) => state.users);

  const getBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(ShowLoading());

      const response = await axios.post(
        "/api/buses/get-all-buses",
        { filters: tempFilters },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());

      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div className="row mt-3">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-12">
            <input
              type="text"
              className="form-control search-slt"
              placeholder="From"
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <input
              type="text"
              className="form-control search-slt"
              placeholder="To"
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })}
            />
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <input
              type="date"
              className="form-control search-slt"
              placeholder="Travel Date"
              value={filters.travelDate}
              onChange={(e) =>
                setFilters({ ...filters, travelDate: e.target.value })
              }
            />
          </div>

          <div className="col-lg-3 col-md-3 col-sm-12 d-flex align-items-center justify-content-start mb-4">
            <button
              className="btn btn-info wrn-btn"
              onClick={() => getBuses()}
              style={{ marginRight: "10px" }}
            >
              Search
            </button>

            <button
              className="btn btn-secondary wrn-btn ml-2 "
              onClick={() =>
                setFilters({
                  from: "",
                  to: "",
                  travelDate: "",
                })
              }
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div>
        <Row gutter={[15, 15]}>
          {buses
            .filter((bus) => bus.status === "Yet To Start")
            .map((bus) => (
              <Col lg={12} xs={24} sm={24}>
                <Bus bus={bus} />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;

// {/* <div>
// <div className="my-3 card p-2">
//   <Row gutter={10}>
//     <Col lg={6} sm={24}>
//       <input
//         type="text"
//         placeholder="From"
//         value={filters.from}
//         onChange={(e) => setFilters({ ...filters, from: e.target.value })}
//       />
//     </Col>
//     <Col lg={6} sm={24}>
//       <input
//         type="text"
//         placeholder="To"
//         value={filters.to}
//         onChange={(e) => setFilters({ ...filters, to: e.target.value })}
//       />
//     </Col>
//     <Col lg={6} sm={24}>
//       <input
//         type="date"
//         placeholder="Date"
//         value={filters.travelDate}
//         onChange={(e) =>
//           setFilters({ ...filters, travelDate: e.target.value })
//         }
//       />
//     </Col>

//     <Col lg={6} sm={24}>
//       <button className="btn btn-primary" onClick={() => getBuses()}>
//         Filter
//       </button>
//     </Col>
//   </Row>
// </div>

// <div>
//   <Row gutter={[15, 15]}>
//     {buses
//       .filter((bus) => bus.status === "Yet To Start")
//       .map((bus) => (
//         <Col lg={12} xs={24} sm={24}>
//           <Bus bus={bus} />
//         </Col>
//       ))}
//   </Row>
// </div>
// </div>   */}
