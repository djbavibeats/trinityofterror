import React, { Component } from 'react'
import Slider from 'react-input-slider'
import { Stage, Layer, Text, Image } from 'react-konva'
import useImage from 'use-image'

import TourLogo from './trinityofterrorlogo.png'
import PictureBackground from './picturebackground.jpg'

// Load image
// const Tombstone = () => {
//   const [image] = useImage(PictureBackground)
//   if (window.innerWidth <= 767) {
//     return <Image alt="background" image={image} width={300} height={392.25} />
//   } else {
//     return <Image alt="background" image={image} width={600} height={784.5} />
//   }
// }

class URLImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    this.setState({
      image: this.image
    });
  };
  render() {
    return (
      <Image
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

class ImageEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "name",
      textSize: 32,
      imageUrl: 'https://' + window.location.host + '/picturebackground.jpg'
    }


    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTextSizeChange = this.handleTextSizeChange.bind(this)
    this.saveImageAs = this.saveImageAs.bind(this)
    this.handlePictureChange = this.handlePictureChange.bind(this)
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value })
  }

  handleTextSizeChange(event) {
    console.log(event.x)
    this.setState({ textSize: event.x })
  }

  handlePictureChange(image) {
    console.log(image)
  }

  saveImageAs() {
    const canvas = document.getElementsByTagName('canvas')
    console.log(canvas)
    console.log("Save the image")
    const a = document.createElement('a');
    a.download = 'downloaad.png';
    a.href = canvas[0].toDataURL('image/png');
    a.target = "_blank";
    a.rel="noopener noreferrer";
    a.click();
    // alert(a)
  }

  render() {
    let stageWidth = 0;
    let stageHeight = 0;
    let textX = 0;
    let textY = 0;
    if (window.innerWidth <= 767) {
      stageWidth = 300;
      stageHeight = 392.25;
      textX = 100;
      textY = 300;
    } else {
      stageWidth = 600;
      stageHeight = 784.5
      textX = 400;
      textY = 460;
    }

    return (<>
    <div className="header">
      <img className="tour-logo" alt="tour-logo" src={TourLogo} />
    </div>
    <div className="main-content-wrapper">
      <div className='konva-wrapper'>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
        {/* <Tombstone /> */}
        <URLImage src={this.state.imageUrl} width={stageWidth} height={stageHeight} />
        <Text draggable fontFamily='Hulk' fontSize={this.state.textSize} text={this.state.text} fill='red' x={textX} y={textY} />
        </Layer>
      </Stage>
      </div>
      <div className='image-editor-wrapper'>
        <div className="image-editor-field-wrapper guest-buttons-label">
            <label>Number of Guests</label>
        </div>
        <div className="image-editor-field-wrapper guest-buttons">
          <button onClick={() => this.handlePictureChange('one')}>One</button>
          <button onClick={() => this.handlePictureChange('two')}>Two</button>
          <button onClick={() => this.handlePictureChange('three')}>Three</button>
        </div>
        <div className="image-editor-field-wrapper">
          <label>Your Name</label>
          <input type="text" value={this.state.text} onChange={this.handleTextChange}></input>
        </div>
        <div className="image-editor-field-wrapper">
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
        <div className="image-editor-field-wrapper">
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
