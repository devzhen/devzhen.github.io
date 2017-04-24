(function (ngModule) {

    ngModule.controller('StickerController', ['$scope', '$element', 'stickerServiceDOM', function ($scope, $element, stickerServiceDOM) {

        this.setBoard = function (board) {
            $scope.board = board;
        };

        $scope.getBoard = function () {
            return $scope.board;
        };

        this.addSticker = function ($event) {
            stickerServiceDOM.createBigSticker($element, $event);
        };

        this.deleteSticker = function ($event) {
            stickerServiceDOM.prepareDeleteSmallSticker($element, $event);
        };
    }]);

})(angular.module('cleonApp'));