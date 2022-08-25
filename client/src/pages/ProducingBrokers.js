import Search from '../components/ProducingBrokers/Search';
import { SearchButton, SearchInput } from '@aeros-ui/components';
import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import Table from '../components/ProducingBrokers/Table';
import { useProducingBrokersData } from '../hooks/ProducingBrokers/useProducingBrokersData';
const ProducingBrokers = () => {

    const { showRows, rows } = useProducingBrokersData();
    const [searchValue, setSearchValue] = useState("");
    
    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchValue(e.target.value);
    }

    return (
        <>
            <Search searchValue={searchValue} handleChange={handleChange} showRows={showRows}/>
            <Table rows={rows} />
        </>
    );
};

export default ProducingBrokers;
