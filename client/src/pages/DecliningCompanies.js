import { ErrorBoundary } from '@aeros-ui/components';
import Header from '../components/HOC/DecliningCompanies/header';
import DataTable from '../components/HOC/DecliningCompanies/table';
import { useShowRows } from '../hooks/useShowRows';

const DecliningCompanies = () => {
    const { showRows, rows } = useShowRows();
    return (
        <ErrorBoundary>
            <Header onShowRows={showRows} />
            <DataTable rows={rows} />
        </ErrorBoundary>
    );
};

export default DecliningCompanies;
