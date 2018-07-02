import React, { PureComponent } from 'react';
import './Top.css';
import {Motion, spring} from 'react-motion';

class Top extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userName:'admin',
            height: 0
        }
    }
    animate = () => {
        this.setState((state) => ({ height: state.height === 150 ? 0 : 150 }))
    };
    render() {
        return (
            <div className="header">
                <div className='logo'>TeleProbe</div>
                <div className="headR">
                    <div className='userPic'><svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-user"> </use>
                    </svg> </div>
                    <div className='userName'>{this.state.userName}</div>
                    <div className='downBtn' onClick={this.animate}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-down2"> </use>
                        </svg>
                        <Motion style={{ height: spring(this.state.height) }}>
                            {
                                ({ height }) => <div className='navList' style={Object.assign({}, { height } )}>
                                    <ul className=''>
                                        <li>item1</li>
                                        <li>item2</li>
                                        <li>item3</li>
                                        <li>item4</li>
                                    </ul>
                                </div>
                            }
                        </Motion>
                    </div>

                </div>
            </div>
        );
    }
}

export default Top;
