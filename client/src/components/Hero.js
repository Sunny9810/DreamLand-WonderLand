import React from "react";
import Container from 'react-bootstrap/Container'
import HTMLFlipBook from "react-pageflip";
import Card from 'react-bootstrap/Card'
import '../styles/hero.css'

export default function MyBook() {

    
    
  return (
   <Container>
    <Card>
    <div className="App">
      <span>
        <div className="flipbook-container">
          <HTMLFlipBook width={200} height={200} size="stretch"  >
            <div className="page1 DemoPage" >
              <h1>Jammies</h1>
              <p>Organic Jammies page1</p>
              {/* Add a link */}
              <a href="https://rosebudsara.com">shameless self promotion while we figure out linking pages from here LOL</a>
              
            </div>
            <div className="page2 ">
              <h1>More Jammies</h1>
              <p>page 2 My Jammies</p>
            </div>
            <div className="page3">
              <h1>Jammies Jammies all day long</h1>
              <p>page 3More Jammies for family jammies</p>
              {/* image  */}
            </div>
            <div className="page4">
              <h1>Jammiese</h1>
              <p>pagefour</p>
            </div>
            <div className="page5">
              <h1>Page Flippiee</h1>
              <p>Flippie Flip 5</p>
            </div>
            <div className="page6">
              <h1>Jammiese</h1>
              <p> 6 products will go on these pages then there will be another product inventory page when you scroll down</p>
            </div>
            <div className="page7">
              <h1>Page Flippiee</h1>
              <p>7 Flippie Flip</p>
            </div>
            <div className="page8">
              <h1>Page Flippiee</h1>
              <p>7 Flippie Flip</p>
            </div>
          </HTMLFlipBook>
        </div>
      </span>
    </div>

    </Card>

    </Container>
  
  );
}
