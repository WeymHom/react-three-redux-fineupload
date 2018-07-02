import React from 'react';
import React3 from 'react-three-renderer';
import Modal from 'react-modal';
import * as THREE from 'three';
import TOC from 'three-orbit-controls';
import Shapes from './Shapes';
import Board from "./board";
import Model2DShow from "./Model2D";
//OrbitControls
const OrbitControls = TOC(THREE);
Modal.setAppElement('#root');

class ModelLoad extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.cameraPosition = new THREE.Vector3(0,-0.2, 0.8);
        this.lookAt = new THREE.Vector3(0,0,0);
        this.lightPosition = new THREE.Vector3(0,0, 0.8);
        this.groupRotation = new THREE.Euler( 0.2 * Math.PI,0,0,'XYZ' );
        this.groupPosition = new THREE.Vector3(0,-0.2,this.props.boardData.data.data.length/2);

        this.raycaster = new THREE.Raycaster();//光线投射，用于确定鼠标点击位置
        this.mouse = new THREE.Vector2();//创建二维平面
        this.mouseDown = this.mouseDown.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            modalOpen:false

        };
        this._onAnimate = () => {
            this.setState({

            });
        };

    }

    //打开模态框
    openModal() {
        this.setState({
            modalOpen : true
        })
    }
    //关闭模态框
    closeModal() {
        this.setState({
            modalOpen : false
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state == nextState && this.props == nextProps){
            return false;
        }
        return true;
    }

    componentDidMount() {

        //鼠标、键盘控制器
        const controls = new OrbitControls(this.refs.camera);
        this.controls = controls;

        window.addEventListener("mousedown",this.mouseDown);//页面绑定鼠标点击事件

    }
    mouseDown(e){
        e.preventDefault();
        const {modelFetchPosts,cadID} = this.props;
        //将html坐标系转化为webgl坐标系，并确定鼠标点击位置
        this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        //以camera为z坐标，确定所点击物体的3D空间位置
        this.raycaster.setFromCamera(this.mouse,this.refs.camera);
        //确定所点击位置上的物体数量
        const intersects = this.raycaster.intersectObjects(this.refs.scene.children[2].children[1].children,false);
        //选中后进行的操作
        if(intersects.length){
            let item_refdes = intersects[0].object.name;
            this.openModal();
            modelFetchPosts(item_refdes,cadID[0]);
        }
    }
    componentWillUnmount() {
        this.controls.dispose();
        delete this.controls;
        window.removeEventListener("mousedown",this.mouseDown);
    }

    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const {outlineData,mtlData,componentsData,imagesData,boardData,model2DData,cadID} = this.props;
        return (<div ref="container">
            <React3
                mainCamera="camera"
                width={width}
                height={height}
                clearAlpha={0.2}
                alpha={true}
                // antialias={true}
                onAnimate={this._onAnimate}
                pixelRatio={window.devicePixelRatio}
            >
                <scene ref="scene">
                    <perspectiveCamera
                        ref="camera"
                        name="camera"
                        fov={45}
                        aspect={width / height}
                        near={0.1}
                        far={2000}
                        lookAt={this.lookAt}
                        position={this.cameraPosition}
                    />
                    <pointLight
                        color={0xffffff}
                        intensity={1}
                        position={this.lightPosition}
                    />
                    <group ref="groups"
                           position={this.groupPosition}
                           rotation={this.groupRotation}
                    >
                        <Board objModels={outlineData} mapModels={imagesData} mtlModels={mtlData} boardInfo={boardData}/>
                        <Shapes
                            componentData={componentsData}
                            boardData={boardData}
                            cadID={cadID}
                        />

                    </group>
                </scene>
            </React3>
            <Modal
                isOpen={this.state.modalOpen}
                className='modal'
                overlayClassName='overlay'
                contentLabel='2d svg modal'
            >
                <button className='modalCloseBtn' onClick={this.closeModal}>close</button>
                <Model2DShow model2DData={model2DData}/>
            </Modal>
        </div>);
    }
}

export default ModelLoad;