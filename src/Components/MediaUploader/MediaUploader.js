import React, { Component } from 'react'
import axios from 'axios'
import sha1 from 'sha1'
import superagent from 'superagent'
import { connect } from 'react-redux'
import { addUploadedMedia } from '../../ducks/reducer'

class MediaUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            media: '',
            // media: 'https://res.cloudinary.com/dgoygxc2r/video/upload/v1521662954/teigmfcr59mfygmfyx4a.mp4',
            timestamp: 'None yet',
            user: null
        }
    }

    componentDidMount(){
        axios.get('/api/user')
            .then(resp => this.setState({ user: resp }))
    }

    handleChange(input, prop) {
        this.setState({
            [prop]: input
        })
    }

    uploadFile(files) {
        files.forEach(media => {
            const cloudName = 'dgoygxc2r'
            if (this.props.mediaType === 'audio') {
                var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
            } else if (this.props.mediaType === 'image') {
                var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
            }
            
            const timeStamp = Date.now() / 1000
            const uploadPreset = 'yhsufroq'

            const paramsStr = `timestamp=${timeStamp}&upload_preset=${uploadPreset}l7oomwFmuE9JiD_DjWbEEkYMJOA`
            const signature = sha1(paramsStr)

            const params = {
                'api_key': process.env.REACT_APP_CLOUDNARY_KEY,
                'timestamp': timeStamp,
                'upload_preset': uploadPreset,
                'signature': signature
            }

            let uploadRequest = superagent.post(url)
            uploadRequest.attach('file', media);

            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key]);
            });

            uploadRequest.end((err, res) => {
                if (err) {
                    alert(err);
                    return
                }

                this.props.addUploadedMedia({
                    media_type: this.props.mediaType,
                    media_ref: res.body.secure_url
                })

            });
        })


    }

    render() {
        return (
            <div>
                
                <label className={this.props.mediaType} >
                    <input onChange={e => this.uploadFile(e.target.files)} type="file" />
                    <div>Choose {this.props.mediaType} File</div>
                </label>
            </div>

        )
    }
}

export default connect(null, { addUploadedMedia })(MediaUploader)