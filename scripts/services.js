// created by Sidhanshu Monga
// 2018-04-05

// AJAX calls functions

// function to get all Teis

var _getAllTeis = function () {
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: '../../trackedEntityInstances.json?ouMode=ALL&fields=trackedEntityInstance&skipPaging=true',
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
};

var _getAllEventsOfTei = function (tei) {
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: '../../events.json?skipPaging=true&program=VCuHIFtJJSv&trackedEntityInstance=' + tei,
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
};

var _getAllEnrollments = function () {
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "../../enrollments.json?ouMode=ALL&program=VCuHIFtJJSv&fields=trackedEntityInstance&skipPaging=true",
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
};

var _getAllEnrollmentsOfOu = function (ou, date) {
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "../../enrollments.json?ou=" + ou + "&ouMode=DESCENDANTS&program=VCuHIFtJJSv&fields=trackedEntityInstance&skipPaging=true&programEndDate=" + date,
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
};

var _getAllOus = function () {
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "../api/organisationUnits/oo6xFWZ9n1y.json?level=3",
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
};