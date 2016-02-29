import LoginResponse = require("../enums/LoginResponse");
import LogoutResponse = require("../enums/LogoutResponse");
import Credentials = require("../model/Credentials");

interface IUserService {
    login(credentials: Credentials): ng.IPromise<LoginResponse>;
    logout(): ng.IPromise<LogoutResponse>;
}

class UserService implements IUserService {
    static $inject = ["$http", "$q"]
    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
    }

    login(credentials: Credentials): ng.IPromise<LoginResponse> {
        var parseResponse = (data: ng.IHttpPromiseCallbackArg<{}>) => {
            switch (data.status) {
                case 200: return LoginResponse.Ok;
                case 400: return LoginResponse.UserNotFound;
                default: return LoginResponse.ErrorOccured;
            }
        }

        return this.$http
            .post('/login/', credentials)
            .then(parseResponse, parseResponse);
    }

    logout(): ng.IPromise<LogoutResponse> {
        var deferred = this.$q.defer<LogoutResponse>();
        
        // TODO finish this method

        return deferred.promise;
    }
}

export = UserService;