import React, { PureComponent } from 'react';
import './ContentLeft.css';
import FineUpload from './FineUpload'

class ContentLeft extends PureComponent {

    render() {
        return (
            <div className="contentLeft" >
                <FineUpload/>
            </div>
        );
    }
}
export default ContentLeft;
