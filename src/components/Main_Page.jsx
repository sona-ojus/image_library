import React from 'react';
import SelectImage from './Select_Image'
import UploadImage from './Upload_Image'
import ImageGallery from './Image_Gallery'

import '../styles/App.css'

class Main_Page extends React.Component {
  state = {
    src: null,
    crop: [
      { width: 755, height: 450 },
      { width: 365, height: 450 },
      { width: 365, height: 212 },
      { width: 380, height: 380 }
    ],
    downloadURLs: [],
    
    select: true,
    gallery: false,   
    canvas: false
  };  

  saveSRC = (src) =>{
    this.setState({ src: src, select:false, canvas:true})
  }

  saveDownloadURLs = (url, index) => {
    var urls = [...this.state.downloadURLs];
    urls[index] = url;
    this.setState({downloadURLs: urls})
  }

  showGallery = () => {
    this.setState({gallery: true, canvas: false});
  }

  render() {
    const { crop, src } = this.state;

    if(this.state.select)
      var select_display = <SelectImage saveSRC={this.saveSRC}/>

    if(this.state.canvas)
        var canvas_display =  <UploadImage 
                                  src={src} 
                                  crop={crop} 
                                  saveDownloadURLs={this.saveDownloadURLs} 
                                  showGallery={this.showGallery}/>
   
    if(this.state.gallery)
      var gallery_display =  <ImageGallery downloadURLs={this.state.downloadURLs}/>

    return (
      <div className="App">
          {select_display}
          {canvas_display}
          {gallery_display}          
      </div>
    );
  }
}

export default Main_Page;
