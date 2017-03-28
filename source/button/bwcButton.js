(function (angular) {

    function BwcButtonController($scope) {
        console.log($scope.$ctrl.type)
         $scope.$ctrl.type =  $scope.$ctrl.type ?  $scope.$ctrl.type : 'default'
         $scope.$ctrl.icon =  $scope.$ctrl.icon ?  $scope.$ctrl.icon : ''
         $scope.$ctrl.nativeType = $scope.$ctrl.nativeType ?  $scope.$ctrl.nativeType : 'button'
        
    }

    angular.module('mainApp')
        .component('bwcButton', {
            templateUrl: 'components/button/bwcButton.html',
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