import { Card } from "react-bootstrap";
import "../../css/home.css";
import React from "react";
import data from "../../Json_date/date.json";
import  LazyLoadImg  from "../tools/lazyLoad/LazyLoadImg";



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
                <LazyLoadImg
                  type="category"
                  img={record.path}
                  width="500"
                  height="190"
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