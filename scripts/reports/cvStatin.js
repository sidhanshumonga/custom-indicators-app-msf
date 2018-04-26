// created by Sidhanshu Monga
// 2018-04-09

//variables using
var totalPatientsWithCV = 0;
var totalPatientsWithCVonStatin = 0;


var cvstatin = function (eventss, aa, len, p, ou) {
    var quarterToPush = getQuarterToPush(p);

    var enddate = p;
    var startdate = getQuarterStartDate(p);

    var active = true, count2 = 0, count22 = 0, count3 = 0, flag = 0;
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
        if (events.length > 0 && events[events.length - 1].programStage == exitPS) {
            active = false;
        }
    
    if (active) {
        var index = -1;
        //check for first condition and save the index where it becomes true for next loop to start and break 
        //other wise leave it as -1
        // if first condition is true increase dtotalPatientsWithCV by 1

        //check first visit
        for (var j = 0; j < events.length && index == -1; j++) {
            for (var i = 0; i < events[j].dataValues.length && index == -1; i++) {
                var dataValue = events[j].dataValues[i];
                switch (dataValue.dataElement) {
                    case "Jo9Q7zgmtt1": //Angina pactoris on both stages boolean value
                        if (dataValue.value === "true") {
                            index = j;
                        }
                        break;

                    case "xs1fYqkRLW7"://Ishchemic heart disies bloolean value
                        if (dataValue.value === "true") {
                            index = j;
                        }
                        break;

                    case "TEP4nLvGj4d"://cabg boolean value
                        if (dataValue.value === "true") {
                            index = j;
                        }
                        break;

                    case "KGc70Z8QdL2"://angioplasty boolean value
                        if (dataValue.value === "true") {
                            index = j;
                        }
                        break;

                    case "nMYJ8iizuMT"://CVD firstvisit option set value (stroke or tia) os id = x9VaYfvIhcN
                        if (dataValue.value === "stroke" || dataValue.value === "tia") {
                            index = j;
                        }
                        break;

                    case "ZfAWkRlF6an"://CVD folllow up option set value (stroke or tia) os id = x9VaYfvIhcN
                        if (dataValue.value === "stroke" || dataValue.value === "tia") {
                            index = j;
                        }
                        break;

                }
            }
        }
        if (index >= 0) {
            totalPatientsWithCV++;
            var found = false;


            var priscriptionChanged = false;

            for (var j = events.length - 1; j > index && !priscriptionChanged /*&& !found*/; j--) {



                for (var i = 0; i < events[j].dataValues.length && !found; i++) {
                    var dataValue = events[j].dataValues[i];

                    if (medDataElements.includes(dataValue.dataElement)) {
                        priscriptionChanged = true;
                        if (medDataElementsValues.includes(trim(dataValue.value))) {
                            totalPatientsWithCVonStatin++;
                            found = true;
                        }
                    }
                }




            }


        }

    }

}

    if (aa >= len - 1) {
        var cvarray = [totalPatientsWithCVonStatin, totalPatientsWithCV];
        pushfunctionR4(cvarray, getQuarterToPush(p), ou);
    }

};

var pushfunctionR4 = function (value, quarter, selectedou) {
    var dataValueSet = {
        "dataSet": "tJ1JJ1o7gkj",
        "period": quarter,
        "orgUnit": selectedou,
        "dataValues": [{
            "dataElement": "yDl0JVbtXeI",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[0]
        },
        {
            "dataElement": "Sh0Fhfc8q5D",
            "categoryOptionCombo": "HllvX50cXC0",
            "period": quarter,
            "orgUnit": selectedou,
            "value": value[1]
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
            console.log("values pushed for OU = " + selectedou + " and Period = " + quarter + "and value  = " + value);
            var row = '<tr onclick="displayValues(this,5);"><td>Cv Statin</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#d0e0b8">Success</td></tr>'
            $('.reporttable').append(row);
            totalPatientsWithCV = 0, totalPatientsWithCVonStatin = 0;
        },
        warning: function (response) {
            console.log("Warning! for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,5);"><td>Cv Statin</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#fff995">Warning</td></tr>'
            $('.reporttable').append(row);
            totalPatientsWithCV = 0, totalPatientsWithCVonStatin = 0;
        },
        error: function (response) {
            console.log("ERROR for OU = " + selectedou + " and Period = " + quarter);
            var row = '<tr onclick="displayValues(this,5);"><td>Cv Statin</td><td>' + ounames[selectedou] + '</td><td>Quarterly</td><td>' + quarter + '</td><td>' + value + '</td><td style="background-color:#f55b5b">Error</td></tr>'
            $('.reporttable').append(row);
            totalPatientsWithCV = 0, totalPatientsWithCVonStatin = 0;
        }
    });
};