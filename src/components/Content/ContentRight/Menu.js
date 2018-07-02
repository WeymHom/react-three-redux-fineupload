import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import './Menu.css';
import TabControl from "./TabControl";
import {Motion, spring} from 'react-motion';
import  screen from '../../../images/screen.png';
import ChassisContent from "./ChassisContent";

Modal.setAppElement('#root');
function OscilloscopeTitle() {
    return (
        <div>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-liubodong"/>
            </svg>
            <span className='titleName'>Oscilloscope</span>
        </div>
    )
}
function MultiMeterTitle() {
    return (
        <div>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-yiqiyibiao"/>
            </svg>
            <span className='titleName'>MultiMeter</span>
        </div>
    )
}
function ChassisTitle() {
    return (
        <div>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-zongbiao"/>
            </svg>
            <span className='titleName'>Chassis</span>
        </div>
    )
}

function TabBar(props) {
    
    return (
        <TabControl>
            <div>
                <OscilloscopeTitle/>
                <div>
                    <img className='screenImg' alt="" src={screen}/>
                </div>

            </div>
            <div>
                <MultiMeterTitle/>
                <div>MultiMeterContent</div>
            </div>
            <div>
                <ChassisTitle/>
                <ChassisContent/>
            </div>

        </TabControl>
    )
}
class Menu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width:0
        };
        this.onShow = this.onShow.bind(this);
    }
    //隐藏和显示Menu动画
    onShow() {
        this.setState((state) => ({
            width: state.width === 240 ? 0 : 240
        }));
    };
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.width !== nextState.width;
    }

    render() {
        return (
            <div className="Menu">
                <div className='barDoShow' onClick={this.onShow} > </div>
                <Motion style={{ width: spring(this.state.width) }}>
                    {
                        ({ width }) => <div style={{transform: `translate(${width}px, 0)`}}>
                            <TabBar/>
                            <div className='closeMenu' onClick={this.onShow} >close</div>

                        </div>

                    }
                </Motion>

            </div>
        );
    }
}
export default Menu;
