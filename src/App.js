import React, { Component } from 'react'
import Slider from 'react-input-slider'
import { Stage, Layer, Text, Image, Transformer } from 'react-konva'
import useImage from 'use-image'

import TombstoneImage from './tombstone.png' 
import TourLogo from './trinityofterrorlogo.png'
import PictureBackground from './picturebackground.jpg'

// Load image
const Tombstone = () => {
  const [image] = useImage(PictureBackground)
  return <Image image={image} width={600} height={784.5} />
}

class ImageEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "hello",
      textSize: 32
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTextSizeChange = this.handleTextSizeChange.bind(this)
    this.saveImageAs = this.saveImageAs.bind(this)
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value })
  }

  handleTextSizeChange(event) {
    console.log(event.x)
    this.setState({ textSize: event.x })
  }

  saveImageAs() {
    const canvas = document.getElementsByTagName('canvas')
    console.log(canvas)
    console.log("Save the image")
    const a = document.createElement('a');
    a.download = 'download.png';
    a.href = canvas[0].toDataURL('image/png');
    a.click();
  }

  render() {
    return (<>
    <div class="header">
      <img class="tour-logo" src={TourLogo} />
    </div>
    <div class="main-content-wrapper">
      <div class='konva-wrapper'>
      <Stage width={600} height={784.5}>
        <Layer>
        <Tombstone />
        <Text draggable fontFamily='Hulk' fontSize={this.state.textSize} text={this.state.text} fill='red' x={460} y={400} />
        </Layer>
      </Stage>
      </div>
      <div class='image-editor-wrapper'>
        <div class="image-editor-field-wrapper">
          <label>Your Name</label>
          <input type="text" value={this.state.text} onChange={this.handleTextChange}></input>
        </div>
        <div class="image-editor-field-wrapper">
          <label>Font Size</label>
          <Slider axis="x" x={this.state.textSize} onChange={this.handleTextSizeChange} 
            styles={{
              track: {
                backgroundColor: 'black',
                borderColor: 'red',
                borderWidth: '2'
              },
              active: {
                backgroundColor: 'red'
              }
            }} 
          />
        </div>
        <div class="image-editor-field-wrapper">
          <button onClick={this.saveImageAs}>Save Image</button>
        </div>
      </div>
    </div>
    </>)
  }
}

function App() {
  return (
    <div className="App">
      <ImageEditor />
    </div>
  );
}

export default App;
