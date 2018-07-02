import React from 'react';
import ModelLoad from '../components/ThreeModels/modelLoad';
import {connect} from "react-redux";
import {componentsFetchPosts} from "../actions/componentsActions";
import {outlineFetchPosts} from "../actions/outlineActions";
import {imagesFetchPosts} from "../actions/imagesActions";
import {mtlFetchPosts} from "../actions/mtlActions";
import { boardFetchPosts } from '../actions/boardActions';
import { modelFetchPosts } from '../actions/model_2dAction';
import axios from 'axios';

class ThreeModels extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { };
        this.cadID = [];

    }

    componentDidMount() {
        const {outlineFetchPosts,mtlFetchPosts,componentsFetchPosts,imagesFetchPosts,boardFetchPosts} = this.props;
        const that = this;
        let getCad = new Promise((resolve) =>{
            axios.get("/api/v2.0/cad/list")
            .then(res =>{
                resolve(res)
            })
        });
        getCad.then(function(res){
            res.data.cad_files.map(item =>{
                // console.log(item.file_id);
                outlineFetchPosts(item.file_id);//获取board outline 3D模型
                imagesFetchPosts(item.file_id);//获取board outline 3D模型UV map
                mtlFetchPosts(item.file_id);//获取对应的board outline 3D模型材质
                componentsFetchPosts(item.file_id);//获取对应的components信息
                boardFetchPosts(item.file_id);//板信息
                that.cadID.push(item.file_id);
            })
        }).catch(function(err){
            console.log(err);
        });

    }

    render() {
        const {outlineObj,mtlData,componentsData,imagesData,boardData,model2DData,modelFetchPosts} = this.props;
        if(outlineObj.isFetching && mtlData.isFetching && componentsData.isFetching && imagesData.isFetching && boardData.isFetching && this.cadID.length>0) {
            return (
                <div>
                    <ModelLoad
                        outlineData={outlineObj}
                        mtlData={mtlData}
                        componentsData={componentsData}
                        imagesData={imagesData}
                        boardData={boardData}
                        model2DData={model2DData}
                        modelFetchPosts={modelFetchPosts}
                        cadID={this.cadID}
                    />
                </div>
            );
        }
        return null;

    }
}

function mapStateToProps (state) {
    return {
        outlineObj: state.outlineReducer,
        componentsData: state.componentsReducer,
        imagesData: state.imagesReducer,
        mtlData: state.mtlReducer,
        boardData: state.boardReducer,
        model2DData: state.model2DReducer
    }
}

function mapDispatchToProps (dispatch) {
    return {
        outlineFetchPosts: (id) => dispatch(outlineFetchPosts(id)),
        imagesFetchPosts: (id) => dispatch(imagesFetchPosts(id)),
        mtlFetchPosts: (id) => dispatch(mtlFetchPosts(id)),
        componentsFetchPosts: (id) => dispatch(componentsFetchPosts(id)),
        boardFetchPosts: (id) => dispatch(boardFetchPosts(id)),
        modelFetchPosts: (refdes,id) =>dispatch(modelFetchPosts(refdes,id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreeModels)