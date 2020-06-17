import React from 'react';
import DesignCanvas from './components/Design_Canvas'
import SelectImage from './components/Select_Image'
import ImageGallery from './components/Image_Gallery'

class App extends React.Component {
  state = {
    src: null,
    crop: [
      { width: 755, height: 450 },
      { width: 365, height: 450 },
      { width: 365, height: 212 },
      { width: 380, height: 380 }
    ],
    croppedImgs: [],
    croppedImgUrls: []
  };  

  saveSRC = (src) =>{
    this.setState({ src: src })
  }

  saveCroppedImgs = (url, image, index) => {
    var croppedImgs = [...this.state.croppedImgs];
    var croppedImgUrls = [...this.state.croppedImgUrls];
    croppedImgUrls[index] = url;
    croppedImgs[index] = image;
    this.setState({croppedImgUrls, croppedImgs});
  }

  render() {
    const { crop, src } = this.state;

    return (
      <div className="App">
        <SelectImage saveSRC={this.saveSRC}/>

        { 
          crop.map( (child, index) => 
              <DesignCanvas src={src} index={index} crop={child} saveCroppedImgs={this.saveCroppedImgs}/> 
          ) 
        }
        
        <ImageGallery croppedImgs={this.state.croppedImgs} croppedImgUrls={this.state.croppedImgUrls}/>
      </div>
    );
  }
}

export default App;
