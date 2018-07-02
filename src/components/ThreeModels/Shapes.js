import React from 'react';
import * as THREE from "three";
import * as STL from "three-stl-loader";

class Shapes extends React.Component {
    constructor(props,context){
        super(props,context);

    }

    shouldComponentUpdate(nextProps) {
        if(this.props.componentData == nextProps.componentData && this.props.componentData == nextProps.componentData && this.props.cadID == nextProps.cadID){
            return false;
        }
        return true;
    }

    componentDidMount() {
        const {componentData,boardData,cadID} = this.props;
        const componentArr = componentData.data.data;
        let queue = [];
        let pack={};
        let queue2 = [];
        let cad_id = cadID[0];

        {Object.keys(componentArr).map(key =>{
            const _package=componentArr[key]['p'];
            const that = this;
            if (pack[_package] === undefined) {
                pack[_package] = "stl";
                const STLLoader = STL(THREE);
                const stlLoader = new STLLoader();
                let url = "/api/v2.0/cad/package/" + _package + "?cad_id="+cad_id;

                this.asyncLoad = new Promise((resolve) =>{
                    stlLoader.load(url, function (geometry) {
                        const stlMaterial = new THREE.MeshLambertMaterial({color:0xf0f0f0});
                        let stlMesh = new THREE.Mesh(geometry, stlMaterial);

                        resolve(
                            queue.push({[_package]:key}),
                            pack[_package] = stlMesh
                        );
                    });
                });

            }
            this.asyncLoad.then(function(){
                queue.shift();

            }).then(function(){
                queue2.push({[_package]:key});
            }).then(function(){
                setTimeout(function(){
                    let qData = queue2.shift();
                    for(let k in qData){
                        let mesh = pack[k].clone();
                        mesh.position.x = (componentArr[qData[k]].c[0])- (boardData.data.data.width/2);
                        mesh.position.z = -(componentArr[qData[k]].c[1]);
                        mesh.rotation.z = -0.5 * Math.PI;
                        mesh.name = qData[k];
                        if(componentArr[qData[k]].m){
                            mesh.rotation.x = 0.5 * Math.PI;
                            mesh.position.y = -0.003;
                        }else{
                            mesh.rotation.x = -0.5 * Math.PI;
                            mesh.position.y = 0.003;
                        }
                        that.refs.com.add(mesh);
                    }},10);
            }).catch(function(err){
                console.log(err);
            });

        })}
    }

  render() {
      return (
          <group ref="com"> </group>
      );
  }
}

export default Shapes;
