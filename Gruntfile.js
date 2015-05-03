module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['copy', 'less:combine', 'concat:index']);

    grunt.initConfig({
        distdir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            src: {
                files: [{ dest: '<%= distdir %>/app/', src : '**', expand: true, cwd: 'src/app/' }]
            },
            asset: {
                files: [{ dest: '<%= distdir %>/asset/', src : '**', expand: true, cwd: 'src/asset/' }]
            },
            dep: {
                files: [
                    { dest: '<%= distdir %>/angular.js', src : 'dep/angularjs/angular.js' },
                    { dest: '<%= distdir %>/angular-ui-router.js', src : 'dep/ui-router/release/angular-ui-router.js' },
                    { dest: '<%= distdir %>/jquery.js', src : 'dep/jquery/dist/jquery.min.js' }
                ]
            }
        },
        less: {
            combine: {
                options: {
                    path: ['src/less/', 'src/app/']
                },
                files: {
                    '<%= distdir %>/<%= pkg.name %>.css': 'src/less/main.less'
                }
            }
        },
        html2js: {

        },
        concat: {
            index: {
                src: ['src/index.html'],
                dest: '<%= distdir %>/index.html',
                options: {
                    process: true
                }
            }
        }
    });
};