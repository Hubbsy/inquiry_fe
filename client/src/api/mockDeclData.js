const mockDeclData = [
    {
        COMPANYNAME: 'Allegany Co-op Insurance Company',
        DECLINECOMPID: 35,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:35.822451',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 30970,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Associated Mutual Insurance Cooperative',
        DECLINECOMPID: 105,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:35.95836',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 16489,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Central Co-operative Insurance Company',
        DECLINECOMPID: 163,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.057861',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 43826,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Cherry Valley Cooperative Insurance Company',
        DECLINECOMPID: 171,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.07724',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 29670,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Community Mutual Insurance Company',
        DECLINECOMPID: 200,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.130166',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 10025,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Dryden Mutual Insurance Company',
        DECLINECOMPID: 239,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.207704',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 13919,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Finger Lakes Fire & Casualty Company',
        DECLINECOMPID: 303,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.330902',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 43842,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Fulmont Mutual Insurance Company',
        DECLINECOMPID: 330,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.389414',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 26760,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Mid-Hudson Co-operative Insurance Company',
        DECLINECOMPID: 517,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.806975',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 35866,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'New York Central Mutual Fire Insurance Company',
        DECLINECOMPID: 578,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.93506',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 14834,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'North Country Insurance Company',
        DECLINECOMPID: 594,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:36.964329',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 43869,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Ontario Insurance Company',
        DECLINECOMPID: 626,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:37.019303',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 22870,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Otsego Mutual Fire Insurance Company',
        DECLINECOMPID: 631,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:37.032081',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 14915,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Preferred Mutual Insurance Company',
        DECLINECOMPID: 675,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:37.130346',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 15024,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Security Mutual Insurance Company',
        DECLINECOMPID: 755,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:37.268402',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 15113,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Sterling Insurance Company',
        DECLINECOMPID: 793,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:37.340499',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 15210,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'United Frontier Mutual Insurance Company',
        DECLINECOMPID: 869,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:37.511975',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 16250,
        ORGTYPE: 'APC',
        STATUS: ''
    },
    {
        COMPANYNAME: 'Utica First Insurance Company',
        DECLINECOMPID: 894,
        DOMICILE: 'NEW YORK',
        INACTIVEDATE: '',
        LASTUPDATEDATE: '2022-08-22 04:59:37.562678',
        LASTUPDATEUSER: 'RSIDEV',
        NAIC: 15326,
        ORGTYPE: 'APC',
        STATUS: ''
    }
];

export default mockDeclData;
