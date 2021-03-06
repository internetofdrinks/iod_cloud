import React from 'react';
import Slide from '../components/_Slide';

export default class SlideOverview extends Slide {
  constructor(props) {
    super(props);

    this.state = {
      breathalyzer: ["slide__bubble", "slide__bubble--breathalyzer", "slide__bubble--centered", 'slide__bubble--zoomed'],
      cloud: ["slide__bubble", "slide__bubble--cloud", 'slide__bubble--zoomed', "invisible"],
      cloud_breathalyzer: ["slide__arrow", 'slide__arrow--cloud-breathalyzer', 'invisible'],
      beer_dispenser: ["slide__bubble", "slide__bubble--beer-dispenser", 'slide__bubble--zoomed', "invisible"],
      cloud_beer_dispenser: ["slide__arrow", 'slide__arrow--cloud-beer-dispenser', 'invisible'],
      nextStep: 0
    };

    this.steps = [
      { remove: ['cloud.invisible', 'breathalyzer.slide__bubble--centered', 'breathalyzer.slide__bubble--zoomed'] },
      { remove: ['cloud.slide__bubble--zoomed', 'cloud_breathalyzer.invisible'] },
      { remove: ['beer_dispenser.invisible', 'cloud_beer_dispenser.invisible'] },
      { remove: ['beer_dispenser.slide__bubble--zoomed'] }
    ];

    this.prevUrl = "/frontend/slides";
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--12-col shadow-container slide">
        <div className={this.state.breathalyzer.join(' ')}>
          <img src="/public/images/breathalyzer.png" />
          <h2 className="slide__stamp">BREATHALYZER</h2>
        </div>
        <div className={this.state.cloud.join(' ')}>
          <img src="/public/images/IoD-cloud.png" />
        </div>
        <div className={this.state.cloud_breathalyzer.join(' ')}>
          <div className="slide__arrow__head"></div>
          <div className="slide__arrow__track"></div>
          <div className="slide__arrow__head"></div>
        </div>

        <div className={this.state.beer_dispenser.join(' ')}>
          <img src="/public/images/beer-dispenser.png" />
          <h2 className="slide__stamp">BEER DISPENSER</h2>
        </div>
        <div className={this.state.cloud_beer_dispenser.join(' ')}>
          <div className="slide__arrow__head"></div>
          <div className="slide__arrow__track"></div>
          <div className="slide__arrow__head"></div>
        </div>
      </div>
    );
  }
}
