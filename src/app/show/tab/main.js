/**
 * @file 消息展示模块主文件
 * @author conanmy
 */
angular.module('showTab', [])
    .controller('showTabCtrl', function($scope, $http) {
        $scope.changeTab = function(categoryId) {
            // me.vmodel.$fire('reloadTab', {categoryId: categoryId});
        };
    });