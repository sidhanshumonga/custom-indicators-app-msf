// created by Sidhanshu Monga
// 2018-04-10

//variables using
var hasFollowup3mon = 0, activeatendevent = 0, LTFU12mon = 0, LTFU6mon = 0, activeatanyp = 0, activetotal = 0, exitpatients = 0;


var activeandltfu = function (eventss, aa, len, p, ou) {
    var quarterToPush = getMonthToPush(p);
    var enddate = p;
    var startdate = getMonthStartDate(p);
    var count = 0, count2 = 0, count3 = 1, count4 = 1;
    var flag6mon = 0, countExit = 0;
    var flag12mon = 0;
    var activeatanypoint = false;
    var exitevents = [{ events: [] }];
    var followupvisits = [{ events: [] }];
    var firstVisit = [{ events: [] }];
    var predate = new Date(startdate);
    predate.setMonth(predate.getMonth() - 3);
    var events = [];
    var ec = 0;
    if (eventss !== undefined && eventss.length != 0) {

        for(var n = 0; n< eventss.length; n++){
            if(eventss[n].eventDate === undefined){
				
			}
			else{
				var date = eventss[n].eventDate;
            var first = date.split('T')[0];
            var expireDate1 = new Date(first);
            if(expireDate1 <= new Date(enddate)){
                events[ec] = eventss[n];
                ec++;
            }
			}
        }

        //filter events in single call 
        for (var a = events.length - 1; a >= 0; a--) {
            switch (events[a].programStage) {
                case "Kr60c8j7vMe"://exit
                    exitevents[0].events.push(events[a]);
                    break;

                case "HvBZokNtaEZ":// followup
                    followupvisits[0].events.push(events[a]);
                    break;

                case "kwXu1zEDMEe"://first visit
                    firstVisit[0].events.push(events[a]);
                    break;
            }
        }
        {
            // data1 api call
            if (exitevents[0].events.length == 0) {
                count = 1;
                activeatanypoint = true;
            }
            else {
				if(exitevents[0].events[0].eventDate !== undefined){
                var date = exitevents[0].events[0].eventDate;
                var first = date.split('T')[0];
                var expireDate = new Date(first);
                if (new Date(startdate) < expireDate) {
                    activeatanypoint = true;
                }
                if (new Date(enddate) < expireDate) {
                    count = 1;
                }
                if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {
                    countExit = 1;
                }
			}
            }

        }
        {
            if (followupvisits[0].events.length == 0) {
                count2 = 0;
            }
             else {

                if (count == 1) {
                    if(followupvisits[0].events[0].eventDate === undefined){}
                    else{
                    var date = followupvisits[0].events[0].eventDate;
                    var first = date.split('T')[0];
                    var latestEventDate = new Date(first);

                    var dateSixMonthsAgo = new Date(startdate);
                    var dateTwelveMonthsAgo = new Date(startdate);
                    dateSixMonthsAgo.setMonth(dateSixMonthsAgo.getMonth() - 6);
                    dateTwelveMonthsAgo.setFullYear(dateTwelveMonthsAgo.getFullYear() - 1);
                    dateTwelveMonthsAgo.setDate(dateTwelveMonthsAgo.getDate() - 1);
                    if (new Date(startdate) >= latestEventDate && latestEventDate >= predate) {
                        count2 = 1;
                    }

                    if (new Date(enddate) >= latestEventDate && latestEventDate >= dateSixMonthsAgo) {
                        count3 = 1;
                    }
                    else {
                        count3 = 0;
                    }
                    if (new Date(enddate) >= latestEventDate && latestEventDate >= dateTwelveMonthsAgo) {
                        count4 = 1;
                    }
                    else {
                        count4 = 0;
                    }
                }

                }
            }
        }

        {
            if (count == 1) {
                activeatendevent++;
            }
            if (activeatanypoint) {
                activeatanyp++;
                if (count2 == 1) {
                    hasFollowup3mon++;
                }
                if (count3 == 0) {
                    LTFU6mon++;
                }
                if (count4 == 0) {
                    LTFU12mon++;
                }
            }

            if (countExit == 1) {
                exitpatients++;
            }
            activetotal = activeatendevent + exitpatients;
        }
    }

    if (aa >= len - 1) {
        var dbarray = [hasFollowup3mon, activetotal, LTFU6mon, LTFU12mon, activeatanyp];
        pushfunctionR13(dbarray, getMonthToPush(p), ou);
    }

};

var pushfunctionR13 = function (value, month, selectedou) {
    var dataValueSet = {
        "dataSet": "dKQvkruMnqN",
        "period": month,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "GQB3ItZPMqo",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "sZOOUET6rbf",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[1]
        },
        {
            "dataElement": "kxAtq4g9TOQ",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[2]
        },
        {
            "dataElement": "Ouij0kxPyQk",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[3]
        },
        {
            "dataElement": "F5xG6cIiRIu",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": month,
            "orgUnit": selectedou,
            "value": value[4]
        }
        ]
    };
    $.ajax({
        async: false,
        type: 'post',
        dataType: 'json',
        contentType: "application/json",
        url: '../../dataValueSets',
        data: JSON.stringify(dataValueSet),
        success: function (response) {
            console.log("Successfully pushed for OU = " + selectedou + " and Period = " + month + " value " + value);
            var row = '<tr onclick="displayValues(this,13);"><td>Active and LTFU report</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            hasFollowup3mon = 0, activeatendevent = 0, LTFU12mon = 0, LTFU6mon = 0, activeatanyp = 0, activetotal = 0, exitpatients = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + month);
            var row = '<tr onclick="displayValues(this,13);"><td>Active and LTFU report</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            hasFollowup3mon = 0, activeatendevent = 0, LTFU12mon = 0, LTFU6mon = 0, activeatanyp = 0, activetotal = 0, exitpatients = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + month);
            var row = '<tr onclick="displayValues(this,13);"><td>Active and LTFU report</td><td>' + ounames[selectedou] + '</td><td>Monthly</td><td>' + month + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            hasFollowup3mon = 0, activeatendevent = 0, LTFU12mon = 0, LTFU6mon = 0, activeatanyp = 0, activetotal = 0, exitpatients = 0;
        }
    });
};