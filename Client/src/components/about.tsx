import '../css/about.css';
import Josep from '../assets/authors-pics/josep.jpg'
import Marija from '../assets/authors-pics/marija.jpg'
import Jacky from '../assets/authors-pics/jacky.jpg'
import Issac from '../assets/authors-pics/isaac.jpg'
import Vadim from '../assets/authors-pics/vadim.jpg'

function About() {
  return (
    <div className='about-wrapper'>
      <div className='about-text'>
        <h3>Our goal was to provide easy-to-understand learning experience that will help you to finally comprehend sorting and path finding algorithms.</h3>
        <h3>We tried to use all of the different algorithms in the game we created, so that it is more exciting for the user.</h3>
      </div>

      <div className='authors'>
        <a href='https://github.com/josepabellana' target="_blank"><img src={Josep}/></a>
        <a href='https://github.com/MarijaVitkauskaite' target="_blank"><img src={Marija}/></a>
        <a href='https://github.com/majilaii' target="_blank"><img src={Jacky}/></a>
        <a href='https://github.com/IP1llar' target="_blank"><img src={Issac}/></a>
        <a href='https://github.com/vadim-nest' target="_blank"><img src={Vadim}/></a>
      </div>
    </div>
  );
}

export default About;