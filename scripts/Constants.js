var loadingText = "";

//COPD and Asthama report
var firstStageCOPDDataElementId = "GSH68kIsvKX";
var followupVisitStageCOPDDataElementID = "rLfKA2uDpI1";
var firstVisitAsthmaDataElement = "iqnWbI6EFOb";
var followupVisitAsthmaDataElement = "MIOqsaeW1s5";


//program stages
var exitPS = "Kr60c8j7vMe";
var followupPS = "HvBZokNtaEZ";
var firstVisitPS = "kwXu1zEDMEe";

//medication dataelements
var medDataElements =
    ["nQ32sHUnPKv", "e4RAOrfr6Oz", "JiMkzWDtYwL", "SSHzwRe5rWG", "QGddWBd4WGw", "bHdzWTNZvM3", "gTL8HOgeCq2", "TzdFTRlnjeC", "oQIMNkobUke", "CEP72QOx3GW",
        "wd9KkclB1dg", "IMvy9x1Xuo9", "E60ikhXksxo", "TGu4kRLXmru", "JDTlrMsHXke", "FTNyHVtzOcy", "XAsWYJD5mRD", "hOEQiwt21Hj", "qtWD2pOQmFk", "SVIpRhaadFs"];
var medDataElementsValues = [
    "Atorvastatin 40 mg",
    "Atrorvastatin 20mg",
    "Simvastatin-20 mg",
    "Simvastatin-10 mg"
];


var med1 = "Amlodipine-5 mg";
var med2 = "Atenolol-50 mg";
var med3 = "Bisoprolol Fumarate-5 mg";
var med4 = "Captopril-25 mg";
var med5 = "Captopril-50 mg";
var med6 = "Enalapril-10mg";
var med7 = "Enalapril-20mg";
var med8 = "Enalapril-5 mg";
var med9 = "Hydrochlorothiazide-25 mg";
var med10 = "Hydrochlorothiazide-50 mg";
var med11 = "Isosorbide dinitrate-10 mg tab";
var med12 = "Losartan/Hydrocholothiazide-12.5 mg";
var med13 = "Methyldopa-250 mg";
var med14 = "Nifedipine 30mg";
var med15 = "Ramipril tab-5 mg";
var med16 = "Ramipril 10mg";
var med17 = "Valsartan 80mg (Diovan)";
var med18 = "Bisoprolol hemifumarate 10 mg";
var med19 = "Losartan potassium 50 mg";
var med20 = "Captopril 50 mg/hct 25 mg";


var medications = [med1, med2, med3, med4, med5, med6, med7, med8, med9,
    med10, med11, med12, med13, med14, med15, med16, med17, med18, med19, med20];

var medDataElements1 =
    ["nQ32sHUnPKv", "e4RAOrfr6Oz", "JiMkzWDtYwL", "SSHzwRe5rWG", "QGddWBd4WGw", "bHdzWTNZvM3", "gTL8HOgeCq2", "TzdFTRlnjeC", "oQIMNkobUke", "CEP72QOx3GW", "Uza0ZnZ1XxV", "Lmo1tDeH2r8",
        "wd9KkclB1dg", "IMvy9x1Xuo9", "E60ikhXksxo", "TGu4kRLXmru", "JDTlrMsHXke", "FTNyHVtzOcy", "XAsWYJD5mRD", "hOEQiwt21Hj", "qtWD2pOQmFk", "SVIpRhaadFs", "D9PrDVUMtmB", "mvBYfc9pMF2"];

// arrays for displaying values in popup

var report1 = ["Active Patients at end of RP"];

var report2 = ["COPD patients under care (>= 15 months) under control-Calculated value_NCD",
    "COPD patients under care (>= 15 months)-Calculated value_NCD",
    "Asthma patients under care (>= 15 months) under control-Calculated value_NCD",
    "Asthma patients under care >= 15 months-Calculated value_NCD"];

    var report3 = ["Creatinine clearance >=90-Calculated value_NCD",
    "Creatinine clearance between 60 and 89-Calculated value_NCD", 
    "Creatinine clearance between 30 and 59-Calculated value_NCD", 
    "Creatinine clearance between 15 and 29-Calculated value_NCD", 
    "Creatinine clearance < 15-Calculated value_NCD", 
    "Patients having creatinine clearance value-Calculated value_NCD<"];

    var report4 = ["Active+Exit HTN and DB patients-Calculated value_NCD",
    "Creatinine test done in past 12 months-Calculated value_NCD",
    "Active HTN and DB patients seen in reporting period-Calculated value_NCD",
    "HTN or/and DB patients with recorded CV event-Calculated value_NCD"];

var report5 = ["Patients with previous CV event on statin-Calculated value_NCD",
    "Patients with previous CV event-Calculated value_NCD"];

var report6 = ["Diabetic patients seen in the reporting period with HbA1c done in past 6 months-Calculated value_NCD",
    "Total number of diabetic patients seen in the reporting period"];

var report7 = ["Number of diabetic patients having less than 8 HbA1c value out of total and in the care more than 12 months",
    "Number of diabetic patients seen in the reporting period with an HbA1c in the past 12 months",
    "Number of diabetic Type 1 patients seen in the reporting period with an HbA1c value less than 8 in the past 12 months",
    "Total number of diabetic Type 1 patients seen in the reporting period with an HbA1c in the past 12 months",
    "Number of diabetic Type 2 patients seen in the reporting period with an HbA1c value less than 8 in the past 12 months",
    "Total number of diabetic Type 2 patients seen in the reporting period with an HbA1c in the past 12 months"];

var report8 = ["Hypertension Total Patients",
    "Hypertension Stage 1 Patients",
    "Hypertension Stage 2 Patients",
    "Hypertension Stage 3 Patients "];

var report9 = ["Number of perscribed antihypertensive medications during the reporting period",
    "Total number of hypertensive patients seen in the reporting period",
    "Total number of hypertensive patients taken 1 medicine",
    "Total number of hypertensive patients taken 2 medicines",
    "Total number of hypertensive patients taken more than 3 medicines",
    "Total number of hypertensive patients on therapy ≥12 months by the end of the reporting period",
    "Number of patients with latest Systolic BP recorded ≤140 AND latest Diastolic BP  ≤90mmHg on therapy ≥12 months by the end of the reporting",];