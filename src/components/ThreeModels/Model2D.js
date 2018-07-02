import React, { Component } from 'react';
import "./model2D.css";

class Model2DShow extends React.Component {
    constructor(props,context){
        super(props,context);
        this.show_svg_info = this.show_svg_info.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        return this.props.model2DData !==nextProps.model2DData
    }
    show_svg_info() {
        let info_box = this.refs.svg_info;
        info_box.style.display = "block";

    }


    render() {
        const {model2DData} = this.props;
        // console.log(model2DData);
        if(model2DData.isFetching){
            return (
                <div>
                    <object onMouseEnter={this.show_svg_info} className="svg_item" data={model2DData.data.config.url} type="image/svg+xml"> </object>
                    <div ref="svg_info" style={{display:"none"}}>
                        <p>xsrfCookieName: {model2DData.data.config.xsrfCookieName}</p>
                        <p>xsrfHeaderName: {model2DData.data.config.xsrfHeaderName}</p>
                    </div>
                </div>
            );
        }
        return (
            <div>
                loading...
            </div>
        )

    }
}

export default Model2DShow;
