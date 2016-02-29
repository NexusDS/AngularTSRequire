import Unit = require("./model/Unit");

 class KendoUnit {
    Id: number;
    Name: string;
    Min: number;
    Max: number;
    Value: number;
    Checked: boolean;
    items: Array<KendoUnit>;
    
    constructor(unit: Unit) {
        this.Id = unit.Id;
        this.Name = unit.Name;
        this.Min = unit.Min;
        this.Max = unit.Max;
        this.Value = unit.Value;
        this.Checked = false;
        this.items = [];

        unit.AggregatedUnits.forEach(u => this.items.push(new KendoUnit(u)));
    }
}

export = KendoUnit;