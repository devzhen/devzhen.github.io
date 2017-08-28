(function (angular) {

    var ngModule = angular.module('cleonApp', ['modalApp', 'draggableApp', 'imagePopupApp']);


    ngModule.run(['$rootScope', 'modalService', 'stickerServiceJSON', function ($rootScope, modalService, stickerServiceJSON) {

        $rootScope.FIRST_SCREEN = 1;
        $rootScope.SECOND_SCREEN = 2;
        $rootScope.THIRD_SCREEN = 3;

        $rootScope.FIRST_UET = 1;
        $rootScope.SECOND_UET = 2;
        $rootScope.THIRD_UET = 3;
        $rootScope.FOURTH_UET = 4;
        $rootScope.FIFTH_UET = 5;
    }]);

})(window.angular);

