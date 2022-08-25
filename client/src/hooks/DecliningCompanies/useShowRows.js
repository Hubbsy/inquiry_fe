import mockDeclData from '../../api/mockDeclData';
import { useState } from 'react';

const useShowRows = () => {
    const [rows, setRows] = useState([]);

    const showRows = () => {
        const data = mockDeclData.map((company) => ({
            id: company.DECLINECOMPID,
            naic: company.NAIC,
            companyName: company.COMPANYNAME,
            domicile: company.DOMICILE,
            orgType: company.ORGTYPE
        }));

        setRows(data);
    };

    return { showRows, rows };
};

export { useShowRows };
