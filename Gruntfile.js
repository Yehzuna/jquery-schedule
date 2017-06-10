module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                'dist/'
            ]
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
        uglify: {
            dist: {
                expand: true,
                cwd: 'src/js/',
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
                    cssDir: 'dist/'
                }
            },
            prod: {
                options: {
                    sassDir: 'src/scss/',
                    cssDir: 'cache/',
                    environment: 'production'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'clean',
        'compass:prod',
        'compass:dev',
        'copy:js',
        'copy:css',
        'uglify'
    ]);
};