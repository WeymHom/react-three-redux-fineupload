import React, { PureComponent } from 'react';
import './ContentRight.css';
import Menu from "./Menu";
import Camera from "./Camera";

class ContentRight extends PureComponent {
    render() {
        return (
            <div className="contentRight">
                <Camera/>
                <Menu/>
            </div>
        );
    }
}
export default ContentRight;
