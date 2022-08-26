import mockDeclCompanies from '../../api/mockDeclCompanies';
import { useState } from 'react';

const useShowOrg = () => {
    const data = mockDeclCompanies.map((company) => ({
        code: company.CODE,
        description: company.DESCRIPTION
    }));

    const [organizations, setOrganizations] = useState([
        { code: 'ALL', description: 'ALL' },
        ...data
    ]);

    return { organizations, setOrganizations };
};

export { useShowOrg };
