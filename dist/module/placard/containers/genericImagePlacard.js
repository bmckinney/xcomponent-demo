var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { ImagePlacard } from '../components/imagePlacard';

var GenericImagePlacard = function (_Component) {
    _inherits(GenericImagePlacard, _Component);

    function GenericImagePlacard(props) {
        _classCallCheck(this, GenericImagePlacard);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        var _this$props = _this.props,
            count = _this$props.count,
            source = _this$props.source,
            label = _this$props.label;

        _this.state = {
            isLoading: true,
            error: null,
            records: null,
            hits: null,
            searchUrl: null,
            label: label,
            count: count,
            source: source
        };
        _this._mounted = false;
        return _this;
    }

    GenericImagePlacard.prototype._computeUrl = function _computeUrl(query) {
        var _props = this.props,
            count = _props.count,
            source = _props.source;

        String.prototype.replaceAll = function (search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
        var sourceURL = source;
        sourceURL = sourceURL.replaceAll('{SEARCHTERM}', encodeURIComponent(query));
        sourceURL = sourceURL.replaceAll('{COUNT}', encodeURIComponent(count));
        return sourceURL;
    };

    GenericImagePlacard.prototype._fetchApiData = function _fetchApiData(url) {
        var _this2 = this;

        var _props2 = this.props,
            count = _props2.count,
            source = _props2.source,
            label = _props2.label;

        this._source = axios.CancelToken.source();
        axios.get(url, {
            cancelToken: this._source.token,
            headers: { Accept: 'application/json' }
        }).then(function (response) {
            if (_this2._mounted) {
                _this2.setState({
                    records: response.data.records,
                    hits: response.data.hits,
                    searchUrl: response.data.url,
                    isLoading: false,
                    count: count,
                    label: label,
                    source: source
                });
            }
        })['catch'](function (err) {
            if (axios.isCancel(err)) {
                // console.log('Request cancelled', error);
            } else {
                    // console.log('Request error', error);
                }
            _this2.setState({ err: err, isLoading: false });
        });
    };

    GenericImagePlacard.prototype.componentDidMount = function componentDidMount() {
        var query = this.props.query;

        this._mounted = true;
        if (query) {
            this._fetchApiData(this._computeUrl(query));
        }
    };

    GenericImagePlacard.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (this._mounted) {
            var newQuery = nextProps.query;
            var oldQuery = this.props.query;

            if (newQuery !== null && newQuery !== oldQuery) {
                this._fetchApiData(this._computeUrl(newQuery));
            } else {
                this.state = {
                    isLoading: true,
                    error: null,
                    records: null,
                    hits: null,
                    searchUrl: null
                };
            }
        }
    };

    GenericImagePlacard.prototype.componentWillUnmount = function componentWillUnmount() {
        this._mounted = false;
    };

    GenericImagePlacard.prototype.render = function render() {
        // console.log('state', this.state);
        return React.createElement(ImagePlacard, _extends({ key: 'imagePlacard' }, this.state));
    };

    return GenericImagePlacard;
}(Component);

GenericImagePlacard.propTypes = {
    query: PropTypes.string,
    count: PropTypes.string,
    label: PropTypes.string,
    source: PropTypes.string
};

GenericImagePlacard.defaultProps = {
    query: null,
    count: '4',
    label: null,
    source: null
};

export { GenericImagePlacard };