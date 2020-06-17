import React from 'react';

export default function Image_Gallery(props){ 
    return (
        <div>
            <h1>Cropped Image Library</h1>
            {
                props.downloadURLs.map((child, index) => {
                    return(
                        <>
                            <h1>Image {index + 1}.</h1>
                            <img alt="Crop" style={{ maxWidth: '100%' }} src={child} />
                            <br />
                            <a href={child}>{child}</a>
                            <br />
                        </>
                    )
                })
            }
        </div>
    );
}
