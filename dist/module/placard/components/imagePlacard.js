function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Component } from 'react';
import Truncate from 'react-truncate';
import './imagePlacard.css';

var spinner = '//widgets.ebscohost.com/prod/common/branding/novelist/loading.gif';

var ImagePlacard = function (_Component) {
    _inherits(ImagePlacard, _Component);

    function ImagePlacard() {
        _classCallCheck(this, ImagePlacard);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ImagePlacard.prototype.render = function render() {
        var _props = this.props,
            searchUrl = _props.searchUrl,
            records = _props.records,
            hits = _props.hits,
            label = _props.label,
            isLoading = _props.isLoading,
            error = _props.error;


        if (error) {
            return React.createElement(
                'div',
                null,
                'An error has occurred.'
            );
        }

        if (isLoading) {
            return React.createElement(
                'div',
                null,
                React.createElement('img', { src: spinner }),
                ' Loading ',
                label,
                '...'
            );
        }

        // this should be internationalized / use formatted messages
        var recordsleft = parseInt(hits, 10) - records.length;
        var recordsleftmessage = '';
        if (recordsleft <= 1) {
            recordsleftmessage = 'View all records';
        } else {
            recordsleftmessage = 'View ' + recordsleft + ' more';
        }

        return React.createElement(
            'div',
            { className: 'placard' },
            React.createElement(
                'div',
                { className: 'innerContainer' },
                React.createElement(
                    'div',
                    { className: 'placardHeading' },
                    React.createElement(
                        'span',
                        { className: 'placardLabelContainer' },
                        React.createElement(
                            'a',
                            { href: searchUrl, className: 'placardLabel', target: '_blank' },
                            label
                        )
                    ),
                    React.createElement(
                        'span',
                        { className: 'placardHitCountContainer' },
                        React.createElement(
                            'a',
                            { href: searchUrl, className: 'placardHitCount', target: '_blank' },
                            recordsleftmessage
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'recordsDiv' },
                    records.map(function (record, index) {
                        return React.createElement(
                            'div',
                            { className: 'placardDiv', key: index },
                            React.createElement(
                                'a',
                                { href: record.link, target: '_blank' },
                                React.createElement('img', { className: 'placardImage', src: record.image })
                            ),
                            React.createElement(
                                'span',
                                null,
                                React.createElement(
                                    'a',
                                    { href: record.link, className: 'itemLink', target: '_blank' },
                                    React.createElement(
                                        Truncate,
                                        { lines: 3, ellipsis: React.createElement(
                                                'span',
                                                null,
                                                '...'
                                            ) },
                                        record.title
                                    )
                                )
                            )
                        );
                    })
                )
            )
        );
    };

    return ImagePlacard;
}(Component);

ImagePlacard.defaultProps = {
    records: []
};

export { ImagePlacard };