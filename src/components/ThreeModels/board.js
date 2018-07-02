import React from 'react';
import * as THREE from 'three';
import * as OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

class Board extends React.Component {

    shouldComponentUpdate(nextProps) {
        if(this.props.objModels == nextProps.objModels && this.props.mapModels == nextProps.mapModels && this.props.mtlModels == nextProps.mtlModels && this.props.boardInfo == nextProps.boardInfo){
            return false;
        }
        return true;
    }

    componentDidMount() {
        const { board } = this.refs;
        const {objModels,mapModels,mtlModels,boardInfo} = this.props;

        this.THREE = THREE;
        //模型加载
        const textLoader = new THREE.TextureLoader();
        const MTLLoader = require('three-mtl-loader');
        const objLoader = new this.THREE.OBJLoader();
        const mtlLoader = new MTLLoader();
        mtlLoader.load(mtlModels.data.config.url, function(matl) {
            matl.preload();
            objLoader.load(objModels.data.config.url, (object) => {
                object.traverse(function (child) {
                    if(child instanceof THREE.Mesh){
                        textLoader.load(mapModels.data.config.url,function ( texture ) {
                            child.material = new THREE.MeshBasicMaterial( {
                                map: texture
                            } );
                        })
                    }
                });
                const objModelLoader = object;
                objModelLoader.position.x = - boardInfo.data.data.width/2;
                objModelLoader.rotation.x = -0.5 * Math.PI;
                board.add(objModelLoader);
            });
        });

    }

    render() {

        return (
           <group ref="board"> </group>
        );
    }
}

export default Board