export class DefaultObj{
    static getId(type) {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return type+'_' + Math.random().toString(36).substr(2, 5);
    }

    static defaultTs(first=false){
        let id;
        if(first){
            id = 'TS_0';
        }else{
            id = this.getId('TS');
        }
        let defaultTs = [
            {
                "TsId": id,
                "Ts":id,
                "Desc": "Default year split"
            }
        ];
        return defaultTs;
    }

    static defaultTech(first=false){
        let id;
        if(first){
            id = 'TEC_0';
        }else{
            id = this.getId('TEC');
        }
        let emptyArray = [];
        let defaultObj = [
            {
                "TechId": id,
                "Tech":id,
                "Desc": "Default technology",
                "CapUnitId": "MW",
                "ActUnitId": "PJ",
                "TG": emptyArray,
                "IAR": emptyArray,
                "OAR": emptyArray,
                "EAR": emptyArray,
                "INCR": emptyArray,
                "ITCR": emptyArray,
            }
        ];
        return defaultObj;
    }

    static defaultTechGroup(first=false){
        let id;
        if(first){
            id = 'TG_0';
        }else{
            id = this.getId('TG');
        }
        let defaultObj = [
            {
                "TechGroup": id,
                "TechGroupId":id,
                "Desc": "Default technology group",
            }
        ];
        return defaultObj;
    }

    static defaultComm(first=false){
        let id;
        if(first){
            id = 'COM_0';
        }else{
            id = this.getId('COM');
        }
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

    static defaultEmi(first=false){
        let id;
        if(first){
            id = 'EMI_0';
        }else{
            id = this.getId('EMI');
        }
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

    static defaultScenario(first=false){
        let id;
        if(first){
            id = 'SC_0';
        }else{
            id = this.getId('SC');
        }
        let defaultObj = [
            {
                "ScenarioId": id,
                "Scenario":id,
                "Desc": "Base scenario",
                "Active": true
            }
        ];
        return defaultObj;
    }

    static defaultConstraint(first=false){
        let id;
        if(first){
            id = 'CO_0';
        }else{
            id = this.getId('CO');
        }
        let emptyArray = ['TEC_0'];
        let defaultObj = [
            {
                "ConId": id,
                "Con":id,
                "Desc": "Default constraint ",
                "Tag": 1,
                "CM": emptyArray
            }
        ];
        return defaultObj;
    }

    static defaultCase(first=false){
        let id;
        if(first){
            id = 'CS_0';
        }else{
            id = this.getId('CS');
        }
        let defaultObj = [
            {
                "Case": id,
                "CaseId":id,
                "Runtime": "Base scenario",
                "Scenarios": []
            }
        ];
        return defaultObj;
    }
}
