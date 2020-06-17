import React from 'react';

class Select_Image extends React.Component {

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            var input_elem = e.target;

            const reader = new FileReader();            
            reader.readAsDataURL(e.target.files[0]);

            reader.addEventListener('load', (e) => {
                var image = new Image();
                image.src = e.target.result;
                
                // Dimension Validation
                image.addEventListener('load', (e) => {
                      if(e.target.width === 1024 && e.target.height === 1024){
                          this.props.saveSRC(reader.result); 
                      }
                      else{
                          alert("Only Images with 1024 X 1024 is accepted...!!"); 
                          input_elem.value = "";
                      }                                                      
                });
            });          
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