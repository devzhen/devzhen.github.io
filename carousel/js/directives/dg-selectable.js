(function (angular) {

    var module = angular.module('dgCarousel');

    module.directive('dgSelectable', ['$rootScope', function ($rootScope) {

        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {

                $scope.$on('dg-select', function (event, data) {

                    /*Если это выбранный элемент*/
                    if (data.select === parseInt($attrs.dgSelectable)) {

                        /*Установить иконку выбора над элементом*/
                        $element.parent().find('.choice').css('display', 'block');

                    } else {

                        /*Спрятать иконку выбора над элементом*/
                        $element.parent().find('.choice').css('display', 'none');
                    }



                });


                $element.on('click', function (e) {

                    /*Оповестить о выборе*/
                    $rootScope.$broadcast('dg-select', {
                        select: parseInt($attrs.dgSelectable)
                    })

                });
            }
        };
    }]);

})(window.angular);