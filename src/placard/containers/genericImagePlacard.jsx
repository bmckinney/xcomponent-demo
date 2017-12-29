import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { ImagePlacard } from '../components/imagePlacard';

class GenericImagePlacard extends Component {
    constructor(props) {
        super(props);
        const { count, source, label } = this.props;
        this.state = {
            isLoading: true,
            error:     null,
            records:   null,
            hits:      null,
            searchUrl: null,
            label,
            count,
            source
        };
        this._mounted = false;
    }

    _computeUrl(query) {
        const { count, source } = this.props;
        String.prototype.replaceAll = function(search, replacement) {
            let target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        let sourceURL = source;
        sourceURL = sourceURL.replaceAll('{SEARCHTERM}', encodeURIComponent(query));
        sourceURL = sourceURL.replaceAll('{COUNT}', encodeURIComponent(count));
        return sourceURL;
    }

    _fetchApiData(url) {
        const { count, source, label } = this.props;
        this._source = axios.CancelToken.source();
        axios
            .get(url, {
                cancelToken: this._source.token,
                headers:     { Accept: 'application/json' }
            })
            .then(response => {
                if (this._mounted) {
                    this.setState({
                        records:   response.data.records,
                        hits:      response.data.hits,
                        searchUrl: response.data.url,
                        isLoading: false,
                        count,
                        label,
                        source
                    });
                }
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    // console.log('Request cancelled', error);
                } else {
                    // console.log('Request error', error);
                }
                this.setState({ err, isLoading: false });
            });
    }

    componentDidMount() {
        const { query } = this.props;
        this._mounted = true;
        if (query) {
            this._fetchApiData(this._computeUrl(query));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this._mounted) {
            const { query: newQuery } = nextProps;
            const { query: oldQuery } = this.props;
            if (newQuery !== null && newQuery !== oldQuery) {
                this._fetchApiData(this._computeUrl(newQuery));
            } else {
                this.state = {
                    isLoading: true,
                    error:     null,
                    records:   null,
                    hits:      null,
                    searchUrl: null
                };
            }
        }
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    render() {
        // console.log('state', this.state);
        return (<ImagePlacard key="imagePlacard" { ...this.state } />);
    }
}

GenericImagePlacard.propTypes = {
    query:  PropTypes.string,
    count:  PropTypes.string,
    label:  PropTypes.string,
    source: PropTypes.string
};

GenericImagePlacard.defaultProps = {
    query:  null,
    count:  '4',
    label:  null,
    source: null
};

export { GenericImagePlacard };
