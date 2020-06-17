import React from 'react';

class Select_Image extends React.Component {

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();

          reader.addEventListener('load', (e) => {
            var image = new Image();
            image.src = e.target.result;
            this.props.saveSRC(reader.result)
            image.onload = function () {
              var height = this.height;
              var width = this.width;
              if (height != 1024 || width != 1024) {
                alert("Height and Width must not exceed 1024px.");
                return false;
              }
              return true;
            };
          }
          );
          reader.readAsDataURL(e.target.files[0]);
        }
    };

  render() {
    return (
      <div>
        <h1>Select Image to Upload</h1>
        <input type="file" accept="image/*" onChange={this.onSelectFile} />
      </div>
    )
  }
}

export default Select_Image;