import React,{useContext} from 'react';
import './slider.css'
import { UserContext } from '../../contexts/UserContext';
const Slider = () => {
  const [user,setUser]=useContext(UserContext);
  const verify = () => {
      if(user.logged){
      if(user.User_info.userdetails.varified_user)
      {
          return
      }else{
      return (
          <div class="alert alert-danger" role="alert">
    You Will not be able to send request until your email is verified
  </div>
      )}}
  }
    return(
    <div id="slider">
          {
        verify()
    }
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="/images/slider/1.jpg" alt="First slide" id='slider_img'/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/images/slider/2.jpg" alt="Second slide" id='slider_img'/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="/images/slider/3.jpg" alt="Third slide" id='slider_img'/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
        {/* <div id='slog'>
            <h1>BookBhandar</h1>
            <h2>A books your read now turn to share with others</h2>
            <h3>Makin Booksharing easy for college students</h3>
        </div>
         <h1>Book Bhandar</h1>
        <h2>Sharebooks Spread happiness </h2> 
    <img alt='Slider' src={slider} classNameName='slider_img'></img> */}
    </div>)
    
}
export default Slider;