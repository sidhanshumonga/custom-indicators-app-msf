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
        url: '../../events.json?skipPaging=true&program=VCuHIFtJJSv&order=eventDate:ASC&trackedEntityInstance=' + tei,
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
};

var _getAllEventsOfTeiDESC = function (tei) {
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: '../../events.json?skipPaging=true&program=VCuHIFtJJSv&order=eventDate:DESC&trackedEntityInstance=' + tei,
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

var _getAllEnrollmentsOfOuWithSdEd = function (ou, sd, ed) {
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "../../enrollments.json?ou=" + ou + "&ouMode=DESCENDANTS&program=VCuHIFtJJSv&fields=trackedEntityInstance&skipPaging=true&programStartDate=" + sd + "&programEndDate=" + ed,
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
        url: "../../organisationUnits/oo6xFWZ9n1y.json?level=3&fields=[name,id]",
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
};

var _getGender = function (tei) {
    var def = $.Deferred();
    $.ajax({
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        url: "../../trackedEntityInstances/" + tei + ".json?fields=attributes",
        success: function (data) {
            def.resolve(data);
        }
    });
    return def;
};