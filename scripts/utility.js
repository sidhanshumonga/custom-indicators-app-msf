// created by Sidhanshu Monga
// 2018-04-05

//functions required in application.


//getting enddate of quarter from today date.
var getQuarterEndDate = function (d) {
    var q = d.substring(5, 7);
    var y = d.substring(0, 4);
    if (q == "01" || q == "02" || q == "03") {
        q = "-03-31";
    }
    if (q == "04" || q == "05" || q == "06") {
        q = "-06-30";
    }
    if (q == "07" || q == "08" || q == "09") {
        q = "-09-30";
    }
    if (q == "10" || q == "11" || q == "12") {
        q = "-12-31";
    }
    return (y + q);
};

//getting startdate of quater from any date.
var getQuarterStartDate = function (d) {
    var q = d.substring(5, 7);
    var y = d.substring(0, 4);
    if (q == "01" || q == "02" || q == "03") {
        q = "-01-01";
    }
    if (q == "04" || q == "05" || q == "06") {
        q = "-04-01";
    }
    if (q == "07" || q == "08" || q == "09") {
        q = "-07-01";
    }
    if (q == "10" || q == "11" || q == "12") {
        q = "-10-01";
    }
    return (y + q);
};

//function to get period array of enddate of current quarter and last three quarters
var getQuartersPeriod = function (d) {
    var array = [];
    var m = d.substring(5, 7); //month
    var y = d.substring(0, 4); //year
    var dd = d.substring(8, 10); //date
    for (var i = 0; i < 4; i++) {
        array[i] = y + '-' + m + '-' + dd;
        m = m - 3;
        if (m < 1) {
            m = 12;
            dd = 31;
            y = y - 1; // year formatting
        }
        if (m < 10) { // month formatting
            m = '0' + m;
        }

        // date formatting
        if (m == '03') { dd = 31; }
        if (m == '06') { dd = 30; }
        if (m == '09') { dd = 30; }
        if (m == '12') { dd = 31; }
    }
    return array;
};

//quater in format YYYYQN for push function
var getQuarterToPush = function (e) {
    var q = "";
    if (e.substring(5, 7) == "03") {
        q = e.substring(0, 4) + "Q1";
    }
    if (e.substring(5, 7) == "06") {
        q = e.substring(0, 4) + "Q2";
    }
    if (e.substring(5, 7) == "09") {
        q = e.substring(0, 4) + "Q3";
    }
    if (e.substring(5, 7) == "12") {
        q = e.substring(0, 4) + "Q4";
    }
    return q;
};

//monthly reports functions

//monthly starting date
var getMonthStartDate = function (d) {
    var date = d.substring(8, 10);
    var month = d.substring(5, 7);
    var year = d.substring(0, 4);

    return year + '-' + month + '-01';
};

//monthly end date
var getMonthEndDate = function (d) {
    var date = d.substring(8, 10);
    var month = d.substring(5, 7);
    var year = d.substring(0, 4);

    if (month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') {
        return year + '-' + month + '-31';
    }
    else if (month == '04' || month == '06' || month == '09' || month == '11') {
        return year + '-' + month + '-30';
    }
    else {
        if (year % 4 == 0) {
            return year + '-' + month + '-29';
        }
        else {
            return year + '-' + month + '-28';
        }

    }
};

//function to get period array of enddate of current month and last six months
var getMonthsPeriod = function (d) {
    var array = [];
    var m = d.substring(5, 7);
    var y = d.substring(0, 4);
    var dd = d.substring(8, 10);
    for (var i = 0; i < 6; i++) {
        array[i] = y + '-' + m + '-' + dd;
        m = m - 1;
        if (m < 1) {
            m = 12;
            dd = 31;
            y = y - 1;
        }
        if (m < 10) {
            m = '0' + m;
        }
        {
            if (m == '01' || m == '03' || m == '05' || m == '07' || m == '08' || m == '10' || m == '12') {
                dd = '31';
            }
            else if (m == '04' || m == '06' || m == '09' || m == '11') {
                dd = '30';
            }
            else {
                if (y % 4 == 0) {
                    dd = '29';
                }
                else {
                    dd = '28';
                }

            }
        }

    }
    return array;
};

//month in format YYYYMM for push function
var getMonthToPush = function (d) {
    var m = d.substring(5, 7);
    var y = d.substring(0, 4);
    if (m == "01") { s = y + "01" }
    if (m == "02") { s = y + "02" }
    if (m == "03") { s = y + "03" }
    if (m == "04") { s = y + "04" }
    if (m == "05") { s = y + "05" }
    if (m == "06") { s = y + "06" }
    if (m == "07") { s = y + "07" }
    if (m == "08") { s = y + "08" }
    if (m == "09") { s = y + "09" }
    if (m == "10") { s = y + "10" }
    if (m == "11") { s = y + "11" }
    if (m == "12") { s = y + "12" }
    return s;
};

//function to get date before 3 months
var get3MonthsBeforeDate = function (d) {
    var _3monthsbeforedate = new Date(d);
    _3monthsbeforedate.setMonth(_3monthsbeforedate.getMonth() - 3);
    return _3monthsbeforedate;
};

//function to get date before 6 months
var get6MonthsBeforeDate = function (d) {
    var _6monthsbeforedate = new Date(d);
    _6monthsbeforedate.setMonth(_6monthsbeforedate.getMonth() - 6);
    return _6monthsbeforedate;
};

//function to get date before 12 months
var get12MonthsBeforeDate = function (d) {
    var _12monthsbeforedate = new Date(d);
    _12monthsbeforedate.setFullYear(_12monthsbeforedate.getFullYear() - 1);
    return _12monthsbeforedate;
};

//function to get ou/period combo rule quaterly
var getOuPeriodLoopQuarterly = function (ouarray, periodarray) {
    var array = [];
    for (var i = 0; i < ouarray.length; i++) {
        for (var a = 0; a < periodarray.length; a++) {
            array.push(ouarray[i] + "/" + periodarray[a]);
        }
    }
    return array;
};


//function to get ou/period combo rule monthly
var getOuPeriodLoopMonthly = function (ouarray, periodarray) {
    var array = [];
    for (var i = 0; i < ouarray.length; i++) {
        for (var a = 0; a < periodarray.length; a++) {
            array.push(ouarray[i] + "/" + periodarray[a]);
        }
    }
    return array;
};

var displayText = function (text) {
    document.getElementById('loadtext').innerHTML = text;
};

var getProperDate = function (d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

var displayValues = function (param,reportIndex) {
    console.log(param);
    var indicator = param.children[0].innerHTML;
    var ou = param.children[1].innerHTML;
    var period = param.children[2].innerHTML;
    var values = param.children[3].innerHTML;
    var status = param.children[4].innerHTML;
    var data = "<tr><td colspan='4'><b>" + indicator + "</b></td></tr>" +
        "<tr><td colspan='2'><b>Organisation Unit</b></td><td><b>Period</b></td><td><b>Status</b></td></tr>" +
        "<tr><td colspan='2'>" + ou + "</td><td>" + period + "</td><td>" + status + "</td></tr>" +
        "<tr><td colspan='2'><b>Data Elements Name</b></td><td colspan='2'><b>Values</b></td></tr>";
    var valuearray = values.split(',');
    for (var i = 0; i < valuearray.length; i++) {
        if(reportIndex == 1){
            data = data + "<tr><td colspan='2'>" + report1[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 2){
            data = data + "<tr><td colspan='2'>" + report2[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 3){
            data = data + "<tr><td colspan='2'>" + report3[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 4){
            data = data + "<tr><td colspan='2'>" + report4[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 5){
            data = data + "<tr><td colspan='2'>" + report5[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 6){
            data = data + "<tr><td colspan='2'>" + report6[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 7){
            data = data + "<tr><td colspan='2'>" + report7[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 8){
            data = data + "<tr><td colspan='2'>" + report8[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else if(reportIndex == 9){
            data = data + "<tr><td colspan='2'>" + report9[i] + "</td><td colspan='2'>" + valuearray[i] + "</td></tr>"
        }
        else{}
        }
    $(".popupTable tbody").remove();
    $(".popupTable tbody").detach();
    $('.popupTable').append(data);
    document.getElementById('myModal').style.display = 'block';
};