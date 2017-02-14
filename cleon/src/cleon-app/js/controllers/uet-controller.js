(function (module) {

    module.controller('UetController', ['$scope', 'stickerServiceDOM', function ($scope, stickerServiceDOM) {
        $scope.currentUet = 1;

        this.isSetUet = function (uet) {
            return (uet == $scope.currentUet);
        };

        this.setUet = function (uet) {
            $scope.currentUet = uet;
            stickerServiceDOM.appendDraggableAreas($scope.currentUet);
        };

        $scope.getCurrentUet = function () {
            return $scope.currentUet;
        }
    }]);

})(angular.module('cleonApp'));