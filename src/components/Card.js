import React from "react";

function Card() {
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src="https://img.freepik.com/free-photo/chicken-skewers-with-slices-apples-chili_2829-19992.jpg?w=2000&t=st=1693207592~exp=1693208192~hmac=9970fc2da923fdf916611369c5bae1d9978957e361ac7b04fbe228428c7f737a"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is some important text.</p>
          <div className="container w-100">
            <select className="m-2 h-100 bg-success rounded">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100 bg-success rounded">
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>
            <div className="d-inline h-100 fs-5">Total Price</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
