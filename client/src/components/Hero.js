import React from "react";
import Container from 'react-bootstrap/Container'



import HTMLFlipBook from "react-pageflip";

export default function MyBook() {
  return (
    <Container>
    <div className="App">
      <span>
        <div className="">
          <HTMLFlipBook width={200} height={500} size="stretch">
            <div className="page1">
              <h1>Jammies</h1>
              <p>Organic Jammies</p>
              {/* Add a link */}
              <a href="https://rosebudsara.com">shameless self promotion while we figure out linking pages from here LOL</a>
              
            </div>
            <div className="page1">
              <h1>More Jammies</h1>
              <p>My Jammies</p>
            </div>
            <div className="page1">
              <h1>Jammies Jammies all day long</h1>
              <p>More Jammies for family jammies</p>
              {/* image  */}
            </div>
            <div className="page1">
              <h1>My excellent fourth article</h1>
              <p>My excellent fourth content</p>
            </div>
            <div className="page1">
              <h1>Page Flippiee</h1>
              <p>MFlippie Flip</p>
            </div>
          </HTMLFlipBook>
        </div>
      </span>
    </div>
    </Container>
  );
}
