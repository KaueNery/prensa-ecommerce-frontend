import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import CategoryList from "../components/category/CategoryList";
import Slider from "../components/home/ImageSlider"
// import video from "../images/video.mp4";

const Home = () => {

  return (
    <>
      <br/>
     
      
      <div className="container-fluid" >
        <div className="row">

          <Slider/>

       </div>
     
    </div>
      <br/>
      <NewArrivals />
      <CategoryList />
      <br/>
      <br/>
    </>
  );
};
  
export default Home;
   