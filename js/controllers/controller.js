app.controller('Ctrl', function($scope, $filter, $http) {
    $scope.users = [
        {id: 1, code: 134, name: 'product1', quantity: 2, price: 40}
    ];

    //get the whole total amount
    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.users.length; i++){
            var product = $scope.users[i];
            total += (product.price * product.quantity);
        }
        return total;
    };

    //get change depend-on total
    $scope.getChange = function (paid) {
        if(paid >= ($scope.getTotal())) {
            return (paid - $scope.getTotal());
        }
    };

    //some validation
    $scope.checkName = function(data) {
        if (data === '') {
            return "Username is a required field";
        }
    };

    $scope.saveUser = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {id: id});
        return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
        $scope.users.splice(index, 1);
    };

    // add user
    $scope.addUser = function() {
        $scope.inserted = {
            id: $scope.users.length+1,
            code: 0,
            name: '',
            quantity: 0,
            price: 0
        };
        $scope.users.push($scope.inserted);
    };
});

// --------------- mock $http requests ----------------------
app.run(function($httpBackend) {

    $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
        data = angular.fromJson(data);
        return [500, {status: 'ok'}];
    });
});