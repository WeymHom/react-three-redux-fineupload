import React, { PureComponent } from 'react';
import './TabControl.css';

class TabControl extends PureComponent {
    constructor() {
        super();
        this.state = {
            currentIndex : 0
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.currentIndex !== nextState.currentIndex;
    }
    //选择title的index并给该title添加active样式
    check_title_index( index ){
        return index === this.state.currentIndex ? "tab_title active" : "tab_title"
    }
    //选择item的index并显示该item内容
    check_item_index( index ){
        return index === this.state.currentIndex ? "tab_item show" : "tab_item"
    }
    render() {
        let that = this;
        return (
            <div className="tab">
                {/*动态生成Tab导航*/}
                <div className="tab_title_wrap">
                    {
                        React.Children.map( this.props.children , ( element,index ) => {
                            return(
                                <div onClick={ (  ) => { this.setState({ currentIndex : index }) } } className={ that.check_title_index( index ) }>{ element.props.children[0]}</div>
                            )
                        })
                    }
                </div>
                { /* Tab内容区域 */ }
                <div className="tab_item_wrap">
                    {
                        React.Children.map(this.props.children,( element,index )=>{
                            return(
                                <div className={ that.check_item_index( index ) }>{ element.props.children[1]}</div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
export default TabControl;
