// created by Sidhanshu Monga
// 2018-04-10

//variables using
var TotalHba1c = 0;
var TotalHba1cLessThan8 = 0;
var type1LessThan8 = 0;
var type1TotalHba1c = 0;
var type2LessThan8 = 0;
var type2TotalHba1c = 0;


var hba1cLessThan8 = function (eventss, aa, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);
    var enddate = p;
    var startdate = getQuarterStartDate(p);
    var active = false;
    var oneYearBeforeEndDate = new Date(enddate);
    oneYearBeforeEndDate.setFullYear(oneYearBeforeEndDate.getFullYear() - 1);
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
        if(events[0] !==  undefined){
        if (events[0].programStage != 'Kr60c8j7vMe') {
            active = true;
        }
    }

        if (events.length > 0 && active) {
            var hba1cval = -1;
            var bha1ctestDate = undefined;

            var oneYearAfterDiagnosedDate = undefined;

            var shouldContinue = true;
            var applicable = false;
            var countable = false;

            var type1 = false;
            var type2 = false;
            var valid = false;


            for (var b = 0; b < events.length && shouldContinue; b++) {
                if(events[b].eventDate !== undefined){
                var date = events[b].eventDate;
                var first = date.split('T')[0];
                var eventDate = new Date(first);
                var currentEventAttr = events[b].dataValues;
                if ((eventDate >= new Date(startdate) || eventDate <= new Date(enddate)) && b == 0) {
                    valid = true;
                }

                for (var j = 0; j < currentEventAttr.length; j++) {
                    // data element diabaties type 1 ,Diabetes type I (follow-up),Diabetes type II (follow-up),Diabetes type II 
                    if ((currentEventAttr[j].dataElement == "lzBg6QalyhT" || currentEventAttr[j].dataElement == "rwDJebu16Fu" || currentEventAttr[j].dataElement == "uoVoakOJULl" || currentEventAttr[j].dataElement == "nwFajZjl3Fa") && (currentEventAttr[j].value == "Newly_diagnosed" || currentEventAttr[j].value == "Previously_diagnosed")) {
                        oneYearAfterDiagnosedDate = new Date(first);

                        oneYearAfterDiagnosedDate.setFullYear(oneYearAfterDiagnosedDate.getFullYear() + 1);
                        if (currentEventAttr[j].dataElement == "lzBg6QalyhT" || currentEventAttr[j].dataElement == "rwDJebu16Fu") {
                            type1 = true;
                            type2 = false;

                        } else {
                            type1 = false;
                            type2 = true;
                        }

                    }

                    if ((currentEventAttr[j].dataElement == "ZBbL9cBrNlY" || currentEventAttr[j].dataElement == "mxYJdCoqEaI") && hba1cval < 1) {
                        bha1ctestDate = new Date(first);
                        hba1cval = currentEventAttr[j].value;
                    }


                }

                if (bha1ctestDate != undefined && oneYearAfterDiagnosedDate != undefined && bha1ctestDate != oneYearAfterDiagnosedDate) {
                    //if(bha1ctestDate>=oneYearAfterDiagnosedDate && hba1cval>0 && bha1ctestDate>=oneYearBeforeEndDate && oneYearAfterDiagnosedDate<= new Date(enddate)){
                    if (oneYearAfterDiagnosedDate <= new Date(enddate) && bha1ctestDate >= oneYearBeforeEndDate && bha1ctestDate >= oneYearBeforeEndDate && hba1cval > 0 && bha1ctestDate >= oneYearAfterDiagnosedDate) {
                        //	console.log("TEI " + tei + " hba1c Test date " + bha1ctestDate + " one Year after diagnosis " + oneYearAfterDiagnosedDate + " HBA1C val" + hba1cval);
                        applicable = true;
                        if (hba1cval < 8) {
                            countable = true;
                        }
                        shouldContinue = false;
                    }
                }
            }

            }

        }
    }

    if (valid) {
        if (applicable) {
            TotalHba1c++;
            if (type1) {
                type1TotalHba1c++;
                //type1LessThan8++;
            } else if (type2) {

                type2TotalHba1c++;
                //type2LessThan8++;
            }
        }
        if (countable) {
            TotalHba1cLessThan8++;
            if (type1) {
                //type1TotalHba1c++;
                type1LessThan8++;
            } else if (type2) {

                //type2TotalHba1c++;
                type2LessThan8++;
            }
        }
    }





    // if (count == 1 && count2 == 1) { totalEndevent2++; }
    // if (count == 1 && count3 == 1) { totalEndevent++; }



    if (aa >= len - 1) {
        var hbarray = [TotalHba1cLessThan8, TotalHba1c, type1LessThan8, type1TotalHba1c, type2LessThan8, type2TotalHba1c];
        pushfunctionR7(hbarray, getQuarterToPush(p), ou);
    }

};

var pushfunctionR7 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "Z7cpfCq4xds",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "eJvNWvntO2N",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
        },
        {
            "dataElement": "doLQKWfnUlI",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[2]
        },
        {
            "dataElement": "Oe9O9DEc31e",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[3]
        },
        {
            "dataElement": "IF5bE2wPkfk",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[4]
        },
        {
            "dataElement": "xsBM7olwm5O",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[5]
        },
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
            console.log("Successfully pushed for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,7);"><td>Hba1c less than 8 in last 12 months</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            TotalHba1c = 0, TotalHba1cLessThan8 = 0, type1LessThan8 = 0, type1TotalHba1c = 0, type2LessThan8 = 0, type2TotalHba1c = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,7);"><td>Hba1c less than 8 in last 12 months</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            TotalHba1c = 0, TotalHba1cLessThan8 = 0, type1LessThan8 = 0, type1TotalHba1c = 0, type2LessThan8 = 0, type2TotalHba1c = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,7);"><td>Hba1c less than 8 in last 12 months</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            TotalHba1c = 0, TotalHba1cLessThan8 = 0, type1LessThan8 = 0, type1TotalHba1c = 0, type2LessThan8 = 0, type2TotalHba1c = 0;
        }
    });
};