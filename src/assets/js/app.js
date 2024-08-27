// app.js
angular.module('propertyApp', [])
.controller('PropertyController', ['$scope', function($scope) {
    $scope.showDetailView = true; // Default to showing details

    $scope.showDetails = function() {
        $scope.showDetailView = true;
    };

    $scope.showMap = function() {
        $scope.showDetailView = false;
    };
}]);
