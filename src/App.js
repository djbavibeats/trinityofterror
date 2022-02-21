import React, { Component } from 'react'
import Slider from 'react-input-slider'
import { Stage, Layer, Text, Image } from 'react-konva'
// import useImage from 'use-image'

import TourLogo from './trinityofterrorlogo.png'
// import PictureBackground from './picturebackground.jpg'

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
      textOne: "",
      textOneSize: 15,
      textOneShow: true,
      textTwo: "",
      textTwoSize: 15,
      textTwoShow: false,
      textThree: "",
      textThreeSize: 15,
      textThreeShow: false,
      imageUrl: 'http://' + window.location.host + '/one.jpg',
      selectedShapeName: ""
    }


    this.handleTextOneChange = this.handleTextOneChange.bind(this)
    this.handleTextOneSizeChange = this.handleTextOneSizeChange.bind(this)

    this.handleTextTwoChange = this.handleTextTwoChange.bind(this)
    this.handleTextTwoSizeChange = this.handleTextTwoSizeChange.bind(this)

    this.handleTextThreeChange = this.handleTextThreeChange.bind(this)
    this.handleTextThreeSizeChange = this.handleTextThreeSizeChange.bind(this)

    this.saveImageAs = this.saveImageAs.bind(this)
    this.handlePictureChange = this.handlePictureChange.bind(this)
  }

  handleTextOneChange(event) {
    this.setState({ textOne: event.target.value })
  }

  handleTextOneSizeChange(event) {
    this.setState({ textOneSize: event.x })
  }

  handleTextTwoChange(event) {
    this.setState({ textTwo: event.target.value })
  }

  handleTextTwoSizeChange(event) {
    this.setState({ textTwoSize: event.x })
  }

  handleTextThreeChange(event) {
    this.setState({ textThree: event.target.value })
  }

  handleTextThreeSizeChange(event) {
    this.setState({ textThreeSize: event.x })
  }

  handlePictureChange(image) {
    console.log(image)
    switch (image) {
      case ('one'):
        this.setState({ imageUrl: 'http://' + window.location.host + '/one.jpg',
        textOneShow: true,
        textTwoShow: false,
        textThreeShow: false
        })
        break;
      case ('two'):
        this.setState({ 
          imageUrl: 'http://' + window.location.host + '/two.jpg',
          textOneShow: false,
          textTwoShow: true,
          textThreeShow: true
        })
        break;
      case ('three'):
        this.setState({ imageUrl: 'http://' + window.location.host + '/three.jpg',
        textOneShow: true,
        textTwoShow: true,
        textThreeShow: true })
        break;
      default:
        this.setState({ imageUrl: 'http://' + window.location.host + '/one.jpg' })
    }
  }

  saveImageAs() {
    const canvas = document.getElementsByTagName('canvas')
   
    var img = canvas[0].toDataURL();
    var blob = dataURItoBlob(img);
    console.log(blob)
    let file = [new File([blob], "filename.png", {type: "image/png"})];
    console.log(file)
    if (navigator.share && navigator.canShare({ files: file })) {
      navigator.share({
        title: 'Trinity of Terror Tour',
        text: `I'm going to the Trinity of Terror Tour!`,
        files: file
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }

    function dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);
      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      console.log(mimeString)
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {type:mimeString});
      }
  }

  render() {
    let stageWidth = 0;
    let stageHeight = 0;
    let textOneX = 0;
    let textOneY = 0;
    let textTwoX = 0;
    let textTwoY = 0;
    let textThreeX = 0;
    let textThreeY = 0;
    if (window.innerWidth <= 767) {
      stageWidth = 300;
      stageHeight = 392.25;
      textOneX = 125;
      textOneY = 210;
      textTwoX = 40;
      textTwoY = 210;
      textThreeX = 210;
      textThreeY = 200;
    } else {
      stageWidth = 600;
      stageHeight = 784.5
      textOneX = 400;
      textOneY = 460;
    }

    return (<>
    <div className="header">
      <img className="tour-logo" alt="tour-logo" src={TourLogo} />
    </div>
    <div className="main-content-wrapper" id="main-content-wrapper">
      <div className='konva-wrapper'>
      <Stage width={stageWidth} height={stageHeight} onTouchStart={this.handleStageMouseDown} onMouseDown={this.handleStageMouseDown}>
        <Layer>
        {/* <Tombstone /> */}
        <URLImage src={this.state.imageUrl} width={stageWidth} height={stageHeight} />
          <Text visible={this.state.textOneShow} draggable name="text" fontFamily='RockSalt' fontSize={this.state.textOneSize} text={this.state.textOne} fill='red' x={textOneX} y={textOneY} />
          <Text visible={this.state.textTwoShow} draggable name="text" fontFamily='RockSalt' fontSize={this.state.textTwoSize} text={this.state.textTwo} fill='red' x={textTwoX} y={textTwoY} />
          <Text visible={this.state.textThreeShow} draggable name="text" fontFamily='RockSalt' fontSize={this.state.textThreeSize} text={this.state.textThree} fill='red' x={textThreeX} y={textThreeY} />
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
        {/* TEXT ONE */}
        <div className="image-editor-field-wrapper">
          <label>Name One</label>
          <input type="text" value={this.state.textOne} onChange={this.handleTextOneChange}></input>
        </div>

        <div className="image-editor-field-wrapper">
          <label>Font Size One</label>
          <Slider axis="x" x={this.state.textOneSize} onChange={this.handleTextOneSizeChange} 
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

        {/* TEXT TWO */}
        <div className="image-editor-field-wrapper">
          <label>Name Two</label>
          <input type="text" value={this.state.textTwo} onChange={this.handleTextTwoChange}></input>
        </div>

        <div className="image-editor-field-wrapper">
          <label>Font Size Two</label>
          <Slider axis="x" x={this.state.textTwoSize} onChange={this.handleTextTwoSizeChange} 
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

        {/* TEXT THREE */}
        <div className="image-editor-field-wrapper">
          <label>Name Three</label>
          <input type="text" value={this.state.textThree} onChange={this.handleTextThreeChange}></input>
        </div>

        <div className="image-editor-field-wrapper">
          <label>Font Size Three</label>
          <Slider axis="x" x={this.state.textThreeSize} onChange={this.handleTextThreeSizeChange} 
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
