(function (ngModule) {
    ngModule.controller('ScreenController', ['$scope', function ($scope) {
        $scope.currentScreen = 2;

        this.isSetScreen = function (screen) {
            return (screen == $scope.currentScreen);
        };

        this.setScreen = function (screen) {
            $scope.currentScreen = screen;
        };

        $scope.getCurrentScreen = function () {
            return $scope.currentScreen;
        }
    }]);

})(angular.module('cleonApp'));