import Search from '../components/ProducingBrokers/Search';
import Table from '../components/ProducingBrokers/Table';
import { useProducingBrokersData } from '../hooks/ProducingBrokers/useProducingBrokersData';
const ProducingBrokers = () => {

    const { showRows, rows } = useProducingBrokersData();

    return (
        <>
            <Search onShowRows={showRows}/>
            <Table rows={rows} />
        </>
    );
};

export default ProducingBrokers;
