'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.services'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/edit/:id', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

.controller('View2Ctrl', [
  '$scope'
  , 'blogService'
  , '$routeParams'
  , function($scope, blogService, $routeParams) {
    $scope.blog = {};
    $scope.saved = '';
    $scope.showSampleBtn = angular.isUndefined($routeParams.id);
    $scope.init = function() {
      // At this point I am getting the entire list of blogs
      // if time permits I will move initial get to a service
      // so it could be shared between controllers
      if ($routeParams.id) {
          blogService.getBlogs()
              .then(function(res) {
                  $scope.blog = res.data
                                  .filter(function(blog) {
                                      return blog.id = $routeParams.id;
                                  })[0];
              });
      }
    };

    $scope.update = function(blog, $event) {
        $event.preventDefault();
        return blogService.updateBlog(blog)
            .then(function (res) {
                $scope.saved = res.data.timestamp;
            });
    };

    $scope.loadSample = function($event) {
        $event.preventDefault();
        blogService.getSampleData()
            .then(function(res) {
                $scope.blog = res.data;
            },
            function(err) {
                console.log('Error loading the sample ', err);
            })
    }
  }
]);