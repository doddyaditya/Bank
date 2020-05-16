import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Title.css";

/**
 * Merupakan class yang menampilkan tampilan halaman utama
 */
const Title = () => {
  return (
    <React.Fragment>
      <NavigationBar/>
      <div className="wrapper">
        <div className="column">
          <div className="title-container__title">
            <h1>Your one and only ENGIMA Payment Solution</h1>
            <p>BANK PRO</p>
            <h3>-----------------------------------------------</h3>
            <h4>Though you have to login first</h4>
            <h5>login dammit! (or click help if you&apos;re braindead)</h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Title;
