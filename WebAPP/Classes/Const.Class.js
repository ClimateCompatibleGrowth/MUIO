export const CURRENCY = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BOV","BRL","BSD","BTN","BWP","BYR","BZD","CAD","CDF","CHE","CHF","CHW","CLF","CLP","CNY","COP","COU","CRC","CUP","CVE","CYP","CZK","DJF","DKK","DOP","DZD","EEK","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","INR","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MTL","MUR","MVR","MWK","MXN","MXV","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SKK","SLL","SOS","SRD","STD","SYP","SZL","THB","TJS","TMM","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","USN","USS","UYU","UZS","VEB","VND","VUV","WST","XAF","XAG","XAU","XBA","XBB","XBC","XBD","XCD","XDR","XFO","XFU","XOF","XPD","XPF","XPT","XTS","XXX","YER","ZAR","ZMK","ZWD",];

export const UNITDEFINITION = {
    'years': {
        name: 'years',
        val: {"var":"years"}
    },
    'hundert': {
        name: '100',
        val: {"var":"hundert"}
    },
    'thousand': {
        name: '10<sup>3</sup>',
        val: {"var":"thousand"}
    },
    'milion': {
        name: '10<sup>6</sup>',
        val: {"var":"milion"}
    },
    'percent': {
        name: '%',
        val: {"var":"percent"}
    },
    'divide': {
        name: '/',
        val: {"var":"divide"}
    },
    'multiply': {
        name: '*',
        val: {"var":"multiply"}
    },
    'Currency': {
        name: '[Currency]',
        val: {"var":"Currency"}
    },
    'CapUnitId': {
        name: '[Technology capacity unit]',
        val: {"var":"CapUnitId"}
    },
    'ActUnitId': {
        name: '[Technology activity unit]',
        val: {"var":"ActUnitId"}
    },
    'CommUnit': {
        name: '[Commodity unit]',
        val: {"var":"CommUnit"}
    },
    'EmiUnit': {
        name: '[Emission unit]',
        val: {"var":"EmiUnit"}
    }
}

export const GROUPNAMES = {
    "R": "Region",
    "RCn": "Region, constraint",
    "RT": "Region, technology",
    "RY": "Region, year",
    "RE": "Region, emission",
    "RYCn": "Region, year, constraint",
    "RYTs": "Region, year, timeslice",
    "RYT": "Region, year, technology",
    "RYTCn": "Region, year, technology, constraint",
    "RYTM": "Region, year, technology, mode of operation",
    "RYC": "Region, year, commodity",
    "RYE": "Region, year, emission",
    "RYTC": "Region, year, technology, commodity",
    "RYTCM": "Region, year, technology, commodity, emission, mode of operation",
    "RYTE": "Region, year, technology, emission",
    "RYTEM": "Region, year, technology, emission, mode of operation",
    "RYTTs": "Region, year, technology, timeslice",
    "RYCTs": "Region, year, commodity, timeslice"
}

export const PARAMORDER = [
    "R"     ,  
    "RT"    ,     
    "RY"    ,     
    "RE"    , 
    "RYCn"  ,    
    "RYTs"  ,     
    "RYT"   , 
    "RYTCn" ,   
    "RYTM"  ,  
    "RYTTs" ,    
    "RYC"   ,  
    "RYCTs" ,      
    "RYTC"  ,  
    "RYTCM" , 
    "RYE"   ,    
    "RYTEM"   
];

export const PARAMCOLORS = {
    "R": "orange",
    "RT": "blue",
    "RY": "blueLight",
    "RE": "yellow",
    "RYCn": "pink",
    "RYTs": "red",
    "RYT": "greenLight",
    "RYTCn": "pink",
    "RYTM": "purple",
    "RYC": "grey",
    "RYE": "pink",
    "RYTC": "teal",
    "RYTCM": "blue",
    "RYTE": "greenDark",
    "RYTEM": "orange",
    "RYTTs": "blue",
    "RYCTs": "greenLight"
}

export const UNITS = 
[
    {id:"TJ",name:"TJ", group: "Energy"}, 
    {id:"PJ", name:"PJ", group: "Energy"},
    {id:"ktoe", name:"ktoe", group: "Energy"},
    {id:"Mtoe",name:"Mtoe", group: "Energy"}, 
    {id:"GWh",name:"GWh", group: "Energy"}, 


    {id:"MW",name:"MW", group: "Capacity"},
    {id:"GW",name:"GW", group: "Capacity"},
    {id:"km3/yr",name:"10<sup>3</sup>m<sup>3</sup>/yr", group: "Capacity"},
    {id:"mm3/yr",name:"10<sup>6</sup>m<sup>3</sup>/yr", group: "Capacity"},
    {id:"bm3/yr",name:"10<sup>9</sup>m<sup>3</sup>/yr", group: "Capacity"},

    {id:"m2",name:"m<sup>2</sup>", group: "Capacity"},
    {id:"km2",name:"km<sup>2</sup>", group: "Capacity"},
    {id:"kkm2",name:"10<sup>3</sup>km<sup>2</sup>", group: "Capacity"},

    {id:"Ton/yr",name:"Ton/yr", group: "Capacity"}, 
    {id:"kTon/yr",name:"kTon/yr", group: "Capacity"}, 
    {id:"MTon/yr",name:"MTon/yr", group: "Capacity"}, 


    {id:"Ton",name:"Ton", group: "Weight"}, 
    {id:"kTon",name:"kTon", group: "Weight"}, 
    {id:"MTon",name:"MTon", group: "Weight"}, 
    {id:"Kg",name:"Kg", group: "Weight"}, 
    {id:"lbs",name:"lbs", group: "Weight"},

    {id:"m2",name:"m<sup>2</sup>", group: "Area"},
    {id:"km2",name:"km<sup>2</sup>", group: "Area"},
    {id:"kkm2",name:"10<sup>3</sup>km<sup>2</sup>", group: "Area"},

    {id:"m3",name:"m<sup>3</sup>", group: "Volume"},
    {id:"km3",name:"10<sup>3</sup>m<sup>3</sup>", group: "Volume"},
    {id:"mm3",name:"10<sup>6</sup>m<sup>3</sup>", group: "Volume"},
    {id:"bm3",name:"10<sup>9</sup>m<sup>3</sup>", group: "Volume"}

];

export const TAGS = 
[
    {id:1, name:"Equality"},
    {id:0, name:"Inequality"},
];



