import { Card } from "react-bootstrap";
import "../../css/home.css";
import React from "react";
import data from "../../Json_date/date.json";



//here component we take category from json file and show in Home Page
function Category() {


  return (
    <>
      <div className="categoryLook">
        {data.category1.map((record, i) => (
          <div key={i} className="choise">
            {/* can click to image or text and move to page what user choose */}
            <Card style={{ border: "none", background: "none" }}>
              <a href={record.link} aria-label={record.name}>
                <img
                  src={record.path}
                  alt={record.name}
                />
              </a>
              <div className="title">
                <a
                  style={{ textDecoration: "none" }}
                  href={record.link}
                  aria-label={record.name}
                >
                  {record.name}
                </a>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}


export default Category;