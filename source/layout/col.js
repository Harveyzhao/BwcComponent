(function(angular) {

    function BwcColController($scope) {
        $scope.$ctrl.span = $scope.$ctrl.span ? $scope.$ctrl.span : 24

        $scope.classList = []

        var classTemp = ['span', 'offset', 'pull', 'push']
        classTemp.forEach(prop => {
            if ($scope.$ctrl[prop]) {
                $scope.classList.push(
                    prop !== 'span' ?
                    `el-col-${prop}-${$scope.$ctrl[prop]}` :
                    `el-col-${$scope.$ctrl[prop]}`
                );
            }
        });
        var classTemp = ['xs', 'sm', 'md', 'lg']
        classTemp.forEach(size => {
            if (typeof $scope.$ctrl[size] === 'number') {
                $scope.classList.push(`el-col-${size}-${$scope.$ctrl[size]}`);
            } else if (typeof $scope.$ctrl[size] === 'object') {
                let props = $scope.$ctrl[size];
                Object.keys(props).forEach(prop => {
                    $scope.classList.push(
                        prop !== 'span' ?
                        `el-col-${size}-${prop}-${props[prop]}` :
                        `el-col-${size}-${props[prop]}`
                    );
                });
            }
        });

        var ret = {};
        if ($scope.$parent.$parent.$ctrl.gutter) {
            ret.paddingLeft = $scope.$parent.$parent.$ctrl.gutter / 2 + 'px';
            ret.paddingRight = ret.paddingLeft;
        }
        $scope.style = ret

    }

    angular.module('bwc.component')
        .component('bwcCol', {
            template: ` <div
                            class="el-col"
                            ng-class=classList
                            ng-style={{style}}
                            ng-transclude>
                        </div>`,
            controller: BwcColController,
            transclude: true,
            bindings: {
                span: "@?",
                offset: "@?",
                pull: "@?",
                push: "@?",
                xs: "@?",
                sm: "@?",
                md: "@?",
                lg: "@?"
            }
        });

})(angular);