import { Component } from 'react';
import Truncate from 'react-truncate';
import './imagePlacard.css';

const spinner =
  '//widgets.ebscohost.com/prod/common/branding/novelist/loading.gif';

class ImagePlacard extends Component {

    render() {
        const { searchUrl, records, hits, label, isLoading, error } = this.props;

        if (error) {
            return (<div>An error has occurred.</div>);
        }

        if (isLoading) {
            return (
                <div>
                    <img src={ spinner } /> Loading {label}...
                </div>
            );
        }

        // this should be internationalized / use formatted messages
        let recordsleft = parseInt(hits, 10) - records.length;
        let recordsleftmessage = '';
        if (recordsleft <= 1) {
            recordsleftmessage = 'View all records';
        } else {
            recordsleftmessage = `View ${  recordsleft  } more`;
        }

        return (
            <div className="placard">
                <div className="innerContainer">
                    <div className="placardHeading">
                        <span className="placardLabelContainer">
                            <a href={ searchUrl } className="placardLabel" target="_blank">
                                {label}
                            </a>
                        </span>
                        <span className="placardHitCountContainer">
                            <a href={ searchUrl } className="placardHitCount" target="_blank">
                                {recordsleftmessage}
                            </a>
                        </span>
                    </div>
                    <div className="recordsDiv">
                        {records.map((record, index) => (
                            <div className="placardDiv" key={ index }>
                                <a href={ record.link } target="_blank">
                                    <img className="placardImage" src={ record.image } />
                                </a>
                                <span>
                                    <a href={ record.link } className="itemLink" target="_blank">
                                        <Truncate lines={ 3 } ellipsis={ <span>...</span> }>
                                            {record.title}
                                        </Truncate>
                                    </a>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

ImagePlacard.defaultProps = {
    records: []
};

export { ImagePlacard };
