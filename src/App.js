import React, { Component } from 'react'
// import Slider from 'react-input-slider'
import { Stage, Layer, Text, Image, Transformer, Group } from 'react-konva'
// import { PinchGesture, DragGesture } from '@use-gesture/vanilla'
// import { useSpring, animated } from '@react-spring/web'

import Logo from './trinityofterrorlogo.png'
import OneOn from './one-on.png'
import OneOff from './one-off.png'
import TwoOn from './two-on.png'
import TwoOff from './two-off.png'
import ThreeOn from './three-on.png'
import ThreeOff from './three-off.png'

class InstructionsModal extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  hideModal() {
    document.getElementById('modal-wrapper').style.display = 'none'
  }

  render() {
      return (<>
      <div id="modal-wrapper" className="modal-wrapper">
        <div className="modal-content">
            <h2>THE TRINITY OF TERROR <br />TOUR IS UPON US</h2>
            <p>Carve your name on the tombstone and seal your fate.</p>
            <button onClick={() => { this.hideModal() }}>START</button>
          </div>
      </div>
      </>)
  }
}

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

class TransformerComponent extends Component {
  componentDidMount() {
    this.checkNode()
  }

  componentDidUpdate() {
    this.checkNode()
  }

  onTransformStart() {
    console.log('transform start')
    alert('Transforming')
  }

  onTransform() {
    console.log('transform')
  }

  onTransformEnd() {
    console.log('end transform')
  }

  checkNode() {
      // here we need to manually attach or detach Transformer node
      const stage = this.transformer.getStage();
      const { selectedShapeName } = this.props;
      var selectedNode = stage.findOne("." + selectedShapeName);

      this.transformer.enabledAnchors([
        'top-left', 'top-right', 'bottom-left', 'bottom-right'
      ])
      // console.log(selectedNode.textHeight)
      // console.log(selectedNode)
      // do nothing if selected node is already attached
      if (selectedNode === this.transformer.node()) {
        return;
      }
      if (selectedNode) {
        const type = selectedNode.getType();
        if ( type !== "Group") {
          selectedNode = selectedNode.findAncestor("Group");
        }
        // attach to another node
        this.transformer.attachTo(selectedNode);
      } else {
        // remove transformer
        this.transformer.detach();
      }

      this.transformer.getLayer().batchDraw();
    }

    render() {

      return (
        <Transformer
          ref={node => {
            this.transformer = node;
          }}
          transformstart={this.onTransformStart}
          transform={this.onTransform}
          transformend={this.onTransformEnd}
          rotateEnabled={false}
          anchorSize={40}
          anchorFill='rgba(0,0,0,0)'
          anchorStroke='rgba(0,0,0,0)'
          flipEnabled={false}
          borderStroke='#BC271D'
          padding={10}
        />
      );
    }
}

class ImageEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      textOne: "",
      textOneSize: 28,
      textOneShow: true,
      textTwo: "",
      textTwoSize: 28,
      textTwoShow: false,
      textThree: "",
      textThreeSize: 28,
      textThreeShow: false,
      imageUrl: 'https://' + window.location.host + '/one-grave.jpg',
      selectedShapeName: "",
      clawOneActive: true,
      clawTwoActive: false,
      clawThreeActive: false,
      textOneX: 110,
      textOneY: 195,
      textTwoX: 0,
      textTwoY: 0,
      textThreeX: 0,
      textThreeY: 0,
      contentToShow: 'imageEditor'
    }

    this.resetEditor = this.resetEditor.bind(this)

    this.handleTextOneChange = this.handleTextOneChange.bind(this)
    this.handleTextOneSizeChange = this.handleTextOneSizeChange.bind(this)

    this.handleTextTwoChange = this.handleTextTwoChange.bind(this)
    this.handleTextTwoSizeChange = this.handleTextTwoSizeChange.bind(this)

    this.handleTextThreeChange = this.handleTextThreeChange.bind(this)
    this.handleTextThreeSizeChange = this.handleTextThreeSizeChange.bind(this)

    this.saveImageAs = this.saveImageAs.bind(this)
    this.handlePictureChange = this.handlePictureChange.bind(this)
  }

  handleStageMouseDown = e => {
    // clicked on stage - cler selection
    
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ""
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    // const rect = this.state.rectangles.find(r => r.name === name);
    if (name) {
      console.log(e.target)
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ""
      });
    }
  }

  resetEditor() {
    this.setState({ contentToShow: 'imageEditor' })
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
    switch (image) {
      case ('one'):
        this.setState({ imageUrl: 'https://' + window.location.host + '/one-grave.jpg',
        textOneShow: true,
        textTwoShow: false,
        textThreeShow: false,
        clawOneActive: true,
        clawTwoActive: false,
        clawThreeActive: false,
        textOneX: 110,
        textOneY: 195,
        textTwoX: 0,
        textTwoY: 0,
        textThreeX: 0,
        textThreeY: 0
        })
        break;
      case ('two'):
        this.setState({ 
          imageUrl: 'https://' + window.location.host + '/two-graves.jpg',
          textOneShow: true,
          textTwoShow: true,
          textThreeShow: false,
          clawOneActive: false,
          clawTwoActive: true,
          clawThreeActive: false,
          textOneX: 50,
          textOneY: 200,
          textTwoX: 180,
          textTwoY: 190,
          textThreeX: 0,
          textThreeY: 0
        })
        break;
      case ('three'):
        this.setState({ imageUrl: 'https://' + window.location.host + '/three-graves.jpg',
          textOneShow: true,
          textTwoShow: true,
          textThreeShow: true,
          clawOneActive: false,
          clawTwoActive: false,
          clawThreeActive: true,
          textOneX: 35,
          textOneY: 200,
          textTwoX: 195,
          textTwoY: 205,
          textThreeX: 115,
          textThreeY: 195
        })
        break;
      default:
        this.setState({ imageUrl: 'https://' + window.location.host + '/one-grave.jpg' })
    }
  }

  saveImageAs() {
    const canvas = document.getElementsByTagName('canvas')
    var img = canvas[0].toDataURL();
    var blob = dataURItoBlob(img);
    let file = [new File([blob], "filename.png", {type: "image/png"})];

    if (navigator.share && navigator.canShare({ files: file })) {
      navigator.share({
        title: 'Trinity of Terror Tour',
        text: `I'm going to the Trinity of Terror Tour!`,
        files: file
      })
        .then(() => {
          this.setState({ contentToShow: 'listenButtons' })
        })
        .catch((error) => console.log(error));
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

  handleDrag(e) {
    console.log(e)
    e.target.attrs.width += 10
  }

  render() {

    let stageWidth = 0;
    let stageHeight = 0;
    if (window.innerWidth <= 767) {
      stageWidth = 264.6;
      stageHeight = 470.4;
    } else {
      stageWidth = 264.6;
      stageHeight = 470.4;
    }
    if (this.state.contentToShow === 'imageEditor') {
        return (<>
        <header className="header">
          <img className="tour-logo" alt="tour-logo" src={Logo} />
        </header>
        <div className="main-content-wrapper" id="main-content-wrapper">
          <div className='konva-wrapper'>
          <Stage width={stageWidth} height={stageHeight} onTouchStart={this.handleStageMouseDown} onMouseDown={this.handleStageMouseDown}>
            <Layer>
            {/* <Tombstone /> */}
              <URLImage src={this.state.imageUrl} width={stageWidth} height={stageHeight} />
              <Group visible={true} name="groupOne" draggable fill='red' height={10} width={150} x={this.state.textOneX} y={this.state.textOneY}>
                <Text visible={this.state.textOneShow} name="textOne" fontFamily='Awakening' fillEnabled={true} fillPatternImage={this.state.imageUrl} fontSize={this.state.textOneSize} text={this.state.textOne} fill='#111111'  />
              </Group>
              <Group visible={true} name="groupTwo" draggable fill='red' height={10} width={150} x={this.state.textTwoX} y={this.state.textTwoY}>
                <Text visible={this.state.textTwoShow} name="textTwo" fontFamily='Awakening' fontSize={this.state.textTwoSize} text={this.state.textTwo} fill='#111111' />
              </Group>
              <Group visible={true} name="groupThree"draggable fill='red' height={10} width={150} x={this.state.textThreeX} y={this.state.textThreeY}>
                <Text visible={this.state.textThreeShow} name="textThree" fontFamily='Awakening' fontSize={this.state.textThreeSize} text={this.state.textThree} fill='#111111' />
              </Group>
              <TransformerComponent
                selectedShapeName={this.state.selectedShapeName}
              />
            </Layer>
          </Stage>
          </div>
          <div className='image-editor-wrapper'>
            <h2 className='image-editor-heading'>THE TRINITY OF TERROR <br />TOUR IS UPON US</h2>
            <p className='image-editor-instructions'>Carve your name on the tombstone and seal your fate.</p>
            <div className="image-editor-field-wrapper guest-buttons-row">
                <div className="image-editor-field-wrapper guest-buttons">
                    <button onClick={() => this.handlePictureChange('one')}><img alt="claw-one" src={this.state.clawOneActive ? OneOn : OneOff} style={{ width: '80px' }} /></button>
                    <button onClick={() => this.handlePictureChange('two')}><img alt="claw-two" src={this.state.clawTwoActive ? TwoOn : TwoOff} style={{ width: '80px' }} /></button>
                    <button onClick={() => this.handlePictureChange('three')}><img alt="claw-three" src={this.state.clawThreeActive ? ThreeOn : ThreeOff} style={{ width: '80px' }} /></button>
                </div>
            </div>

            {/* TEXT ONE */}
            <div className="image-editor-field-wrapper">
              <input placeholder="Carve Your Name" type="text" value={this.state.textOne} onChange={this.handleTextOneChange}></input>
            </div>
    
            {/* <div className="image-editor-field-wrapper font-size">
              <Slider axis="x" x={this.state.textOneSize} onChange={this.handleTextOneSizeChange} 
                styles={{
                  track: {
                    backgroundColor: 'black',
                    borderColor: '#BC271D',
                    borderWidth: '2'
                  },
                  active: {
                    backgroundColor: '#BC271D'
                  }
                }} 
              />
            </div> */}
    
            {/* TEXT TWO */}
            <div style={{ display: this.state.textTwoShow ? 'block' : 'none' }}>
              <div className="image-editor-field-wrapper">
                <input placeholder="Friend Two" type="text" value={this.state.textTwo} onChange={this.handleTextTwoChange}></input>
              </div>
    
              {/* <div className="image-editor-field-wrapper font-size">
                <Slider axis="x" x={this.state.textTwoSize} onChange={this.handleTextTwoSizeChange} 
                  styles={{
                    track: {
                      backgroundColor: 'black',
                      borderColor: '#BC271D',
                      borderWidth: '2'
                    },
                    active: {
                      backgroundColor: '#BC271D'
                    }
                  }} 
                />
              </div> */}
            </div>
    
            {/* TEXT THREE */}
            <div style={{ display: this.state.textThreeShow ? 'block' : 'none' }}>
            <div className="image-editor-field-wrapper">
              <input placeholder="Friend Three" type="text" value={this.state.textThree} onChange={this.handleTextThreeChange}></input>
            </div>
    
            {/* <div className="image-editor-field-wrapper font-size">
              <Slider axis="x" x={this.state.textThreeSize} onChange={this.handleTextThreeSizeChange} 
                styles={{
                  track: {
                    backgroundColor: 'black',
                    borderColor: '#BC271D',
                    borderWidth: '2'
                  },
                  active: {
                    backgroundColor: '#BC271D'
                  }
                }} 
              />
            </div> */}
            </div>
    
            <div className="image-editor-field-wrapper submit-button">
              <button onClick={this.saveImageAs}><i className="fa-thin fa-share-nodes"></i> SHARE</button>
            </div>
          </div>
          <InstructionsModal />
        </div>
        </>)
      } else if (this.state.contentToShow === 'listenButtons') {
        return (<>
        <div className="share-button-container">
          <h2 className="share-button-header">GET READY <br />FOR THE TERROR</h2>
        <div className="share-button-wrapper">
          <a target="_blank" rel="noopener noreferrer" href="https://found.ee/scoringtheendoftheworld">MOTIONLESS IN WHITE</a>
        </div>
        <div className="share-button-wrapper">
          <a target="_blank" rel="noopener noreferrer" href="https://open.spotify.com/artist/52qKfVcIV4GS8A8Vay2xtt?si=w55ajRu1Tg6cqtr0ptFi-w">ICE NINE KILLS</a>
        </div>
        <div className="share-button-wrapper">
          <a target="_blank" rel="noopener noreferrer" href="https://blackveilbrides.net">BLACK VEIL BRIDES</a>
        </div>
        <div className="reset-editor-wrapper">
          <button onClick={this.resetEditor}><i className="fa-thin fa-arrow-rotate-right"></i> RESET EDITOR</button>
        </div>
        </div>
        </>)
      }
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
