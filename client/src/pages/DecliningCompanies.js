import { ErrorBoundary } from '@aeros-ui/components';
import Header from '../components/DecliningCompanies/header';
import DataTable from '../components/DecliningCompanies/table';
import { useShowRows } from '../hooks/DecliningCompanies/useShowRows';
import { useShowOrg } from '../hooks/DecliningCompanies/useShowOrg';

const DecliningCompanies = () => {
    const { showRows, rows } = useShowRows();
    const { organization } = useShowOrg();
    return (
        <ErrorBoundary>
            <Header onShowRows={showRows} organization={organization} />
            <DataTable rows={rows} />
        </ErrorBoundary>
    );
};

export default DecliningCompanies;
