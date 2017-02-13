(function (module) {

    module.service('modalService', [function () {

        return {

            isContentDisabled: null,
            isSetBackground: null,
            isSetModal: null,

            createBackground: function () {

                this.isSetBackground = true;

                var div = angular.element('<div id="modal-app-background"></div>');
                angular.element(document.body).append(div);
                div.css({
                    'display': 'block',
                    'position': 'fixed',
                    'z-index': 999,
                    'pointer-events': 'none',
                    'left': 0,
                    'top': 0,
                    'width': '100%',
                    'height': '100%',
                    'background-color': 'rgb(0,0,0)',
                    'background-color': 'rgba(0,0,0,0.4)'
                });
            },

            removeBackground: function () {
                if (this.isSetBackground) {
                    angular.element('#modal-app-background').remove();
                    this.isSetBackground = false;
                }
            },

            disableContent: function () {
                angular.element(document.body).addClass('disable');
            },

            enableContent: function () {
                angular.element(document.body).removeClass('disable');
            },

            createLoaderBall: function () {

                var div = angular.element('<div id="modal-app-rotate-ball"><div class="loader"></div></div>');
                angular.element(document.body).append(div);

                setPosition();

                angular.element(window).on('resize', setPosition);
                angular.element(window).on('scroll', setPosition);

                function setPosition() {

                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

                    var left = document.documentElement.clientWidth / 2 + scrollLeft - div.outerWidth() / 2;
                    var top = document.documentElement.clientHeight / 2 + scrollTop - div.outerHeight() / 2;

                    div.css({
                        'top': top,
                        'left': left
                    });
                }

                div.on('$destroy', function () {
                    angular.element(window).off('resize', setPosition);
                    angular.element(window).off('scroll', setPosition);
                });
            },

            removeLoaderBall: function () {
                angular.element('#modal-app-rotate-ball').remove();
            },

            createModal: function (message) {

                if (arguments.length == 0) {
                    message = 'Modal message';
                }

                var modal = '<div id="modal-app-message" class="modal-app-content">' +
                    '<span class="modal-app-close">&times;</span>' +
                    '<p>' + message + '</p>' +
                    '</div>';

                modal = angular.element(modal);
                angular.element(document.body).append(modal);

                modal.css({
                    'z-index': 1000,
                    'pointer-events': 'auto'
                });

                setPosition();

                angular.element(window).on('resize', setPosition);
                angular.element(window).on('scroll', setPosition);

                function setPosition() {

                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;

                    var left = document.documentElement.clientWidth / 2 + scrollLeft - modal.outerWidth() / 2;
                    var top = document.documentElement.clientHeight / 2 + scrollTop - modal.outerHeight() / 2;

                    modal.css({
                        'top': top,
                        'left': left
                    });
                }

                modal.on('$destroy', function () {
                    angular.element(window).off('resize', setPosition);
                    angular.element(window).off('scroll', setPosition);
                });

                this.isSetModal = true;
            },

            removeModal: function () {
                if (this.isSetModal) {
                    angular.element('#modal-app-message').remove();
                    this.isSetModal = false;
                }

            }

        };

    }]);

})(angular.module('modalApp', []));