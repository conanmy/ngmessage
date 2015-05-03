$('.main-tab-item').on('click', function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
});

angular.module('app', ['show', 'setting']);

angular.bootstrap(document, ['app']);

// 初始化auth信息
//initEnv();

/*
$.request('getAuth').done(function(result) {
    var data = result.data;
    env.set('optname', data.optname);
    env.set('optulevelid', data.optulevelid);
    env.set('systemType', data.systemType);
    env.set('optregappid', data.optregappid);
});
*/

/**
 * 初始化环境信息
 * @param  {Object} info 需要设置的环境信息
 *
 * @inner
 */
function initEnv(){
    /**
     * 初始化env信息
     */
    var urlParams = util.queryToJson(location.search);
    $.each(urlParams, function(key, value) {
        env.set(key, value);
    });
    env.set('token', $.cookie('__cas__st__3'));
}