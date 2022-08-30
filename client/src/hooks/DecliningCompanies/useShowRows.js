import { useState } from 'react';

const useShowRows = (declData) => {
    const [rows, setRows] = useState([]);
    // const []
    console.log(declData);

    const showRows = () => {
        const data = declData.map((company) => ({
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
