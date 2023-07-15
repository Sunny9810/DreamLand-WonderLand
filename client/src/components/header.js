
import React, { useEffect, useState } from 'react';
import 'App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

const MyComponent = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    // Javascript logic here
    const rc = document.getElementById('rotateChars');
    const text = rc.innerText.trim();
    const len = text.length;
    const grp = len / 2;
    let html = "";
    while (len > -1) {
      const txt = text.charAt(len);
      html = `<span style="animation-delay:${len / grp}s" class="indChar ${txt.trim() === "" ? "" : "d-inline-block"} ">${txt}</span>${html}`;
      len--;
    }
    rc.innerHTML = html;

    const wik = document.getElementById('wik');
    const navLinks = document.getElementsByClassName('nav-link');
    for (const n of navLinks) {
      n.addEventListener('mouseover', () => {
        if (audioEnabled) {
          wik.currentTime = 0;
          wik.play();
        }
      });
    }

    const enableMusic = () => {
      const myAudio = document.getElementById('myAudio');
      myAudio.volume = 0.5;
      myAudio.play();
      setAudioEnabled(true);
      document.getElementById('mouse').style.animationPlayState = "paused";
      window.removeEventListener('click', enableMusic);
    };

    window.addEventListener('click', enableMusic);

    // Clean up event listeners when the component unmounts
    return () => {
      for (const n of navLinks) {
        n.removeEventListener('mouseover', () => {
          if (audioEnabled) {
            wik.currentTime = 0;
            wik.play();
          }
        });
      }
      window.removeEventListener('click', enableMusic);
    };
  }, [audioEnabled]);


  return (
    <div className="text-dark text-center bg-dark vh-100 d-flex flex-column">
      <div className="my-auto">
        <h1 className="display-1" id="rotateChars">
          DREAMLAND WONDERLAND
        </h1>
        <p>A SLOGAN GOES HERE</p>
      </div>
      <div className="">
        <div className="mb-5 text-center">
          <div><img src="/static_files/svgs/mouse.svg" id="mouse" alt="" height="42" /></div>
          <div className="mt-3 text-uppercase"><small className="text-secondary">Click &amp; Turn up the Volume</small></div>
        </div>
        <div className="col-md-8 mx-auto">
          <div className="d-flex justify-content-evenly align-items-center mb-5" id="bottomNav">
            <div className="nav-item"><a className="nav-link" href="#">HOME</a></div>
            <div className="nav-item"><a className="nav-link" href="#">Baby</a></div>
            <div className="nav-item"><a className="nav-link" href="#">Kids</a></div>
            <div className="nav-item"><a className="nav-link" href="#">Adults</a></div>
            <div className="nav-item"><a className="nav-link" href="#">CONTACT</a></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
