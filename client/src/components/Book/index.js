import React from "react";
import Container from 'react-bootstrap/Container'
import HTMLFlipBook from "react-pageflip";
import Card from 'react-bootstrap/Card'
import lilBear from '../../images/animals/lil-cutie.png'

import './hero.css'




export default function MyBook() {
  const numPages = 20; // Update this number to match the actual number of pages

 
  const PageCover = React.forwardRef((props, ref) => {
    return (
      <div className="page page-cover" ref={ref} data-density="hard">
        <div>
          <h2>{props.children}</h2>
        </div>
      </div>
    );
  });

  const generatePageClass = (pageNumber) => {
    return `page${pageNumber}`;
  };

  const generatePageContent = (pageNumber) => {
    const targetFunction = (e) => {
      // console.log('TARGET', e.target);
      generatePageContent(3);
    }
    switch (pageNumber) {
      case 1:
        return (
          <div className="page-content container">
            <h1>Organic Pajamas for the Family</h1>
            <p>Treat this like a book and swipe or click the corners to turn the page</p>
            {/* Add unique content */}
            <p><a href="https://www.w3schools.com/css/css_padding.asp" >Or go Straight to All Products</a></p>
            
          </div>
        );
      case 2:
        return (
          <Container>
          <div className="page-content" onClick={targetFunction}>
            <h1>Stars And Moon Collection</h1>
            <p>Shop this Pattern</p>
            <p>Click the bear to see details:
            {/* adding little bear cartoon that can be clicked on and redirected */}
            <a href="https://codingbeautydev.com" target="_blank" rel="noreferrer" className="image-link">
              <img src={lilBear} alt="cartoon bear" className="image" />
            </a></p>

          </div>
          </Container>
        );
      // will add more cases for the other pages. 

      default:
        return (
          <div className="page-content">
            <h1>Jammies</h1>
            <p>Organic Jammies page {pageNumber}</p>
            {/* Add unique content */}
            <p>Default content for page {pageNumber}</p>
            <a href="https://www.w3schools.com/css/css_padding.asp">Default link for page {pageNumber}</a>
          </div>
        );
    }
  };

  return (
    <Container>
      <Card>
        <PageCover />
        <div className="App">
          <span>
            <div className="flipbook-container">
              <HTMLFlipBook width={300} height={300} size="stretch" mobileScrollSupport={true}
              showCover={true} autoSize={true}

               >
                {[...Array(numPages)].map((_, index) => (
                  <div className={`${generatePageClass(index + 1)}`} key={index}>
                    {generatePageContent(index + 1)}
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          </span>
        </div>
      </Card>
    </Container>
    
  );
}
