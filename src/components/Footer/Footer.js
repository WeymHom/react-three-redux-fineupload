import React, { Component } from 'react';
import './Footer.css';
import {Motion, spring} from 'react-motion';
import {connect} from "react-redux";
import { isShow } from '../../actions/synchronousActions';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        return this.props.doShow !== nextProps.doShow;
    }
    animate = () => {
        const {dispatch,doShow} = this.props;
        //触发isShow(),改变state
        dispatch(isShow(!doShow.typeShow));
    };

    render() {
        const {doShow} = this.props;
        return (
            <div className='footer'>
                <div className='showBtn' onClick={this.animate}>
                    <svg className="icon upIcon" aria-hidden="true">
                        <use xlinkHref="#icon-upa"> </use>
                    </svg>
                </div>
                <Motion style={{ x: spring(doShow.typeShow ? 84 : 0) }}>
                    {({x}) =>
                        //底部导航栏动画
                        <div className="footerBar" style={{
                            WebkitTransform: `translate3d(0, ${x}px, 0)`,
                            transform: `translate3d(0, ${x}px, 0)`,
                        }} >
                            {/*底部导航栏内容*/}
                            <div className='closeBtn' onClick={this.animate}>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-16"> </use>
                                </svg>
                            </div>
                        </div>
                    }
                </Motion>
            </div>
        );
    }
}

const mapStateToProps = function (store) {
    return{
        doShow:store.doShowReducer
    }
};

export default connect(mapStateToProps)(Footer);
