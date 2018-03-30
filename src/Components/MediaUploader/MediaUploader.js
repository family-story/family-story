import React, { Component } from 'react'
import sha1 from 'sha1'
import superagent from 'superagent'

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

    handleChange(input, prop) {
        this.setState({
            [prop]: input
        })
    }

    uploadFile(files) {
        let media = files[0]
        const cloudName = 'dgoygxc2r'
        if (this.props.mediaType === 'audio') {
            var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
        } else if (this.props.mediaType === 'pic') {
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
                let media_type = this.props.mediaType
                let media_ref = res.body.secure_url
             console.log(media_type, media_ref)
            this.props.addUploadedMedia(media_type, media_ref)

        });


    }

    render() {
        return (
            <div>

                <label className={this.props.mediaType} >
                    <div>Choose {this.props.mediaType} File</div>
                    <input onChange={e => this.uploadFile(e.target.files)} type="file" />
                </label>
            </div>

        )
    }
}

export default MediaUploader