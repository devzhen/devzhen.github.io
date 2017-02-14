(function (module) {

    module.directive('imagePopupSrc', ['$document', '$http', 'modalService', function ($document, $http, modalService) {

        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {

                var url = $attrs.imagePopupSrc;
                $element.css({
                    cursor: 'pointer'
                });

                $element.on('click', function (event) {

                    if (!url || url == '') {
                        return;
                    }

                    $http({
                        method: 'GET',
                        url: url,
                        responseType: 'arraybuffer'
                    }).then(function successCallback(response) {

                        var blob = new Blob([response.data]);
                        var imgUrl = window.URL.createObjectURL(blob);

                        var $body = angular.element(document.body);

                        /*Установка модального фона*/
                        modalService.createBackground();

                        /*image-popup*/
                        var fancyImg = angular.element('<img id="fancyImg" src="' + imgUrl + '"/>');
                        $body.append(fancyImg);

                        fancyImg.on('load', function () {

                            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

                            var left = document.documentElement.clientWidth / 2 + scrollLeft - fancyImg.outerWidth() / 2;
                            var top = document.documentElement.clientHeight / 2 + scrollTop - fancyImg.outerHeight() / 2;
                            fancyImg.css({
                                'display': 'block',
                                'position': 'absolute',
                                'z-index': 1000,
                                'border': '10px solid white',
                                'left': left,
                                'top': top
                            });

                            /*close-button*/
                            var closeButton = angular.element('<img id="closeButton" src="src/image-animate-app/images/exit.png"/>');
                            $body.append(closeButton);

                            closeButton.on('load', function () {
                                var left = parseFloat(fancyImg.css('left')) + fancyImg.outerWidth() - closeButton.outerWidth() / 2;
                                var top = parseFloat(fancyImg.css('top')) - closeButton.outerWidth() / 2;
                                closeButton.css({
                                    'display': 'block',
                                    'position': 'absolute',
                                    'z-index': 1000,
                                    'left': left,
                                    'top': top,
                                    'cursor': 'pointer'
                                });
                            });

                            angular.element(window).on('resize', setPosition);
                            angular.element(window).on('scroll', setPosition);
                        });


                        $document.on('click', onmouseclick);

                        function setPosition(event) {

                            var closeButton = angular.element('#closeButton');

                            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

                            var left = document.documentElement.clientWidth / 2 + scrollLeft - fancyImg.outerWidth() / 2;
                            var top = document.documentElement.clientHeight / 2 + scrollTop - fancyImg.outerHeight() / 2;

                            fancyImg.css({
                                top: top,
                                left: left
                            });

                            left = parseFloat(fancyImg.css('left')) + fancyImg.outerWidth() - closeButton.outerWidth() / 2;
                            top = parseFloat(fancyImg.css('top')) - closeButton.outerWidth() / 2;

                            closeButton.css({
                                'left': left,
                                'top': top
                            });
                        }

                        function onmouseclick(event) {
                            modalService.removeBackground();
                            fancyImg.remove();
                            angular.element('#closeButton').remove();
                            angular.element(window).off('resize', setPosition);
                            angular.element(window).off('scroll', setPosition);
                            $document.off('click', onmouseclick);
                        }
                    });
                });

            }
        };
    }]);

    module.directive('imageWidthTransition', [function () {

        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                $scope.isTransition = false;
                $scope.width = $element.css('width');

                $element.on('click', function () {

                    if (!$attrs.imageWidthTransition || $attrs.imageWidthTransition == '') {
                        return;
                    }

                    if ($scope.isTransition) {
                        $element.css({
                            'width': $scope.width,
                            'transition': 'width 2s'
                        });
                        $scope.isTransition = false;
                    } else {

                        var width = $attrs.imageWidthTransition;
                        $element.css({
                            'width': width,
                            'transition': 'width 2s'
                        });
                        $scope.isTransition = true;
                    }
                });
            }
        };
    }]);

})(angular.module('imagePopupApp', []));