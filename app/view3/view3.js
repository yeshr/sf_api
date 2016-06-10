/**
 * Created by yeshg on 6/10/2016.
 */
'use strict';

angular.module('myApp.view3', ['ngRoute', 'myApp.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/create', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', [
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

            $scope.create = function (blog, $event) {
                $event.preventDefault();
                return blogService.createBlog(blog)
                    .then(function(res) {
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