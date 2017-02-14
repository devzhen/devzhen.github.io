var module = angular.module('cleonApp');

module.directive('stickerSmall', ['stickerServiceDOM', function (stickerServiceDOM) {
    return {
        restrict: 'E',
        replace: true,
        controller: function ($scope, $element) {
            $scope.date = '24.10.16 14:47';
            $scope.comment = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
            $scope.author = 'J.Martin';
            $scope.screen = $scope.getCurrentScreen();

            if ($scope.getCurrentUet) {
                $scope.uet = $scope.getCurrentUet();
            } else {
                $scope.uet = null;
            }
            $scope.board = $scope.getBoard();

            $scope.edit = function () {
                stickerServiceDOM.prepareEditSmallSticker($element, $scope);
            };

            $scope.delete = function () {
                stickerServiceDOM.deleteSmallSticker($element);
            };
        },
        template: '<div my-draggable class="stiket">' +
        '<div class="stiket-date">{{date | date:"dd-MM-yyyy HH:mm:ss"}}</div>' +
        '<div class="stiket-pole">' +
        '<p></p>' +
        '</div>' +
        '<div class="stiket-bottom">' +
        '<div class="stiket-name">{{author}}</div>' +
        '<div class="stiket-reg">' +
        '<img id="edit" src="../../images/reg.png" alt="#" ng-click="edit()">' +
        '</div>' +
        '<div class="stiket-del">' +
        '<img id="delete" src="../../images/del.png" alt="#" ng-click="delete()">' +
        '</div>' +
        '</div>' +
        '</div>',
        link: function ($scope, $element) {
            $element.on('mouseover', function (event) {
                if (event.target == $element.find('#edit')[0]) {
                    $element.css('cursor', 'pointer');
                    $element.find('#edit').attr('src', 'cleon-app/images/reg-hover.png');
                }
            });

            $element.on('mouseout', function (event) {
                if (event.target == $element.find('#edit')[0]) {
                    $element.css('cursor', 'default');
                    $element.find('#edit').attr('src', 'cleon-app/images/reg.png');
                }
            });

            // custom scrollbar
            $element.find('.stiket-pole').niceScroll({
                cursorcolor: "#eb6529",
                autohidemode:false,
                cursorwidth: "10px",
                disablemutationobserver: true
            });
        }
    };
}]);