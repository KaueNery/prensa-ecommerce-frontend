import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import CategoryList from "../components/category/CategoryList";
// import video from "../images/video.mp4";

const Home = () => {

  return (
    <>
      <br/>
     
      
      <div className="container-fluid" >
        <div className="row">
        {/* <video loop autoPlay>
            <source
              src={video}
              type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>  */}
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
   