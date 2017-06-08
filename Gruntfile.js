module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: [
                'dist/'
            ]
        },
        copy: {
            dist: {
                expand: true,
                cwd: 'src/js/',
                src: '*.js',
                dest: 'dist/'
            }
        },
        compass: {
            dev: {
                options: {
                    specify: 'src/scss/*.scss',
                    sassDir: 'src/scss/',
                    cssDir: 'dist/',
                    imagesDir: 'dist/img/',
                    fontsDir: 'dist/fonts/',
                    spriteLoadPath: 'src/img/',
                    httpGeneratedImagesPath: "../img/",
                    httpFontsPath: "../fonts/"
                }
            },
            prod: {
                options: {
                    sassDir: 'src/scss/',
                    cssDir: 'dist/css/',
                    imagesDir: 'dist/img/',
                    fontsDir: 'dist/fonts/',
                    spriteLoadPath: 'src/img/',
                    httpGeneratedImagesPath: "../img/",
                    httpFontsPath: "../fonts/",
                    environment: 'production'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dev', [
        'clean',
        'compass:dev',
        'copy'
    ]);

    grunt.registerTask('prod', [
        'clean',
        'copy',
        'compass:prod',
        'concat',
        'uglify'
    ]);
};