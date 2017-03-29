(function(angular) {

    function BwcCardController($scope) {
        console.log($scope.$ctrl)
    }

    angular.module('bwc.component')
        .component('bwcCard', {
            template: ` <div class="el-card">
                            <div ng-show="$ctrl.showHeader" class="el-card__header" ng-transclude="header">
                                <div>{{ header }}</div>
                            </div>
                            <div class="el-card__body" :style="bodyStyle" ng-transclude>
                            </div>
                        </div>`,
            controller: BwcCardController,
            transclude: {
                header: "?header"
            },
            bindings: {
                showHeader: "=?",
                bodyStyle: "=?"
            }
        });

})(angular);