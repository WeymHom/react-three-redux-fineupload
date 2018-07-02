import React, { PureComponent } from 'react';
import './Content.css';
import ContentLeft from "./ContentLeft/ContentLeft";
import ContentRight from "./ContentRight/ContentRight";
import Top from './Top/Top';

class Content extends PureComponent {

    render() {
        return (
            <div className="content">
                <Top/>
                <ContentLeft/>
                <ContentRight/>
            </div>
        );
    }
}
export default Content;
