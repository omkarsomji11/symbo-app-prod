import React from 'react';
import _ from 'lodash';
const ImageCard = (props) =>{
    let insuranceProviderId = _.get(props, 'imageData.insuranceProviderId', null);
    let imgSrc = '';
    if (insuranceProviderId === 'RELIGARE_HEALTH') {
        imgSrc = 'Religare.png';
    } else if(insuranceProviderId === 'RELIANCE_GENERAL') {
        imgSrc = 'RelianceGeneral.png';
    } else {
        imgSrc = 'HDFCErgo.png'
    }
    return(
        <div><img src={imgSrc} alt={insuranceProviderId} style={{height: '100px', width: '100%'}} /></div>
    );
}
export default ImageCard;