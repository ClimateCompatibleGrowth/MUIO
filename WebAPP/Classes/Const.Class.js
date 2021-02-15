export const CURRENCY = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BOV","BRL","BSD","BTN","BWP","BYR","BZD","CAD","CDF","CHE","CHF","CHW","CLF","CLP","CNY","COP","COU","CRC","CUP","CVE","CYP","CZK","DJF","DKK","DOP","DZD","EEK","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MTL","MUR","MVR","MWK","MXN","MXV","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SKK","SLL","SOS","SRD","STD","SYP","SZL","THB","TJS","TMM","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","USN","USS","UYU","UZS","VEB","VND","VUV","WST","XAF","XAG","XAU","XBA","XBB","XBC","XBD","XCD","XDR","XFO","XFU","XOF","XPD","XPF","XPT","XTS","XXX","YER","ZAR","ZMK","ZWD",];

export const PARAMETERS = {
    "R": [{"DM": "Depreciation Method"}, {"DR": "Discount Rate"}],
    "T": [{"TMPAL": "Total Technology Model Period Activity Lower Limit"}, {"TMPAU": "Total Technology Model Period Activity Upper Limit"}],
    "RT": [{"CAU": "Capacity To Activity Unit"}, {"OL": "Operational Life"}],
    "RYT": 
    [
        {id: "VC"       , value: "Variable Cost"},
        {id: "AF"       , value: "Availability Factor"},
        {id: "CC"       , value: "Capital Cost"},
        {id: "FC"       , value: "Fixed Cost"},
        {id: "RC"       , value: "Residual Capacity"},
        {id: "TAMaxC"   , value: "Total Annual Max Capacity"},
        {id: "TAMaxCI"  , value: "Total Annual Max Capacity Investment"},
        {id: "TAMinC"   , value: "Total Annual Min Capacity"},
        {id: "TAMinCI"  , value: "Total Annual Min Capacity Investment"},
        {id: "TAL"      , value: "Total Technology Annual Activity Lower Limit"},
        {id: "TAU"      , value: "Total Technology Annual Activity Upper Limit"}
    ],
    "RYTC": 
    [
        {id: "IAR"       , value: "Input Activity Ratio"},
        {id: "OAR"       , value: "Output Activity Ratio"}
    ],
    "RYTs": 
    [
        {id: "YS"       , value: "Year Split"}
    ],
    "RYC": 
    [
        {id: "AAD"       , value: "Accumulated Annual Demand"},
        {id: "SAD"       , value: "Specified Annual Demand"}
    ],
    "RYE": 
    [
        {id: "AEL"       , value: "Annual Emission Limit"},
        {id: "EP"       , value: "Emissions Penalty"}
    ],
    "RYTTs": 
    [
        {id: "CF"       , value: "Capacity Factor"}
    ],
    "RYCTs": 
    [
        {id: "SDP"       , value: "Specified Demand Profile"}
    ],
    "RYTE": 
    [
        {id: "EAR"       , value: "Emission Activity Ratio"}
    ]
}

export const UNITS = 
[
    {id:"PJ", name:"PJ", group: "Fuel group - Energy"},
    {id:"ktoe", name:"ktoe", group: "Fuel group - Energy"},
    {id:"Mtoe",name:"Mtoe", group: "Fuel group - Energy"}, 
    {id:"GWh",name:"GWh", group: "Fuel group - Energy"}, 

    {id:"Ton",name:"Ton", group: "Fuel group - Metric"}, 
    {id:"Kg",name:"Kg", group: "Fuel group - Metric"}, 
    {id:"lbs",name:"lbs", group: "Fuel group - Metric"}
];


///////////////////////////////////////////////////////////////////////ELSE
export const UNITS_OLD = ["PJ","ktoe","Mtoe","GWh"];

export const FUELS = 
[
    {id:"Lignite", name:"Lignite", group: "Fuel group - Coal"},
    {id:"BrownCoal", name:"Brown Coal", group: "Fuel group - Coal"},
    {id:"Oil",name:"Oil", group: "Fuel group - Oil"}, 
    {id:"Gas",name:"Gas", group: "Fuel group - Gas"}, 
    {id:"Biofuels",name:"Biofuels", group: "Fuel group - Biofules"}, 
    {id:"Waste",name:"Waste", group: "Fuel group - Waste"}, 
    {id:"Peat",name:"Peat", group: "Fuel group - Coal"}, 
    {id:"OilShale",name:"Oil Shale", group: "Fuel group - Coal"}, 
    {id:"Nuclear",name:"Nuclear", group: "Fuel group - Coal"}, 
    {id:"Geothermal",name:"Geothermal", group: "Fuel group - Coal"},
    {id:"Solar",name:"Solar", group: "Fuel group - Coal"}, 
    {id:"Wind",name:"Wind", group: "Fuel group - Coal"}, 
    {id:"Hydro",name:"Hydro", group: "Fuel group - Coal"}
];

export const SECTOR = ["Industry","Transport","Residential","Commercial","Agriculture","Fishing", "Non Energy Use", "Other"];
export const COMMODITY = ["Coal","Oil","Gas","Biofuels","Waste", "Peat", "Oil Shale", "Electricity", "Heat"];
export const FUELS1 = 
[
    {"id":"Lignite", "name":"Lignite", group: "Fuel group - Coal"},
    {"id":"BrownCoal", "name":"Brown Coal", group: "Coal"},
    {"id":"Oil","name":"Oil", group: "Oil"}, 
    {"id":"Gas","name":"Gas", group: "Gas"}, 
    {"id":"Biofuels","name":"Biofuels", group: "Biofules"}, 
    {"id":"Waste","name":"Waste", group: "Waste"}, 
    {"id":"Peat","name":"Peat", group: "Coal"}, 
    {"id":"OilShale","name":"Oil Shale", group: "Coal"}, 
    {"id":"Nuclear","name":"Nuclear", group: "Coal"}, 
    {"id":"Geothermal","name":"Geothermal", group: "Coal"},
    {"id":"Solar","name":"Solar", group: "Coal"}, 
    {"id":"Wind","name":"Wind", group: "Coal"}, 
    {"id":"Hydro","name":"Hydro", group: "Coal"}
];

export const CHART_TYPE = {
    column: "column",
    spline: 'spline',
    stackedarea: 'stackedarea',
    stackedcolumn: 'stackedcolumn',
    areaChart: 'stackedarea',
    stackedsteparea: 'stackedsteparea'
}

export const SIMTYPE = {
    'false': {
        dataField: 'Hour',
        labelUnit: "h",
        minValue: 2190,
        maxValue: 2920,
        gridLinesInterval: 168, 
        unitInterval: 730,
    },
    day: {
        dataField: 'Day',
        labelUnit: "d",
        minValue: 90,
        maxValue: 120,
        gridLinesInterval: 7, 
        unitInterval: 30,
    },
    month: {
        dataField: 'Month',
        labelUnit: "m",
        minValue: 3,
        maxValue: 4,
        gridLinesInterval: 1, 
        unitInterval: 1,
    },
    'true': {
        dataField: 'Hour',
        labelUnit: "h",
        minValue: 3,
        maxValue: 4,
        gridLinesInterval: 1, 
        unitInterval: 1,
    }
}
