import React from 'react';
import {storage} from '../firebase/index'

class Image_Gallery extends React.Component {
    handleUpload = () => {
        this.props.croppedImgs.map(image => {
            console.log(image);
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
                        console.log(url)
                    })
                }
            )
        });
    }

    render() {
        return (
            <div>
                <h1>Cropped Image Library</h1>
                {
                    this.props.croppedImgUrls.map(child => 
                        <img alt="Crop" style={{ maxWidth: '100%' }} src={child} />
                    )
                }
                <button onClick={this.handleUpload}>Upload to Server</button>
            </div>
        );
    }
}

export default Image_Gallery;
