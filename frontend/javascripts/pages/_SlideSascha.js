import React from 'react';
import Slide from '../components/_Slide';
import ShowUser from './_ShowUser';

export default class SlideSascha extends Slide {
  constructor(props) {
    super(props);

    this.prevUrl = "/frontend/slides/martin";
    this.nextUrl = "/";
  }

  render() {
    return (
      <ShowUser params={{ id: "4396da2e74980" }}/>
    );
  }
}
