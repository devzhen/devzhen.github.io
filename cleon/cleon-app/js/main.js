(function (angular) {

    var module = angular.module('cleonApp', ['modalApp', 'draggableApp', 'imagePopupApp']);

    module.run(['$rootScope', 'modalService', 'stickerServiceJSON', function ($rootScope, modalService, stickerServiceJSON) {

        $rootScope.FIRST_SCREEN = 1;
        $rootScope.SECOND_SCREEN = 2;
        $rootScope.THIRD_SCREEN = 3;

        $rootScope.FIRST_UET = 1;
        $rootScope.SECOND_UET = 2;
        $rootScope.THIRD_UET = 3;
        $rootScope.FOURTH_UET = 4;
        $rootScope.FIFTH_UET = 5;


        /* var req = new XMLHttpRequest();
         req.open('GET', document.location, false);
         req.send(null);
         var headers = req.getAllResponseHeaders().toLowerCase();
         console.log(headers);*/

        // ctrl + shift + s
        angular.element(document).on('keypress', function (e) {
            if (e.shiftKey && e.ctrlKey && e.keyCode == 19) {
                console.log(stickerServiceJSON.getAllStickersJSON());
            }
        });
    }]);


})(window.angular);