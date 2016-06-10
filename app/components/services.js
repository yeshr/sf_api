/**
 * Created by yeshg on 6/10/2016.
 */
/**
 * Creating a wrapper service for modules to call.
 */
angular.module('myApp.services', [])
    .factory('blogService', [
        '$http'
        , '$q'
        , function ($http, $q) {
            var api = 'http://restedblog.herokuapp.com/yesh/api/';
            return {
                getBlogs: function () {
                    return $http.get(api);
                },
                getBlog: function (id) {
                    if (angular.isUndefined(id)) {
                        return $q.when('Missing blog id. Failed to retrieve');
                    }
                    return $http.get(api + '/' + id);
                },
                createBlog: function (data) {
                    console.log(data);
                    if (angular.isUndefined(data.text) && angular.isUndefined(data.title)) {
                        return $q.when('Missing data. Cannot create the blog.');
                    }
                    // TODO: Update the config data
                    return $http.post(api, data);
                },
                updateBlog: function (data) {
                    if (angular.isUndefined(data.id)
                        || angular.isUndefiend(data.text)
                        || angular.isUndefined(data.title)) {
                        return $q.when('Missing data. Cannot update the blog');
                    }

                    // TODO Update the config data
                    return $http.post(api, data);
                },
                deleteBlogs: function () {
                    return $http.delete(api);
                },
                deleteBlog: function (id) {
                    if (angular.isUndefined(id)) {
                        return $q.when('Missing blog id. Cannot delete the blog');
                    }

                    return $http.delete(api + '/' + id);
                },
                getSampleData: function() {
                    return $http.get(api+'/generateSampleData');
                }
            };
        }
    ]);