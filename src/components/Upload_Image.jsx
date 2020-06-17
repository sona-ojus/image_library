import React from 'react';
import {storage} from '../firebase/index'
import DesignCanvas from './Design_Canvas'

class Upload_Image extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            croppedImgs: []
        }
    }

    handleUpload = () => {
        this.state.croppedImgs.map((image, index) => {
            this.props.showGallery();
            var uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                'state_changed',
                snapshot => {},
                error => {
                    console.log(error)
                },
                ()=>{
                    storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        this.props.saveDownloadURLs(url, index);
                    })
                }
            )
            return true;
        });

    }

    saveCroppedImgs = (url, image, index) => {
        var croppedImgs = [...this.state.croppedImgs];
        croppedImgs[index] = image;
        this.setState({croppedImgs});
    }

    render() {
        return (
            <div>
                <button onClick={this.handleUpload}>Upload to Firebase</button>
                {
                    this.props.crop.map( (child, index) => 
                      <DesignCanvas key={index} 
                                    src={this.props.src} 
                                    index={index} 
                                    crop={child} 
                                    saveCroppedImgs={this.saveCroppedImgs}/> 
                    )
                }
                <button onClick={this.handleUpload}>Upload to Firebase</button>
            </div>
        );
    }
}

export default Upload_Image;
