module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        package: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                'dist/',
                'cache/'
            ]
        },
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['src/js/*.js', 'dist/*.js']
        },
        copy: {
            css: {
                expand: true,
                cwd: 'cache/',
                src: '*.css',
                dest: 'dist/',
                ext: '.min.css',
                extDot: 'last'
            },
            js: {
                expand: true,
                cwd: 'src/js/',
                src: '*.js',
                dest: 'dist/'
            }
        },
        removelogging: {
            dist: {
                expand: true,
                cwd: 'src/js/',
                src: '*.js',
                dest: 'cache/'
            }
        },
        uglify: {
            dist: {
                expand: true,
                cwd: 'cache/',
                src: '*.js',
                dest: 'dist/',
                ext: '.min.js',
                extDot: 'last'
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'src/scss/',
                    cssDir: 'dist/',
                    noLineComments: true
                }
            },
            prod: {
                options: {
                    sassDir: 'src/scss/',
                    cssDir: 'cache/',
                    environment: 'production'
                }
            }
        },
        usebanner: {
            options: {
                position: 'top',
                linebreak: true
            },
            dev: {
                options: {
                    banner: '/**\n' +
                    ' * jQuery Schedule v<%= package.version %>\n' +
                    ' * <%= package.homepage %>\n' +
                    ' * <%= package.author.name %> <<%= package.author.email %>>\n' +
                    ' */'
                },
                expand: true,
                cwd: 'dist/',
                src: [
                    '*.js',
                    '*.css',
                    '!*.min.js',
                    '!*.min.css'
                ]
            },
            prod: {
                options: {
                    banner: '/** jQuery Schedule v<%= package.version %> | <%= package.homepage %> */'
                },
                expand: true,
                cwd: 'dist/',
                src: [
                    '*.min.js',
                    '*.min.css'
                ]
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['copy:js']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['compass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'compass:prod',
        'compass:dev',
        'copy:js',
        'copy:css',
        'removelogging',
        'uglify',
        'usebanner:dev',
        'usebanner:prod'
    ]);
};
