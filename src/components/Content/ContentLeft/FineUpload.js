import React, { PureComponent } from 'react'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Dropzone from 'react-fine-uploader/dropzone'
import Filename from 'react-fine-uploader/filename'
import ProgressBar from 'react-fine-uploader/progress-bar'
import Status from 'react-fine-uploader/status'
import RetryButton from 'react-fine-uploader/retry-button'

import "./FineUpload.css";

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true,
            partSize:50*1024*1024
        },
        request: {
            endpoint: '/api/v2.0/cad'
        },
        retry: {
            enableAuto: false
        },
        deleteFile: {
            enabled: true,
            endpoint: '/api/v2.0/cad'
        },
        cors: {
            expected: true,
            allowXdr: true
        }
    }
});

class FineUpload extends PureComponent {
    constructor() {
        super();

        this.state = {
            submittedFiles: []
        };
        this.closeFineUpload = this.closeFineUpload.bind(this);
    };
    componentDidMount() {
        uploader.on('statusChange', (id, oldStatus, newStatus) => {
            if (newStatus === 'submitted') {
                const submittedFiles = this.state.submittedFiles;

                submittedFiles.push(id);
                this.setState({ submittedFiles })
            }
        })
    };
    closeFineUpload(e) {
        let fineItem = e.target.parentNode;
        fineItem.hidden = true;
    }
    render() {
        return (
                <Dropzone uploader={ uploader }>
                    <ProgressBar uploader={ uploader } />
                    {
                        this.state.submittedFiles.map(id => (
                            <div key={ id } className="react-fine-uploader-files">
                                <Filename id={id} uploader={uploader} />
                                <Status id={ id } uploader={ uploader } />
                                <RetryButton id={ id } uploader={ uploader } />
                                <button className="closeFineUpload" onClick={this.closeFineUpload}>close</button>
                            </div>
                        ))
                    }
                </Dropzone>

        )
    }
}

export default FineUpload