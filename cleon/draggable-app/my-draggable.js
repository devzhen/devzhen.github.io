(function (module) {

    module.directive('myDraggable', ['$document', 'modalService', 'stickerServiceJSON', function ($document, modalService, stickerServiceJSON) {

        return {
            restrict: 'A',
            controller: ['$scope', '$element', function ($scope, $element) {
                if ($scope.screen == 1) {
                    $scope.drag_areas = ['drag-area1', 'drag-area2', 'drag-area3'];
                    $scope.stickerPositionVerificationFunction = screen1PositionVerification;
                }
                if ($scope.screen == 2 && $scope.board == 'left') {
                    $scope.drag_areas = ['drag-area4', 'drag-area5', 'drag-area6'];
                    $scope.stickerPositionVerificationFunction = screen2LeftPositionVerification;
                }
                if ($scope.screen == 3 && $scope.board == 'left') {
                    $scope.drag_areas = ['drag-area7', 'drag-area8'];
                    $scope.stickerPositionVerificationFunction = screen3LeftPositionVerification;
                }
                if ($scope.screen == 2 && $scope.board == 'right') {
                    $scope.drag_areas = ['drag-area9', 'drag-area10', 'drag-area11', 'drag-area12'];
                    $scope.stickerPositionVerificationFunction = screen2RightPositionVerification;
                }
                if ($scope.screen == 3 && $scope.board == 'right') {
                    $scope.drag_areas = ['drag-area13', 'drag-area14', 'drag-area15', 'drag-area16'];
                    $scope.stickerPositionVerificationFunction = screen3RightPositionVerification;
                }
            }],
            link: function ($scope, element, attr) {

                var startX = 0, startY = 0, x = 0, y = 0;

                $scope.parent = element.parent();

                element.on('mousedown', function (event) {

                    var btnEdit = element.find('#edit');
                    if (btnEdit.length != 0 && event.target == btnEdit[0]) {
                        return true;
                    }

                    var btnDel = element.find('#delete');
                    if (btnDel.length != 0 && event.target == btnDel[0]) {
                        return true;
                    }

                    // Prevent default dragging of selected content
                    event.preventDefault();

                    identifyParent(element[0], $scope.parent[0], $scope.drag_areas);

                    // custom scroll bar
                    element.find('.stiket-pole').getNiceScroll().resize();
                    element.find('.stiket-pole').getNiceScroll().hide();

                    element.css('cursor', 'move');

                    startX = event.clientX - element.offset().left;
                    startY = event.clientY - element.offset().top;

                    element.parent().append(element);
                    stickerServiceJSON.moveStickerToEnd(element);

                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {

                    // custom scroll bar
                    element.find('.stiket-pole').getNiceScroll().hide();

                    y = event.clientY - startY;
                    x = event.clientX - startX;

                    element.offset({top: y, left: x});

                    // Определение родительского контейнера
                    $scope.stickerPositionVerificationFunction(element[0], $scope.parent[0]);

                    // Ограничение положения внутри родительского контейнера
                    checkPositionByParent(element[0]);

                }

                function mouseup(event) {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);

                    $scope.top = element[0].offsetTop + element[0].offsetParent.clientTop + element[0].offsetParent.offsetTop;
                    $scope.left = element[0].offsetLeft + element[0].offsetParent.clientLeft + element[0].offsetParent.offsetLeft;

                    element.css({
                        'cursor': 'default'
                    });

                    element[0].style.left = $scope.left + 'px';
                    element[0].style.top = $scope.top + 'px';

                    $scope.parent.append(element);
                    $scope.top = parseInt(element.css('top'));
                    $scope.left = parseInt(element.css('left'));

                    stickerServiceJSON.updateStickerPosition(element);

                    prependDragAreasBeforeStickers($scope.parent[0], $scope.drag_areas);

                    // custom scroll bar
                    element.find('.stiket-pole').getNiceScroll().show();
                    element.find('.stiket-pole').getNiceScroll().resize();
                }


            }
        };
    }]);

    function getCoords(elem) {
        // (1)
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        // (2)
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        // (3)
        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        // (4)
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left,
            right: left + elem.offsetWidth,
            bottom: top + elem.offsetHeight
        };
    }

    function checkPositionByParent(elem) {

        elem.offsetTop < 0 ? elem.style.top = 0 : true;
        elem.offsetLeft < 0 ? elem.style.left = 0 : true;

        var parent = elem.parentElement;

        var elemRight = elem.offsetLeft + elem.offsetWidth;
        var elemBottom = elem.offsetTop + elem.offsetHeight;

        if (elemRight > parent.clientWidth) {
            elem.style.left = parent.offsetWidth - parent.clientLeft - elem.offsetWidth - 2 + 'px';
        }

        if (elemBottom > parent.clientHeight) {
            elem.style.top = parent.clientHeight - elem.offsetHeight - 2 + 'px';
        }

        return true;
    }

    function identifyParent(elem, container, drag_areas_id) {

        for (var i = 0; i < drag_areas_id.length; i++) {

            var drag_area = document.getElementById(drag_areas_id[i]);

            if (elem.offsetTop >= drag_area.offsetTop &&
                elem.offsetLeft >= drag_area.offsetLeft &&
                elem.offsetLeft + elem.offsetWidth <= drag_area.offsetLeft + drag_area.offsetWidth &&
                elem.offsetTop + elem.offsetHeight <= drag_area.offsetTop + drag_area.offsetHeight) {

                var top = elem.offsetTop - drag_area.offsetTop - drag_area.clientTop;
                var left = elem.offsetLeft - drag_area.offsetLeft - drag_area.clientLeft;
                container.appendChild(drag_area);
                if (top >= 0 && left >= 0) {
                    elem.style.left = left + 'px';
                    elem.style.top = top + 'px';
                }

                drag_area.appendChild(elem);

                return drag_area;
            }
        }

        return false;
    }

    function prependDragAreasBeforeStickers(container, drag_areas_id) {

        var firstSticker = container.getElementsByClassName('stiket')[0];

        for (var i = 0; i < drag_areas_id.length; i++) {

            var drag_area = document.getElementById(drag_areas_id[i]);
            container.insertBefore(drag_area, firstSticker);

        }
    }

    function screen1PositionVerification(elem, container) {
        var drag_area1 = document.getElementById('drag-area1');
        var drag_area2 = document.getElementById('drag-area2');
        var drag_area3 = document.getElementById('drag-area3');

        var elem_coords = getCoords(elem);
        var drag_area1_coords = getCoords(drag_area1);
        var drag_area2_coords = getCoords(drag_area2);
        var drag_area3_coords = getCoords(drag_area3);

        if (elem_coords.top >= drag_area2_coords.top &&
            elem_coords.left >= drag_area2_coords.left &&
            // elem_coords.right <= drag_area2_coords.right &&
            elem_coords.bottom <= drag_area2_coords.bottom) {

            var top = elem_coords.top - drag_area2_coords.top;
            var left = elem_coords.left - drag_area2_coords.left;
            container.appendChild(drag_area2);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area2.appendChild(elem);
        }

        if (elem_coords.bottom > drag_area2_coords.bottom &&
            elem_coords.right <= drag_area3_coords.right) {

            top = elem_coords.top - drag_area3_coords.top;
            left = elem_coords.left - drag_area3_coords.left;
            container.appendChild(drag_area3);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area3.appendChild(elem);
        }

        if (elem_coords.top < drag_area2_coords.top &&
            elem_coords.right <= drag_area1_coords.right) {

            top = elem_coords.top - drag_area1_coords.top;
            left = elem_coords.left - drag_area1_coords.left;
            container.appendChild(drag_area1);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area1.appendChild(elem);
        }

        return true;
    }

    function screen2LeftPositionVerification(elem, container) {

        var drag_area4 = document.getElementById('drag-area4');
        var drag_area5 = document.getElementById('drag-area5');
        var drag_area6 = document.getElementById('drag-area6');

        var elem_coords = getCoords(elem);
        var drag_area4_coords = getCoords(drag_area4);
        var drag_area5_coords = getCoords(drag_area5);
        var drag_area6_coords = getCoords(drag_area6);

        if (elem_coords.left >= drag_area6_coords.left &&
            elem_coords.top >= drag_area6_coords.top &&
            elem_coords.right > drag_area5_coords.right) {

            var top = elem_coords.top - drag_area6_coords.top;
            var left = elem_coords.left - drag_area6_coords.left;
            container.appendChild(drag_area6);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area6.appendChild(elem);
        }
        if (elem_coords.top >= drag_area4_coords.top &&
            elem_coords.left < drag_area6_coords.left &&
            elem_coords.bottom <= drag_area4_coords.bottom) {

            top = elem_coords.top - drag_area4_coords.top;
            left = elem_coords.left - drag_area4_coords.left;
            container.appendChild(drag_area4);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area4.appendChild(elem);
        }
        if (elem_coords.top < drag_area4_coords.top &&
            elem_coords.right <= drag_area5_coords.right) {

            top = elem_coords.top - drag_area5_coords.top;
            left = elem_coords.left - drag_area5_coords.left;
            container.appendChild(drag_area5);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area5.appendChild(elem);
        }
    }

    function screen3LeftPositionVerification(elem, container) {

        var drag_area7 = document.getElementById('drag-area7');
        var drag_area8 = document.getElementById('drag-area8');

        var elem_coords = getCoords(elem);
        var drag_area7_coords = getCoords(drag_area7);
        var drag_area8_coords = getCoords(drag_area8);

        if (elem_coords.top < drag_area8_coords.top &&
            elem_coords.right <= drag_area7_coords.right) {

            var top = elem_coords.top - drag_area7_coords.top;
            var left = elem_coords.left - drag_area7_coords.left;
            container.appendChild(drag_area7);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area7.appendChild(elem);
        }

        if (elem_coords.right > drag_area7_coords.right &&
            elem_coords.top >= drag_area8_coords.top) {

            top = elem_coords.top - drag_area8_coords.top;
            left = elem_coords.left - drag_area8_coords.left;
            container.appendChild(drag_area8);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area8.appendChild(elem);

        }
    }

    function screen2RightPositionVerification(elem, container) {
        var drag_area9 = document.getElementById('drag-area9');
        var drag_area10 = document.getElementById('drag-area10');
        var drag_area11 = document.getElementById('drag-area11');
        var drag_area12 = document.getElementById('drag-area12');

        var elem_coords = getCoords(elem);
        var drag_area9_coords = getCoords(drag_area9);
        var drag_area10_coords = getCoords(drag_area10);
        var drag_area11_coords = getCoords(drag_area11);
        var drag_area12_coords = getCoords(drag_area12);

        if (elem_coords.top < drag_area9_coords.top &&
            elem_coords.right <= drag_area10_coords.right) {

            var top = elem_coords.top - drag_area10_coords.top;
            var left = elem_coords.left - drag_area10_coords.left;
            container.appendChild(drag_area10);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area10.appendChild(elem);
        }

        if (elem_coords.top >= drag_area9_coords.top &&
            elem_coords.left >= drag_area9_coords.left &&
            elem_coords.right <= drag_area9_coords.right) {

            top = elem_coords.top - drag_area9_coords.top;
            left = elem_coords.left - drag_area9_coords.left;
            container.appendChild(drag_area9);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area9.appendChild(elem);
        }

        if (elem_coords.left < drag_area9_coords.left &&
            elem_coords.bottom <= drag_area10_coords.bottom) {

            top = elem_coords.top - drag_area10_coords.top;
            left = elem_coords.left - drag_area10_coords.left;
            container.appendChild(drag_area10);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area10.appendChild(elem);
        }


        if (elem_coords.right > drag_area9_coords.right &&
            elem_coords.top >= drag_area11_coords.top &&
            elem_coords.right <= drag_area11_coords.right) {

            top = elem_coords.top - drag_area11_coords.top;
            left = elem_coords.left - drag_area11_coords.left;
            container.appendChild(drag_area11);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area11.appendChild(elem);
        }

        if (elem_coords.right > drag_area11_coords.right &&
            elem_coords.bottom <= drag_area12_coords.bottom) {

            top = elem_coords.top - drag_area12_coords.top;
            left = elem_coords.left - drag_area12_coords.left;
            container.appendChild(drag_area12);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area12.appendChild(elem);
        }
    }

    function screen3RightPositionVerification(elem, container) {
        var drag_area13 = document.getElementById('drag-area13');
        var drag_area14 = document.getElementById('drag-area14');
        var drag_area15 = document.getElementById('drag-area15');
        var drag_area16 = document.getElementById('drag-area16');

        var elem_coords = getCoords(elem);
        var drag_area13_coords = getCoords(drag_area13);
        var drag_area14_coords = getCoords(drag_area14);
        var drag_area15_coords = getCoords(drag_area15);
        var drag_area16_coords = getCoords(drag_area16);

        if (elem_coords.top >= drag_area13_coords.top &&
            elem_coords.left >= drag_area13_coords.left &&
            elem_coords.right <= drag_area13_coords.right
        ) {

            var top = elem_coords.top - drag_area13_coords.top;
            var left = elem_coords.left - drag_area13_coords.left;
            container.appendChild(drag_area13);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area13.appendChild(elem);
        }

        if (elem_coords.top < drag_area13_coords.top &&
            elem_coords.right <= drag_area14_coords.right) {

            top = elem_coords.top - drag_area14_coords.top;
            left = elem_coords.left - drag_area14_coords.left;
            container.appendChild(drag_area14);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area14.appendChild(elem);
        }

        if (elem_coords.top >= drag_area15_coords.top &&
            elem_coords.bottom <= drag_area15_coords.bottom) {

            top = elem_coords.top - drag_area15_coords.top;
            left = elem_coords.left - drag_area15_coords.left;
            container.appendChild(drag_area15);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area15.appendChild(elem);
        }

        if (elem_coords.bottom > drag_area15_coords.bottom &&
            elem_coords.left >= drag_area16_coords.left &&
            elem_coords.right <= drag_area16_coords.right) {

            top = elem_coords.top - drag_area16_coords.top;
            left = elem_coords.left - drag_area16_coords.left;
            container.appendChild(drag_area16);
            if (top >= 0 && left >= 0) {
                elem.style.left = left + 'px';
                elem.style.top = top + 'px';
            }
            drag_area16.appendChild(elem);

        }
    }

})(angular.module('draggableApp', []));