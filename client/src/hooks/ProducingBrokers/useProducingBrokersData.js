import mockProdBrokData from '../../api/mockProdBrokers';
import {React,  useState } from 'react';

const useProducingBrokersData = ({searchValue}) => {
    const [rows, setRows] = useState([]);

    const showRows = () => {
        if (searchValue.length >= 3) {
            const data = mockProdBrokData.map((company) => ({
                licenseNo: company.LICENSENO,
                firstName: company.BROKERNAME1,
                lastName: company.BROKERNAME2,
                effectiveDate: company.EFFECTIVEDATE,
                expDate: company.EXPIRATIONDATE
            }));
            
            setRows(data);
        }
    };

    return { showRows, rows };
};

export { useProducingBrokersData };
