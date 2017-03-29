(function(angular) {

    function BwcButtonController($scope) {
        $scope.$ctrl.type = $scope.$ctrl.type ? $scope.$ctrl.type : 'default'
        $scope.$ctrl.icon = $scope.$ctrl.icon ? $scope.$ctrl.icon : ''
        $scope.$ctrl.nativeType = $scope.$ctrl.nativeType ? $scope.$ctrl.nativeType : 'button'

    }

    angular.module('bwc.component')
        .component('bwcButton', {
            template: `<button disabled="{{$ctrl.disabled}}" class="el-button" ng-click="handleClick()" autofocus="{{$ctrl.autofocus}}" type="{{$ctrl.nativeType}}"
                            ng-class="[
                            $ctrl.type ? 'el-button--' + $ctrl.type : '',
                            $ctrl.size ? 'el-button--' + $ctrl.size : '',
                            {
                                'is-disabled': $ctrl.disabled,
                                'is-loading': $ctrl.loading,
                                'is-plain': $ctrl.plain
                            }
                            ]">
                            <i class="el-icon-loading" ng-if="$ctrl.loading"></i>
                            <i ng-class="'el-icon-' + $ctrl.icon" ng-if="$ctrl.icon && !$ctrl.loading"></i>
                            <span ng-transclude></span>
                        </button>`,
            controller: BwcButtonController,
            transclude: true,
            bindings: {
                autofocus: "=?",
                loading: "=?",
                disabled: "=?",
                plain: "=?",
                autofocus: "=?",
                type: "=?",
                icon: "=?",
                size: "=?",
                nativeType: "=?"
            }
        });

})(angular);