// created by Sidhanshu Monga
// 2018-04-10

//variables using
var totalHTNPatients = 0;
var totalStage1Patients = 0;
var totalStage2Patients = 0;
var totalStage3Patients = 0;


var htncontrol = function (eventss, aa, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);
    var enddate = p;
    var startdate = getQuarterStartDate(p);

    var count = 0, count2 = 0, count22 = 0, count3 = 0, flag = 0;
    var stage1f = 0, stage2f = 0, stage3f = 0;
    var prestage1f = 0, prestage2f = 0, prestage3f = 0;
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
       
            for (var b = 0; b < events.length; b++) {

                if(events[b].eventDate !== undefined){
                var date = events[b].eventDate;
                var first = date.split('T')[0];
                var expireDate = new Date(first);

                var currentEventAttr = events[b].dataValues;

                if (new Date(enddate) >= expireDate && expireDate >= new Date(startdate)) {

                    for (var j = 0; j < currentEventAttr.length; j++) {
                        if ((currentEventAttr[j].dataElement == "D4Z6XYfNQR9" || currentEventAttr[j].dataElement == "Ft37n3yO81y") && (currentEventAttr[j].value == "Newly_diagnosed")) {
                            count2 = 1;
                        }
                        if (prestage1f != 1) {
                            if ((currentEventAttr[j].dataElement == "FwEKkTnhiQa" || currentEventAttr[j].dataElement == "rBNRkcu7Tqw") && currentEventAttr[j].value == "Stage 1") {
                                stage1f = 1;
                                //break;
                            }
                        }
                        if (prestage2f != 1) {
                            if ((currentEventAttr[j].dataElement == "FwEKkTnhiQa" || currentEventAttr[j].dataElement == "rBNRkcu7Tqw") && currentEventAttr[j].value == "Stage 2") {
                                stage2f = 1;
                                //break;
                            }
                        }
                        if (prestage3f != 1) {
                            if ((currentEventAttr[j].dataElement == "FwEKkTnhiQa" || currentEventAttr[j].dataElement == "rBNRkcu7Tqw") && currentEventAttr[j].value == "Stage 3") {
                                stage3f = 1;
                                //break;
                            }
                        }

                    }
                }
                else {
                    for (var j = 0; j < currentEventAttr.length; j++) {
                        if ((currentEventAttr[j].dataElement == "FwEKkTnhiQa" || currentEventAttr[j].dataElement == "rBNRkcu7Tqw") && currentEventAttr[j].value == "Stage 1") {
                            prestage1f = 1;
                            //	break;
                        }
                        if ((currentEventAttr[j].dataElement == "FwEKkTnhiQa" || currentEventAttr[j].dataElement == "rBNRkcu7Tqw") && currentEventAttr[j].value == "Stage 2") {
                            prestage2f = 1;
                            //	break;
                        }
                        if ((currentEventAttr[j].dataElement == "FwEKkTnhiQa" || currentEventAttr[j].dataElement == "rBNRkcu7Tqw") && currentEventAttr[j].value == "Stage 3") {
                            prestage3f = 1;
                            //	break;
                        }
                    }
                }
            }
            }
    
    }


    if (count2 == 1 && (stage1f == 1 || stage2f == 1 || stage3f == 1)) { totalHTNPatients++; }
    if (count2 == 1 && stage1f == 1) { totalStage1Patients++; }
    if (count2 == 1 && stage2f == 1) { totalStage2Patients++; }
    if (count2 == 1 && stage3f == 1) { totalStage3Patients++; }


    if (aa >= len - 1) {
        var valuesarray = [totalStage1Patients, totalStage2Patients, totalStage3Patients, totalHTNPatients];
        pushfunctionR9(valuesarray, getQuarterToPush(p), ou);
    }

};

var pushfunctionR9 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "uCbdC8qRAT4",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "LIrfXOPU7cM",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
        },
        {
            "dataElement": "R7LIerGQSOQ",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[2]
        },
        {
            "dataElement": "jx47UeKdNO8",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[3]
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
            console.log("Successfully pushed for OU = " + selectedou + " and Period = " + quarter + " value " + value);
            var row = '<tr onclick="displayValues(this,8);"><td>HTN Control</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            totalHTNPatients = 0, totalStage1Patients = 0, totalStage2Patients = 0, totalStage3Patients = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,8);"><td>HTN Control</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            totalHTNPatients = 0, totalStage1Patients = 0, totalStage2Patients = 0, totalStage3Patients = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,8);"><td>HTN Control</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            totalHTNPatients = 0, totalStage1Patients = 0, totalStage2Patients = 0, totalStage3Patients = 0;
        }
    });
};