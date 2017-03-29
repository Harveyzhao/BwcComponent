(function (angular) {

	function BwcRadioController($scope) {
		console.log($scope.$ctrl)
		$scope.$ctrl.value = $scope.$ctrl.value ? $scope.$ctrl.value : {}
		$scope.$ctrl.label = $scope.$ctrl.label ? $scope.$ctrl.label : {}
	}

	angular.module('bwc.component')
		.component('bwcRadio', {
			template: `<label class="el-radio">
						<span class="el-radio__input"
						ng-class="{
							'is-disabled': $ctrl.isDisabled,
							'is-checked': $ctrl.bwcModel === $ctrl.label,
							'is-focus': focus
						}"
						>
						<span class="el-radio__inner"></span>
						<input
							class="el-radio__original"
							ng-value="$ctrl.label"
							type="radio"
							ng-model="$ctrl.bwcModel"
							ng-focus="focus = true"
							ng-blur="focus = false"
							name="{{$ctrl.name}}"
							>
						</span>
						<span class="el-radio__label">
						<span ng-transclude></span>
						</span>
					</label>`,
			controller: BwcRadioController,
			transclude: true,
			bindings: {
				value: "=?",
				label: "=?",
				disabled: "=?",
				name: "=?",
				bwcModel:"=?"
			}
		});

})(angular);