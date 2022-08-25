import mockDeclCompanies from '../../api/mockDeclCompanies';
import { useState } from 'react';

const useShowOrg = () => {
    const data = mockDeclCompanies.map((company) => ({
        code: company.CODE,
        description: company.DESCRIPTION
    }));

    const [organization, setOrganization] = useState([{ code: ' ', description: 'ALL' }, ...data]);

    return { organization, setOrganization };
};

export { useShowOrg };
