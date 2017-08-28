(function (angular) {

    angular.module('dgCarousel')

        .directive('dgSlideContainer', ['$document', '$rootScope', function ($document, $rootScope) {

            return {
                restrict: 'A',
                link: function ($scope, $element, $attrs) {

                    /*Кол-во слайдов*/
                    $scope.countSlides = $element[0].children.length;

                    /*Текущий активный слайд*/
                    $scope.activeSlide = 0;

                    /*Текущий отступ контейнера слайдов*/
                    $scope.currentMarginLeft = 0;


                    /*Координаты контейнера слайдов относительно страницы*/
                    var element_coords = getCoords($element[0]);

                    /*Минимальное значение margin-left, которое может быть у контейнера слайдов*/
                    var minMarginLeft = 0 - (($scope.countSlides - 1) * $element[0].children[0].offsetWidth);

                    /*Максимальное значение margin-left, которое может быть у контейнера слайдов*/
                    var maxMarginLeft = 0;

                    /*Позиция курсора мыши при mousedown*/
                    var startX;


                    /*Обработка события выбора слайда*/
                    $scope.$on('dg-select', function (event, data) {

                        /*Текущий активный слайд*/
                        $scope.activeSlide = data.select;

                        /*Вычисление значения margin-left исходя их ширины слайдов и текущего выбранного слайда*/
                        var marginLeft = 0 - $element[0].children[0].offsetWidth * $scope.activeSlide;

                        /*Установка положения элемента*/
                        $element.css('margin-left', marginLeft);

                        /*Запромнить отступ элемента*/
                        $scope.currentMarginLeft = marginLeft;

                    });

                    $element.on('mousedown', function (event) {

                        event.preventDefault();

                        /*Удаление класса анимации*/
                        $element[0].classList.remove('dg-slides-margin-transition');

                        /*Позиция курсора мыши*/
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
                        $element[0].classList.add('dg-slides-margin-transition');

                        /*Проверка крайних позиций элемента*/
                        checkMinMaxPosition($element[0], minMarginLeft, maxMarginLeft);

                        /*Нужно ли сменить слайд по окончании dragNdrop*/
                        var mustBeActiveSlide = checkSlidePosition($element[0], $scope.currentMarginLeft, $scope.activeSlide, $scope.countSlides);

                        /*Если активный слайд изменился*/
                        if (mustBeActiveSlide !== $scope.activeSlide) {

                            /*Оповестить о выборе*/
                            $rootScope.$broadcast('dg-select', {
                                select: mustBeActiveSlide
                            })
                        }

                    }
                }
            };

        }]);


    /**
     * Проверка крайних значений margin-left у элемента
     * и корректировка положения на странице
     * @param elem. Контейнер слайдов.
     * @param min. Минимальное значение margin-left у контейнера слайдов.
     * @param max. Максимальное значение margin-left у контейнера слайдов.
     */
    function checkMinMaxPosition(elem, min, max) {

        var marginLeft = parseInt(elem.style.marginLeft);

        if (marginLeft < min) {
            elem.style.marginLeft = min + 'px';
        }

        if (marginLeft > max) {
            elem.style.marginLeft = max + 'px';
        }
    }


    /**
     * Нужно ли сменить слайд по окончании dragNdrop.
     * @param elem. Контейнер слайдов.
     * @param prevMarginLeft. Предыдущее значение отступа margin-left.
     * @param activeSlide. Текущий активный слайд.
     * @param countSlides. Общее кол-во слайдов.
     * @return number. Номер вычисленного активного слайда после окончании dragNdrop.
     */
    function checkSlidePosition(elem, prevMarginLeft, activeSlide, countSlides) {

        /*Текущий отступ элемента на странице*/
        var marginLeft = parseInt(elem.style.marginLeft);

        /*Движение влево*/
        if (marginLeft > prevMarginLeft) {

            if (activeSlide !== 0) {

                return --activeSlide;
            }

            return 0;

        } else if (marginLeft < prevMarginLeft) {   /*Движение вправо*/

            if (activeSlide !== countSlides - 1) {

                return ++activeSlide;
            }

            return countSlides - 1;

        } else {                /*Если движение не произошло*/
            return activeSlide;
        }
    }
})(window.angular);