import React from 'react';
import Slide from '../components/_Slide';

export default class SlideIntro extends Slide {
  constructor(props) {
    super(props);

    this.state = {
      logo: ['slide__bubble', 'slide__bubble--centered', 'slide__bubble--intro-logo'],
      pic1: ["slide__bubble", "slide__bubble--drunk-pic", "slide__bubble--drunk-pic1", "invisible"],
      pic2: ["slide__bubble", "slide__bubble--drunk-pic", "slide__bubble--drunk-pic2", "invisible"],
      pic3: ["slide__bubble", "slide__bubble--drunk-pic", "slide__bubble--drunk-pic3", "invisible"],
      nextStep: 0
    };

    this.steps = [
      { remove: ['pic1.invisible'] },
      { remove: ['pic2.invisible'] },
      { remove: ['pic3.invisible'] },
      { add: ['logo.slide__bubble--intro-logo--ontop'] }
    ];

    this.nextUrl = "/";
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col shadow-container slide">
        <div className={this.state.logo.join(' ')}>
          <img src="/public/images/iod-logo.png" />
        </div>

        <div className={this.state.pic1.join(' ')}>
          <img src="/public/images/drunk-pics-1.jpg" />
        </div>
        <div className={this.state.pic2.join(' ')}>
          <img src="/public/images/drunk-pics-2.jpg" />
        </div>
        <div className={this.state.pic3.join(' ')}>
          <img src="/public/images/drunk-pics-3.jpg" />
        </div>
      </div>
    );
  }
}
