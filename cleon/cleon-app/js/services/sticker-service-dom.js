(function (ngModule) {

    ngModule.factory('stickerServiceDOM', ['modalService', '$compile', 'stickerServiceJSON', function (modalService, $compile, stickerServiceJSON) {
        return {
            createBigSticker: function ($elem, $event) {

                modalService.createBackground();
                modalService.disableContent();

                var bigSticker = angular.element('<sticker-big></sticker-big>');
                var scope = $elem.scope().$new();

                $elem.append(bigSticker);

                bigSticker = $compile(bigSticker)(scope);

                var buttonAdd = angular.element($event.currentTarget);
                var top = buttonAdd.offset().top + buttonAdd.outerHeight() + 13;
                var left = buttonAdd.offset().left + buttonAdd.outerWidth() - bigSticker.outerWidth();

                buttonAdd.addClass('checked');
                bigSticker.css('pointer-events', 'auto');
                bigSticker.offset({top: top, left: left});

                /*Если на малом стикере есть кнопка удалить - убрать ее*/
                var elems = angular.element(document.body).find('.stiket');
                elems.find('.stiket-del').css('display', 'none');
                elems.find('.stiket-reg').css('display', 'block');

                var btnDel = $elem.find('.left-delete');
                if (btnDel.hasClass('checked')) {
                    btnDel.removeClass('checked');
                }
            },
            deleteBigSticker: function ($elem) {
                var bigSticker = angular.element('.stiket-big');
                var scope = bigSticker.scope();
                bigSticker.remove();
                scope.$destroy();

                $elem.find('.left-add').removeClass('checked');

                modalService.enableContent();
                modalService.removeBackground();
            },
            createSmallSticker: function ($parent, date, comment, author) {

                var smallSticker = angular.element('<sticker-small></sticker-small>');
                $parent.append(smallSticker);

                var scope = $parent.scope().$new();
                smallSticker = $compile(smallSticker)(scope);

                scope = smallSticker.scope();
                scope.date = date;

                scope.comment = comment;
                var html = comment.replace(/\r?\n/g, '<br />');
                smallSticker.find('p').html(html);

                scope.author = author;


                /*Установка положения малого стикера*/
                var btnDel = $parent.find('.left-delete');

                var top = btnDel.offset().top + btnDel.outerHeight() + 10;
                var left = btnDel.offset().left + btnDel.outerWidth() - smallSticker.outerWidth();

                smallSticker.offset({top: top, left: left});

                // Custom scrollbar
                smallSticker.getNiceScroll().resize();

                scope.top = parseFloat(smallSticker.css('top'));
                scope.left = parseFloat(smallSticker.css('left'));

                stickerServiceJSON.addSticker(smallSticker);
                this.deleteBigSticker($parent);
            },
            prepareDeleteSmallSticker: function ($element, $event) {

                var $btnDel = angular.element($event.currentTarget);
                var $stickers = $element.find('.stiket');

                if ($stickers.length == 0) {
                    return;
                }

                if ($btnDel.hasClass('checked')) {
                    $btnDel.removeClass('checked');
                    $stickers.find('.stiket-reg').css('display', 'block');
                    $stickers.find('.stiket-del').css('display', 'none');
                } else {
                    $btnDel.addClass('checked');
                    $stickers.find('.stiket-reg').css('display', 'none');
                    $stickers.find('.stiket-del').css('display', 'block');
                }
            },
            deleteSmallSticker: function ($elem) {
                var $parent = $elem.parent();
                var scope = $elem.scope();

                stickerServiceJSON.deleteSticker($elem);

                $elem.remove();
                scope.$destroy();

                $parent.find('.left-delete').removeClass('checked');
                $parent.find('.stiket-reg').css('display', 'block');
                $parent.find('.stiket-del').css('display', 'none');
            },
            prepareEditSmallSticker: function ($elem, $scope) {

                var $parent = $elem.parent();

                modalService.createBackground();
                modalService.disableContent();

                /*Добавление большого стикера для редактирования на странице*/
                var bigSticker = angular.element('<sticker-big-editable></sticker-big-editable>');
                $parent.append(bigSticker);

                var scope = $parent.scope().$new();
                bigSticker = $compile(bigSticker)(scope);
                scope = bigSticker.scope();

                scope.date = $scope.date;
                scope.comment = $scope.comment;
                scope.author = $scope.author;
                scope.smallSticker = $elem;

                /*Установка положения большого стикера*/
                var btnAdd = $parent.find('.left-add');

                var top = btnAdd.offset().top + btnAdd.outerHeight() + 13;
                var left = btnAdd.offset().left + btnAdd.outerWidth() - bigSticker.outerWidth();

                bigSticker.offset({top: top, left: left});
                bigSticker.css('pointer-events', 'auto');

                /*Если на малом стикере есть кнопка удалить - убрать ее*/
                var elems = angular.element(document.body).find('.stiket');
                elems.find('.stiket-del').css('display', 'none');
                elems.find('.stiket-reg').css('display', 'block');
            },
            editSmallSticker: function ($scope) {

                var smallSticker = $scope.smallSticker;
                var scope = smallSticker.scope();

                // Custom scrollbar
                var scrollBar = smallSticker.find('.stiket-pole').getNiceScroll();
                scrollBar.hide();

                scope.date = new Date().getTime();
                var html = $scope.comment.replace(/\n/g, '<br>');
                smallSticker.find('p').html(html);
                scope.comment = $scope.comment;
                scope.author = $scope.author;

                // Custom scrollbar
                scrollBar.show();
                scrollBar.resize();


                stickerServiceJSON.updateStickerContent(smallSticker);
                this.deleteBigSticker(smallSticker.parent());
            },
            appendDraggableAreas: function (uet) {

                var container = document.getElementById('uet' + uet);
                var sticker = container.getElementsByClassName('stiket')[0];

                var drag_area13 = document.getElementById('drag-area13');
                container.insertBefore(drag_area13, sticker);
                var drag_area14 = document.getElementById('drag-area14');
                container.insertBefore(drag_area14, sticker);
                var drag_area15 = document.getElementById('drag-area15');
                container.insertBefore(drag_area15, sticker);
                var drag_area16 = document.getElementById('drag-area16');
                container.insertBefore(drag_area16, sticker);
            }
        };
    }]);

})(angular.module('cleonApp'));