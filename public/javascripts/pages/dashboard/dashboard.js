(function(){
    var dashboardApp = angular.module('dashboardApp', []);

    dashboardApp.controller('availableUsersCtrl', ['$scope', 'DashboardService', function ($scope, DashboardService) {

        $scope.availablePlayers = DashboardService.getAvailablePlayers();

        DashboardService.onInit(function(){
            $scope.$apply();
        });

        DashboardService.connectedNewPlayer(function(){
            $scope.$apply();
        });

        DashboardService.disconnectedPlayer(function(){
            $scope.$apply();
        });

        $scope.filterIsNotMe = function(user){
            return user._id !== DashboardService.getMe()._id;
        }

    }]);
})();