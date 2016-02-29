/// <reference path="../../typings/kendo-ui/kendo-ui.d.ts" />

import UnitSmall = require("../model/UnitSmall");
import KendoUnit = require("../model/KendoUnit");
import Credentials = require("../model/Credentials");
import UnitsService = require("../services/UnitsService");
import UserService = require("../services/UserService");
import LoginResponse = require("../enums/LoginResponse");

module app.controllers {
    export const UPDATE_INTERVAL: number = 2000;

    interface IHomeController {
        unitsData: kendo.data.HierarchicalDataSource;
        checkedUnits: Array<KendoUnit>;
        treeView: kendo.ui.TreeView; 

        startUpdating(): void;
        stopUpdating(): void;
        checkAllUnits(): void;
        removeAllUnits(): void;

        checkUnit(unit: KendoUnit): void;
        removeUnit(unit: KendoUnit): void;
    }

    export class HomeController implements IHomeController {
        unitsData: kendo.data.HierarchicalDataSource;
        checkedUnits: Array<KendoUnit>;
        treeView: kendo.ui.TreeView; 
        
        filter: ng.IFilterFilter;
        timer: any;

        static $inject = ["$timeout", "$filter", "unitsService", "usersService"]
        constructor(private $timeout: ng.ITimeoutService, $filter: ng.IFilterService, private unitsService: UnitsService, private usersService: UserService) {
            this.checkedUnits = [];
            this.filter = $filter("filter");

            var credentials = new Credentials("adm", "12Qwaszx");
            this.usersService.login(credentials).then(result => {
                if (result == LoginResponse.Ok) {
                    this.unitsService.getUnits().then(data => {
                        var kendoUnits: Array<KendoUnit> = [];
                        data.forEach(u => kendoUnits.push(new KendoUnit(u)));
                        this.unitsData = new kendo.data.HierarchicalDataSource({ data: kendoUnits });
                    });
                }
            });
        }

        // #region Implementation

        startUpdating(): void {
            this.setupTimer();
        }

        stopUpdating(): void {
            this.$timeout.cancel(this.timer);
        }

        checkAllUnits(): void {
            this.treeView.expand(".k-item");
            var allUnits: Array<KendoUnit> = [];
            this.unitsData.data().forEach(u => this.checkUnitNode(<KendoUnit>u, allUnits));
            this.checkedUnits = allUnits;
        }

        removeAllUnits(): void {
            while (this.checkedUnits.length > 0) {
                var unit: KendoUnit = this.checkedUnits.pop();
                unit.Checked = false;
            }            
        }

        checkUnit(unit: KendoUnit): void {
            if (unit.Checked) {
                this.checkedUnits.push(unit);
            } else {
                this.removeUnit(unit);
            }
        }

        removeUnit(unit: KendoUnit): void {
            this.checkedUnits = this.filter(this.checkedUnits, { Id: "!" + unit.Id });
            unit.Checked = false;
        }

        // #endregion
                 
        // #region Private Methods
                       
        private checkUnitNode(unit: KendoUnit, allUnits: Array<KendoUnit>): void {
            if (!unit.Checked) {
                unit.Checked = true;
                allUnits.push(unit);
            } 

            unit.items.forEach(u => this.checkUnitNode(u, allUnits));
        }

        private setupTimer(): void {
            this.timer = this.$timeout(this.updateData, UPDATE_INTERVAL);
        }
        
        private updateData = () => {
            this.unitsService.getUpdatedData().then(data => {
                data.forEach((unit, index) => this.updateUnit(this.unitsData.data()[index], unit));
                this.setupTimer();   
            });
        }

        private updateUnit(unit: KendoUnit, unitSmall: UnitSmall): void {
            if (unit.Id != unitSmall.Id) {
                console.log("An error occured!");
                return;
            }

            unit.Value = unitSmall.Value;
            if (unit.items.length != 0) {
                unitSmall.AggregatedUnits.forEach((subUnit, index) => this.updateUnit(unit.items[index], subUnit));
            }         
        }        

        // #endregion
    }    
}

export = app.controllers.HomeController;