/**
 * @file 账户消息主文件
 * @author mayue@baidu.com
 */
angular.module('showList', [])
    .controller('showListCtrl', function($scope, $http) {
        $scope.changeStatus = function(status) {
            changeLoadParams(vmodel, {
                status: status,
                page: 1
            });
        };
        
        $scope.changeTag = function(tagId) {
            changeLoadParams(vmodel, {
                tagId: tagId,
                page: 1
            });
        };
        
        $scope.changePage = function(page) {
            changeLoadParams(vmodel, {
                page: page
            }, true);
        };
        
        $scope.checkIt = function(index) {
            vmodel.message.list[index].checked = this.checked;

            var $checkAll = $('#check-all-message');

            var checkedNum = 0;
            var list = vmodel.message.list;
            for (var i = 0; i < list.length; i ++) {
                var item = list[i];
                if (item.checked === true) {
                    checkedNum ++;
                }
            }

            if (this.checked === true) {
                if (checkedNum === 1) {
                    $('#mark-message-read').removeClass('disable');
                }
                if (checkedNum === list.length) {
                    $checkAll.prop('checked', true);
                }
            } else {
                if (checkedNum === (list.length - 1)) {
                    $checkAll.prop('checked', false);
                }
                if (checkedNum === 0) {
                    $('#mark-message-read').addClass('disable');
                }
            }
        };
        
        $scope.markRead = function() {
            var checkedMessageIds = [];
            var modTypeIds = [];
            var list = vmodel.message.list;
            for (var i = 0; i < list.length; i ++) {
                var item = list[i];
                if (item.checked === true) {
                    checkedMessageIds.push(item.msgId);
                    if (+item.status === 1) {
                        modTypeIds.push(item.typeid);
                    }
                }
            }
            if (checkedMessageIds.length > 0) {
                $.request(
                    'sendMessageRead',
                    {
                        messages: checkedMessageIds
                    }
                ).done(function() {
                    changeLoadParams(vmodel);
                    bizLog.send({
                        target: 'view',
                        subTarget: 'batch-mark-success',
                        typeid: checkedMessageIds.join(',')
                    });
                    if (modTypeIds.length > 0) {
                        _.each(modTypeIds, function(item) {
                            bizLog.send({
                                target: 'view',
                                subTarget: 'mark-success',
                                typeid: item
                            });
                        });
                    }
                });
            }
        };
        
        $scope.checkAll = function() {
            $('.message-list input').prop('checked', this.checked);
            var list = vmodel.message.list;
            for (var i = 0; i < list.length; i ++) {
                var item = list[i];
                item.checked = this.checked;
            }

            var actionName = (this.checked ? 'remove' : 'add') + 'Class';
            $('#mark-message-read')[actionName]('disable');
        };

        $scope.handleMessageClick = function(item, index) {
            vmodel.markIt(index);
            vmodel.takeAction(item);
        };

        $scope.markIt = function(index) {
            var message = vmodel.message.list[index];
            if (+message.status === 2) {
                return;
            }

            $.request(
                'sendMessageRead',
                {
                    messages: [message.msgId]
                }
            ).done(
                function() {
                    changeLoadParams(vmodel);
                    bizLog.send({
                        target: 'view',
                        subTarget: 'mark-success',
                        typeid: message.typeid
                    });
                }
            );
        };

        $scope.markAllRead = function() {
            $.request(
                'sendAllMessageRead',
                {
                    categoryId: vmodel.categoryId
                }
            ).done(function() {
                changeLoadParams(vmodel);
            });
        };

        $scope.takeAction = function(message) {
            var action = message.action;
            switch(action) {
                case 1:
                    if (+message.status === 2) {
                        return;
                    }
                    $.request(
                        'sendWireMarketingApply'
                    ).done(function() {
                        var alert = new Modal({
                            id: 'idea-message-apply-success',
                            title: '提示',
                            content: '申请成功，客服稍后联系您。',
                            type: 'alert'
                        });
                        alert.show();
                    });
                    break;
            }
        };
    });

    /**
     * 改变参数，触发重新加载
     * @param  {Obejct} params 参数
     * @param {number} params.page 要进入的页码
     * @param {number} params.tagId 要获取的tagId
     * @param {number} params.status 要获取的status 已读1/未读0/全部2
     * @param {boolean} scrollToTop 刷新后定位到顶部
     */
    /*function changeLoadParams(vmodel, params, scrollToTop) {
        var currentParams = {
            categoryId: vmodel.categoryId,
            page: vmodel.message.currentPage,
            status: vmodel.message.currentStatus,
            tagId: vmodel.message.currentTagId
        };

        for (var key in params) {
            currentParams[key] = params[key];
        }

        if (scrollToTop) {
            currentParams.scrollToTop = true;
        }

        vmodel.$fire('reloadTab', currentParams);
    }*/