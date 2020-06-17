import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class Design_Canvas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            crop: this.props.crop,
            croppedImageUrl: null
        }
    }

    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop) => {
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
        const [croppedImageUrl, file] = await this.getCroppedImg(
            this.imageRef,
            crop,
            'newFile_'+ this.props.index +'.jpeg'
        );

        this.props.saveCroppedImgs(croppedImageUrl, file, this.props.index);
        this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {

                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);

                const file = new File([blob], fileName, blob);
                resolve([this.fileUrl, file]);

            }, 'image/jpeg');
        });
    }

    render(){
        return(
            <>
            {
                this.props.src && 
                <ReactCrop
                  src={this.props.src}
                  crop={this.state.crop}
                  locked={true}
                  ruleOfThirds
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
            }
            {
                this.state.croppedImageUrl &&
                <img alt="Crop" style={{ maxWidth: '100%' }} src={this.state.croppedImageUrl} />
            }
            </>
        )
    }
}

export default Design_Canvas;