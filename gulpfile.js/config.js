const format = require('string-template');

const config = {
    variables: {
        'src': './src',
        'dist': './dist',
        'deploy': 'D:/Users/Paul Rill/Source/Repos/Reversi/Backend/ReversiMvcApp/wwwroot',
    },
    browserSync: {
        'watch': true,
        'server': '{dist}'
    },
    static: [
        {
            // 'from': [
            //     'node_modules/**/*.js'
            // ],
            // 'to': '{dist}/assets/vendor'
        }
    ],
    webfonts: {
        'from': [
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.eot',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.ttf',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff2',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.svg',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.svg',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.woff',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.eot',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg',
            'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff'
        ],
        'to': '{dist}/assets/webfonts'
    },
    js: {
        'from': [
            '{src}/js/**/*.js',
        ],
        'order': [
            'js/Game/Game.js',
            'js/**/*.js',
        ],
        'to': {
            'dist': '{dist}/assets/js',
            'deploy': '{deploy}/assets/js',
        },
    },
    vendor: {
        'from': [
            '{src}/js/vendor/**/*.js',
        ],
        'to': {
            'dist': '{dist}/assets/js',
            'deploy': '{deploy}/assets/js',
        },
    },
    handlebars: {
        'from': [
            '{src}/templates/**/[^_]*.hbs',
        ],
        'to': {
            'dist': '{dist}/assets/js',
            'deploy': '{deploy}/assets/js',
        },
    },
    partials: {
        'from': [
            '{src}/templates/**/_*.hbs',
        ],
    },
    css: {
        'from': '{src}/css/**/*.{sass,scss,css}',
        'to': {
            'dist': '{dist}/assets/css',
            'deploy': '{deploy}/assets/css',
        },
    },
    html: {
        'from': '{src}/html/**/*.html',
        'to': {
            'dist': '{dist}',
            'deploy': '{deploy}',
        },
    },
    tests: {
        'from': '{src}/test/**/*.*',
        'to': '{dist}/test',
    },
    watch: [
        {
            'task': 'html',
            'from': '{src}/html/**/*.html',
        },
        {
            'task': 'css',
            'from': '{src}/css/**/*.{sass,scss,css}',
        },
        {
            'task': 'js',
            'from': [
                '{src}/js/**/*.js',
                '{src}/js/**/_*.js',
            ],
        },
        { 
            'task': 'tests',
            'from': '{src}/test/**/*.*',
        },
        { 
            'task': 'handlebars',
            'from': '{src}/templates/**/*.hbs',
        }
    ],
};

const getConfig = () => {
    function template(variable, vars) {
        if (variable !== null && typeof variable === 'object' || Array.isArray(variable)) {
            for (const k in variable) {
                variable[k] = template(variable[k], vars);
            }
        }
        if (typeof variable === 'string') {
            variable = format(variable, vars);
        }
        return variable;
    }
    return template(config, config.variables);
}

exports.getConfig = getConfig;