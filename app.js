(function(angular) {
    'use strict';
    angular.module('heroApp', []);
})(window.angular);



//-------- Hero list component ----------//
(function(angular) {
    'use strict';
    function HeroListController($scope, heroesList) {
        var ctrl = this;

        // This would be loaded by $http etc.
        ctrl.list = heroesList.list;

        ctrl.updateHero = function(hero, prop, value) {
            hero[prop] = value;
        };

        ctrl.deleteHero = function(hero) {
            var idx = ctrl.list.indexOf(hero);
            if (idx >= 0) {
                ctrl.list.splice(idx, 1);
            }
        };

        console.log('HeroListController');
        console.log(ctrl);
    }

    angular.module('heroApp').component('heroList', {
        templateUrl: 'heroList.html',
        controller: HeroListController
    });
})(window.angular);


//---------- Detail component ------------//
(function(angular) {
    'use strict';
    function HeroDetailController() {
        var ctrl = this;

        ctrl.delete = function() {
            ctrl.onDelete({hero: ctrl.hero});
        };

        ctrl.update = function(prop, value) {
            ctrl.onUpdate({hero: ctrl.hero, prop: prop, value: value});
        };

        console.log('HeroDetailController');
        console.log(ctrl);
    }

    angular.module('heroApp').component('heroDetail', {
        templateUrl: 'heroDetail.html',
        controller: HeroDetailController,
        bindings: {
            hero: '<',
            onDelete: '&',
            onUpdate: '&'
        }
    });
})(window.angular);


//--------- Edit field component------------//
(function(angular) {
    'use strict';
    function EditableFieldController($scope, $element, $attrs) {
        var ctrl = this;
        ctrl.editMode = false;

        ctrl.handleModeChange = function() {
            if (ctrl.editMode) {
                ctrl.onUpdate({value: ctrl.fieldValue});
                ctrl.fieldValueCopy = ctrl.fieldValue;
            }
            ctrl.editMode = !ctrl.editMode;
        };

        ctrl.reset = function() {
            ctrl.fieldValue = ctrl.fieldValueCopy;
        };

        ctrl.$onInit = function() {
            // Make a copy of the initial value to be able to reset it later
            ctrl.fieldValueCopy = ctrl.fieldValue;

            // Set a default fieldType
            if (!ctrl.fieldType) {
                ctrl.fieldType = 'text';
            }
        };

        console.log('EditableFieldController');
        console.log(ctrl);
    }

    angular.module('heroApp').component('editableField', {
        templateUrl: 'editableField.html',
        controller: EditableFieldController,
        bindings: {
            fieldValue: '<',
            fieldType: '@?',
            onUpdate: '&'
        }
    });
})(window.angular);



(function($){
    'use strict';

    $.module('heroApp').factory('heroesList', function( $http ) {
        var heroesList = {};

        heroesList.list = [
            {
                name: 'Sany',
                location: 'Brain of SOLR cloud'
            },
            {
                name: 'Arif',
                location: 'Heart of British English'
            },
            {
                name: 'Mehedi',
                location: 'In deep of idiotic'
            }
        ];

        return heroesList;
    });
})(window.angular);
