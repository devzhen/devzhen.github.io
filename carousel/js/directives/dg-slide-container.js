(function (angular) {

    angular.module('testCarousel')

        .directive('dgSlideContainer', ['$document', function ($document) {

            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {

                    /*Кол-во слайдов*/
                    $scope.countSlides = $element[0].children.length;

                    /*Текущий активный слайд*/
                    $scope.activeSlide = 0;



                    /*Координаты элемента отностительно страницы*/
                    var element_coords = getCoords($element[0]);

                    /*Минимальное значение margin-left, которое может быть у элемента*/
                    var minMarginLeft = 0 - (($scope.countSlides - 1) * $element[0].children[0].offsetWidth);

                    /*Максимальное значение margin-left, которое может быть у элемента*/
                    var maxMarginLeft = 0;

                    /*Позиция курсора мыши при mousedown*/
                    var startX;



                    /*При выборе слайда в navbar*/
                    $scope.$on('dg-select', function (event, data) {

                        /*Текущий активный слайд*/
                        $scope.activeSlide = data.select;

                        /*Вычисление значения margin-left исходя их ширины слайдов и текущего выбранного слайда*/
                        var marginLeft = 0 - $element[0].children[0].offsetWidth * $scope.activeSlide;

                        $element.css('margin-left', marginLeft);

                    });

                    $element.on('mousedown', function (event) {

                        event.preventDefault();

                        /*Удаление класса анимации*/
                        $element[0].classList.remove('slides-margin-transition');

                        startX = event.pageX;

                        $document.on('mousemove', mousemove);
                        $document.on('mouseup', mouseup);
                    });

                    function mousemove(event) {

                        if (event.pageX >= element_coords.left &&
                            event.pageX <= element_coords.right &&
                            event.pageY >= element_coords.top &&
                            event.pageY <= element_coords.bottom
                        ) {

                            /*Определение текущего отступа*/
                            var marginLeft = parseInt($element.css('margin-left'));

                            /*Кол-во пискселей, которые были draggable*/
                            var offset = event.pageX - startX;

                            /*Новое значение отступа*/
                            marginLeft = marginLeft + offset;

                            /*Применение отступа к элементу*/
                            $element.css('margin-left', marginLeft);

                            startX = event.pageX;

                        }
                    }

                    function mouseup() {

                        $document.off('mousemove', mousemove);
                        $document.off('mouseup', mouseup);

                        /*Добавление класса анимации*/
                        $element[0].classList.add('slides-margin-transition');

                        checkPosition($element[0], minMarginLeft, maxMarginLeft);
                    }
                }
            };

        }]);


    /**
     * Проверка значения margin-left у элемента
     * и корректировка положения на странице
     */
    function checkPosition(elem, min, max) {

        var marginLeft = parseInt(elem.style.marginLeft);

        if (marginLeft < min) {
            elem.style.marginLeft = min + 'px';
        }

        if (marginLeft > max) {
            elem.style.marginLeft = max + 'px';
        }
    }


})(window.angular);