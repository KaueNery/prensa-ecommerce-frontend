import React from 'react';
import { Fade } from 'react-slideshow-image';
import Img1 from "../../images/IMG_1.jpg";
import Img2 from "../../images/IMG_2.jpg";
import Img3 from "../../images/IMG_3.jpg";
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  {
  url: Img1,
  caption: 'First Slide'
  },
  {
  url: Img2,
  caption: 'Second Slide'
  },
  {
  url: Img3,
  caption: 'Third Slide'
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div className="each-fade" key={index}>
            <div className="image-container">
              <img src={fadeImage.url} style={{
                objectFit: "cover",
                height: "5%",
                width: "100%"
              }} />
            </div>
         
          </div>
        ))}
      </Fade>
    </div>
  )
}

export default Slideshow;