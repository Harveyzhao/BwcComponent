(function(angular) {

    function BwcRowController($scope) {
        $scope.$ctrl.justify = $scope.$ctrl.justify ? $scope.$ctrl.justify : 'start'
        $scope.$ctrl.align = $scope.$ctrl.align ? $scope.$ctrl.align : 'top'

        //style
        var ret = {};
        if ($scope.$ctrl.gutter) {
            ret.marginLeft = `-${$scope.$ctrl.gutter / 2}px`;
            ret.marginRight = ret.marginLeft;
        }
        $scope.style = ret
    }

    angular.module('bwc.component')
        .component('bwcRow', {
            template: `<div
                            class="el-row"
                            style="{{style}}"
                            ng-class="[
                            $ctrl.justify !== 'start' ? 'is-justify-' + $ctrl.justify : '',
                            $ctrl.align !== 'top' ? 'is-align-' + $ctrl.align : '',
                            {
                                'el-row--flex': $ctrl.type === 'flex'
                            }
                            ]"
                            ng-transclude
                        >
                        </div>`,
            controller: BwcRowController,
            transclude: true,
            bindings: {
                gutter: "@?",
                type: "@?",
                justify: "@?",
                align: "@?"
            }
        });

})(angular);