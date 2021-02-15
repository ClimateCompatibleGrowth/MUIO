export class DefaultObj{
    static getId(type) {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return type+'_' + Math.random().toString(36).substr(2, 5);
    }

    static defaultTech(){
        let id = this.getId('TEC');
        let emptyArray = [];
        let defaultObj = [
            {
                "TechId": id,
                "Tech":id,
                "Desc": "Default technology",
                "IAR": emptyArray,
                "OAR": emptyArray,
                "EAR": emptyArray,
                "TMPAL":0,
                "TMPAU":9999,
                "CAU": 0,
                "OL": 1
            }
        ];
        return defaultObj;
    }

    static defaultComm(){
        let id = this.getId('COM');
        let defaultComm = [
            {
                "CommId": id,
                "Comm":id,
                "Desc": "Default commodity",
                "UnitId": "PJ"
            }
        ];
        return defaultComm;
    }

    static defaultEmi(){
        let id = this.getId('EMI');
        let defaultEmi = [
            {
                "EmisId": id,
                "Emis":id,
                "Desc": "Default emission",
                "UnitId": "Ton"
            }
        ];
        return defaultEmi;
    }

    static defaultUnit(){
        let id = this.getId('UT');
        let defaultUnit = [
            {
                "UnitId": id,
                "Unitname":id,
                "IC": 0,
                "LT": 0,
                "CT": 0,
                "h": false,
                "Fuel": "Lignite"
            }
        ];
        return defaultUnit;
    }
}
