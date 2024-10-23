// import Header from "../components/Header";
// import { Button } from "antd/es/radio";
import BackgroundImage from "../components/MainBackground";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";
import Cards from "../components/Cards";

function Home() {
  return (
    <>
      <BackgroundImage />
      <br />
      <br />
      <div>
        <h1 className="font-bold text-center text-4x text-teal-500	mt-5">
          Browse The Range
        </h1>
        <div className="font-bold text-center text-mdtext text-teal-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <Hero />
      </div>
      <h1 className="font-bold text-center text-5xl text-teal-500	">
        Our Products
      </h1>
       <Cards/>
      <div>
        <div className="font-bold text-center text-md text-teal-500">
          Share Your setup with
        </div>
        <h1 className="font-bold text-center text-4xl text-teal-500	mb-5  ">
          #CHAMPIONS
        </h1>
        <Gallery />
      </div>
      <br />
      <Footer />
    </>
  );
}

export default Home;
