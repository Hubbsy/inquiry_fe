import Search from '../components/ProducingBrokers/Search';
import { SearchButton, SearchInput } from '@aeros-ui/components';
import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import { useState } from 'react';
import Table from '../components/ProducingBrokers/Table';
import { useProducingBrokersData } from '../hooks/ProducingBrokers/useProducingBrokersData';
const ProducingBrokers = () => {

    const [searchValue, setSearchValue] = useState("");
    const { showRows, rows } = useProducingBrokersData({searchValue});
    
    // const handleChange = (e) => {
    //     setSearchValue(e.currentTarget.value);
    // }

    return (
        <>
            <Search searchValue={searchValue} setSearchValue={setSearchValue} showRows={showRows}/>
            <Table rows={rows} />
        </>
    );
};

export default ProducingBrokers;
