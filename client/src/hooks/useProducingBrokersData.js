import mockProdBrokData from '../api/mockProdBrokers';
import { useState } from 'react';

const useProducingBrokersData = () => {
    const [rows, setRows] = useState([]);

    const showRows = () => {
        const data = mockProdBrokData.map((company) => ({
            licenseNo: company.LICENSENO,
            firstName: company.BROKERNAME1,
            lastName: company.BROKERNAME2,
            effectiveDate: company.EFFECTIVEDATE,
            expDate: company.EXPIRATIONDATE
        }));

        console.log(data);
        setRows(data);
    };

    return { showRows, rows };
};

export { useProducingBrokersData };
