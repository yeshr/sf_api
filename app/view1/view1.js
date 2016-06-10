'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [
  '$scope'
  , 'blogService'
  , '$filter'
  , function($scope, blogService, $filter) {
        // Happens as soon as controller is initialized.
        // We could wrap it in a function and invoke it manually but
        // not doing it here for now.
        $scope.init = function() {
            blogService.getBlogs()
                .then(function (res) {
                    $scope.blogs = res.data
                                    .map(function(blog) {
                                        blog.timestamp = $filter('date')(blog.timestamp, 'medium');
                                        return blog;
                                    });
                });
        };

        $scope.delete = function(id) {
            return blogService.delete(id)
             //Reload the blogs. We could manage it at client end too if need be.
                .then($scope.init);
        };
    }
]);