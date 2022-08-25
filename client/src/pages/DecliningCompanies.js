import { ErrorBoundary } from '@aeros-ui/components';
import Header from '../components/DecliningCompanies/header';
import DataTable from '../components/DecliningCompanies/table';
import { useShowRows } from '../hooks/DecliningCompanies/useShowRows';
import { useShowOrg } from '../hooks/DecliningCompanies/useShowOrg';

const DecliningCompanies = () => {
    const { showRows, rows } = useShowRows();
    const { organizations } = useShowOrg();
    return (
        <ErrorBoundary>
            <Header onShowRows={showRows} organizations={organizations} />
            <DataTable rows={rows} />
        </ErrorBoundary>
    );
};

export default DecliningCompanies;
