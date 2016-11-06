import React from 'react';
import Slide from '../components/_Slide';
import ShowUser from './_ShowUser';

export default class SlideMartin extends Slide {
  constructor(props) {
    super(props);

    this.prevUrl = "/";
    this.nextUrl = "/frontend/slides/sascha";
  }

  render() {
    return (
      <ShowUser params={{ id: "4386da2e74980" }}/>
    );
  }
}
