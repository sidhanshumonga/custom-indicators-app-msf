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


//new diagnosis report variables used
var d1 = "MIOqsaeW1s5";
var d2 = "rLfKA2uDpI1";
var d3 = "XBpPEm4twyG";
var d4 = "lzBg6QalyhT";
var d5 = "uoVoakOJULl";
var d6 = "pHxWTwQMMmR";
var d7 = "PoCEfKNlJJk";
var d8 = "Ft37n3yO81y";
var d9 = "JYrVSslAvWF";
var d10 = "z7aLqkhkdIn";

var dd1 = "iqnWbI6EFOb";
var dd2 = "GSH68kIsvKX";
var dd3 = "tLUOAB3NwP8";
var dd4 = "rwDJebu16Fu";
var dd5 = "nwFajZjl3Fa";
var dd6 = "xwLbbjni5iY";
var dd7 = "Qw7vZ5x7H0e";
var dd8 = "D4Z6XYfNQR9";
var dd9 = "CqOIRxdVmay";
var dd10 = "es15Sv05Nmb";

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
var med21 = "Indapamide-1.5 mg";
var med22 = "Spironolactone-25mg";
var med23 = "Telmisartan/Hydrochlorothiazide";
var med24 = "Diltiazem-60 mg";
var med25 = "Telmisartan-80 mg";
var med26 = "Hydrochlorothiazide-100 mg";
var med27 = "Losartan-50 mg";
var med28 = "Propranolol-40 mg";
var med29 = "Nifedipine-20 mg";
var med30 = "Verapamil hydrochloride-80mg";
var med31 = "Telmisartan-40 mg";
var med32 = "Losartan-100mg";


var medications = [med1, med2, med3, med4, med5, med6, med7, med8, med9,
    med10, med11, med12, med13, med14, med15, med16, med17, med18, med19, med20, med21, med22, med23, med24, med25, med26, med27, med28, med29,
    med30, med31, med32];

var medDataElements1 =
    ["nQ32sHUnPKv", "e4RAOrfr6Oz", "JiMkzWDtYwL", "SSHzwRe5rWG", "QGddWBd4WGw", "bHdzWTNZvM3", "gTL8HOgeCq2", "TzdFTRlnjeC", "oQIMNkobUke", "CEP72QOx3GW", "Uza0ZnZ1XxV", "Lmo1tDeH2r8",
        "wd9KkclB1dg", "IMvy9x1Xuo9", "E60ikhXksxo", "TGu4kRLXmru", "JDTlrMsHXke", "FTNyHVtzOcy", "XAsWYJD5mRD", "hOEQiwt21Hj", "qtWD2pOQmFk", "SVIpRhaadFs", "D9PrDVUMtmB", "mvBYfc9pMF2",
    "ArPq6EPL3aI","AwNvduIlRsA","C2TfORhHDDU","dVlfEbgLd3b","F6K4pNOCBWE","HkBhvj7LGYk","ingpvWNWwQg","iW2irglilem","j1S89e7IvvW","k24SAk2vEWx","mT0TEvdzUz3","n1hzIerKJ61"];

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

var report10 = ["Active patients at end of reporting quarter who enrolled in same quarter last year-Calculated value_NCD",
    "Patients enrolled in same quarter last year-Calculated value_NCD"];

var report11 = ["Number of insulin diabetic type 1 patients seen in the reporting period",
    "Number of insulin diabetic type 2 patients seen in the reporting period",
    "Number of new insulin diabetic type 1 patients seen in the reporting period",
    "Number of new insulin diabetic type 2 patients seen in the reporting period",
    "Total number of new diabetic type 1 patients seen in the reporting period",
    "Total number of new diabetic type 2 patients seen in the reporting period"];

var report12 = ["Number of new diagnosised patients during the reporting period"];

var report13 = ["Patients with at least 1 follow-up consultation in previous 3 months-Calculated value_NCD",
    "Active patients + exit patients during reporting period-Calculated value_NCD",    
    "LTFU (> 6 months)-Calculated value_NCD",
    "LTFU (> 12 months)-Calculated value_NCD",
    "Active patients (monthly, end of reporting period)-Calculated value_NCD"];