import Unit = require("../model/Unit");
import UnitSmall = require("../model/UnitSmall");

interface IUnitsService {
    getUnits(): ng.IPromise<Array<Unit>>;
    getUpdatedData(): ng.IPromise<Array<UnitSmall>>;
}

class UnitsService implements IUnitsService {
    static $inject = ["$http", "$q"]
    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {            
    }

    getUnits(): ng.IPromise<Array<Unit>> {
        return this.$http.get('/units/getall').then(data => data.data);
    }

    getUpdatedData(): ng.IPromise<Array<UnitSmall>> {
        return this.$http.get('/units/getdata').then(data => data.data);        
    }
}

export = UnitsService;
