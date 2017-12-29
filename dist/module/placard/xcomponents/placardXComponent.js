import xcomponent from 'xcomponent/src';

export var PlacardXComponent = xcomponent.create({

    tag: 'placard-xcomponent',

    dimensions: {
        width: '100%',

        height: '500px'
    },

    autoResize: true,

    scrolling: true,

    defaultEnv: 'demo',

    url: {
        demo: './placard.html',
        test: '/base/test/windows/login/index.htm',
        production: 'https://ebsco-components.surge.sh/placard.html'
    },

    domain: {
        test: 'mock://www.my-site.com'
    },

    props: {

        query: {
            type: 'string',
            required: true
        },

        count: {
            type: 'string',
            required: true
        },

        label: {
            type: 'string',
            required: true
        },

        source: {
            type: 'string',
            required: true
        }

    },

    defaultContext: __DEFAULT_CONTEXT__,

    contexts: {
        iframe: true,
        popup: __POPUP_SUPPORT__
    },

    prerenderTemplate: function prerenderTemplate() {
        return React.createElement(
            'html',
            null,
            React.createElement(
                'head',
                null,
                React.createElement(
                    'style',
                    null,
                    '\n                        html, body {\n                            width: 100%;\n                            height: 100%;\n                            overflow: hidden;\n                            top: 0;\n                            left: 0;\n                            margin: 0;\n                            text-align: center;\n                        }\n                        .spinner {\n                            position: absolute;\n                            max-height: 60vmin;\n                            max-width: 60vmin;\n                            height: 40px;\n                            width: 40px;\n                            top: 50%;\n                            left: 50%;\n                            transform: translateX(-50%) translateY(-50%);\n                            z-index: 10;\n                        }\n                        .spinner .loader {\n                            height: 100%;\n                            width: 100%;\n                            box-sizing: border-box;\n                            border: 3px solid rgba(0, 0, 0, .2);\n                            border-top-color: rgba(33, 128, 192, 0.8);\n                            border-radius: 100%;\n                            animation: rotation .7s infinite linear;\n                        }\n                        @keyframes rotation {\n                            from {\n                                transform: rotate(0deg)\n                            }\n                            to {\n                                transform: rotate(359deg)\n                            }\n                        }\n                    '
                )
            ),
            React.createElement(
                'body',
                null,
                React.createElement(
                    'div',
                    { 'class': 'spinner' },
                    React.createElement('div', { id: 'loader', 'class': 'loader' })
                )
            )
        );
    }
});