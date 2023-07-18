import React from "react";
import Container from 'react-bootstrap/Container'
import HTMLFlipBook from "react-pageflip";
import Card from 'react-bootstrap/Card'
import '../styles/hero.css'
import lilBear from '../images/animals/lil-cutie.png'

export default function MyBook() {
  const numPages = 20; // Update this number to match the actual number of pages

  const generatePageClass = (pageNumber) => {
    return `page${pageNumber}`;
  };

  const generatePageContent = (pageNumber) => {
    switch (pageNumber) {
      case 1:
        return (
          <div className="page-content">
            <h1>Organic Pajamas for the Family</h1>
            <p>Treat this like a book and swipe or click the corners to turn the page</p>
            {/* Add unique content */}
            <p></p>
            <a href="https://www.w3schools.com/css/css_padding.asp">Or go Straight to All Products</a>
          </div>
        );
      case 2:
        return (
          <div className="">
            <h1>Stars And Moon Collection</h1>
            <p>Shop this Pattern</p>
            <p>Click the bear to see details:</p>
            {/* adding little bear cartoon that can be clicked on and redirected */}
            <a href="https://codingbeautydev.com" target="_blank" rel="noreferrer" className="image-link">
              <img src={lilBear} alt="cartoon bear" className="image" />
            </a>
            
            
       
          </div>
        );
      // Add cases for other pages with their respective content

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
        <div className="App">
          <span>
            <div className="flipbook-container">
              <HTMLFlipBook width={200} height={200} size="stretch">
                {[...Array(numPages)].map((_, index) => (
                  <div className={`${generatePageClass(index + 1)} DemoPage`} key={index}>
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
