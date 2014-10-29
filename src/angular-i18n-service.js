'use strict';

angular.module('translate',[]).factory('translate', function ($rootScope, $http, $q) {

    //Global Service
    var service = this;
    var $scope = $rootScope.$new(true);

    service.parser = null;

    $scope.settings = {
        defaults : {
            locale : "en"
        },
        locales : []
    };

    $scope.locale = {
        code : null,
        data : {},
        avaliable : {}
    }

    //Set $scope.locale.data to the current locale
    $scope.$watch('locale.code',function(n,o) {
        if(typeof $scope.locale.avaliable[n] !== "undefined") {
            $scope.locale.data = $scope.locale.avaliable[n];
        } else if(o !== null || n !== null) {
            console.error ( "This locale has no data to translate" );
        }
    });

    $scope.get = function() {
        return $scope.locale.data;
    }

    //Set or Get the current locale data
    $scope.current = function(code) {
        if(typeof code === "undefined" || code.trim() === "") {
            return $scope.locale.code;
        } else {
            $scope.locale.code = code;
        }
    }

    $scope.add = function(code,path) {
        return service.loadFile(path).success(function(r) {            
            try {
                $scope.locale.avaliable[code] = r;                
                if(code === $scope.settings.defaults.locale) {
                    $scope.current($scope.settings.defaults.locale);                
                }                
                $rootScope.$broadcast('i18n.newTranslation',{
                    code : code
                });                
            } catch(error) {                
                console.error(error);
            }
        });
    }

    $scope.start = function(settings) {        
        $scope.settings = angular.extend($scope.settings,settings);

        var def = $q.defer();
        var total = 0;
        for(i in $scope.settings.locales) {
            total++;
        }

        var i = 0;
        for(var code in $scope.settings.locales) {
            try {                                
                $scope.add(code,$scope.settings.locales[code]).success(function() {                    
                    i++;
                    if(i == total) {                        
                        def.resolve($scope);                        
                    }                    
                });
            } catch(error) {
                i++;                
                console.error(error);
            }
        }

        return def.promise;
    }

    service.loadFile = function(path) {
        return $http.get(path);
    }

    return $scope;
});
