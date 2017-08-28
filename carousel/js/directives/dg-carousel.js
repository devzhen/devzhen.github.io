(function (angular) {

    angular.module('dgCarousel')

        .directive('dgCarousel', ['$document', '$window', '$rootScope', function ($document, $window, $rootScope) {

            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {

                    /*Кнопка - предыдущий слайд*/
                    var prevSlide = $element[0].firstElementChild;

                    /*Кнопка - следующий слайд*/
                    var nextSlide = $element[0].lastElementChild;

                    /*Окно слайда*/
                    var slideWindow = document.querySelector('div.dg-slide-window');

                    /*Контейнер слайдов*/
                    var slideContainer = document.querySelector('div.dg-slide-container');

                    /*Установить позиции кнопок на странице*/
                    setControlButtonsPosition(slideWindow, prevSlide, nextSlide);

                    /*При изменении масштаба установить позиции кнопок на странице*/
                    angular.element($window).on('resize', function () {

                        $rootScope.$broadcast('dg-select', {
                            select: $scope.activeSlide
                        });

                        setControlButtonsPosition(slideWindow, prevSlide, nextSlide);

                    });

                    /*При раскрытии navbar на малых экранах перерисовать кнопки */
                    angular.element($document).on('shown.bs.collapse', function (e) {
                        setControlButtonsPosition(slideWindow, prevSlide, nextSlide);
                    });

                    /*При скрытии navbar на малых экранах перерисовать кнопки */
                    angular.element($document).on('hidden.bs.collapse', function (e) {
                        setControlButtonsPosition(slideWindow, prevSlide, nextSlide);
                    });

                    $element.on('click', function (e) {

                        /*Если это кнопка - 'предыдущий слайд'*/
                        if (e.target === document.getElementById('prev')) {

                            /*Если это первый слайд*/
                            if ($scope.activeSlide === 0) {

                                slideContainer.style.marginLeft = '50px';
                                setTimeout(function () {
                                    slideContainer.style.marginLeft = 0;
                                }, 400);
                                return;
                            }

                            /*Оповестить о выборе*/
                            $rootScope.$broadcast('dg-select', {
                                select: --$scope.activeSlide
                            })
                        }

                        /*Если это кнопка - 'следующий слайд'*/
                        if (e.target === document.getElementById('next')) {

                            /*Если это последний слайд*/
                            if ($scope.activeSlide === $scope.countSlides - 1) {

                                slideContainer.style.marginLeft = 0 - $scope.activeSlide * slideContainer.children[0].offsetWidth - 50 + 'px';
                                setTimeout(function () {
                                    slideContainer.style.marginLeft = 0 - $scope.activeSlide * slideContainer.children[0].offsetWidth + 'px';
                                }, 400);
                                return;
                            }

                            /*Оповестить о выборе*/
                            $rootScope.$broadcast('dg-select', {
                                select: ++$scope.activeSlide
                            })

                        }

                    });
                }
            };

        }]);


    /**
     * Установить позицию кнопок prev и next отностительно элемента slide
     */
    function setControlButtonsPosition(slide, prev, next) {

        prev.classList.add('visible');
        next.classList.add('visible');

        prev.style.top = getCoords(slide).top + slide.offsetHeight / 2 - prev.offsetHeight / 2 + 'px';
        prev.style.left = getCoords(slide).left - prev.offsetWidth + 'px';

        next.style.top = getCoords(slide).top + slide.offsetHeight / 2 - next.offsetHeight / 2 + 'px';
        next.style.left = getCoords(slide).left + slide.offsetWidth + 'px';



    }
})(window.angular);