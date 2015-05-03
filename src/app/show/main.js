/**
 * @file 消息展示模块主文件
 * @author conanmy
 */
angular.module('show', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
            .state('show', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'show/main.html'
                    },
                    'tab': {
                        templateUrl: 'show/tab/main.html',
                        controller: 'showTabCtrl'
                    },
                    'list': {
                        templateUrl: 'show/list/main.html',
                        controller: 'showListCtrl'
                    }
                }
            });
    });
