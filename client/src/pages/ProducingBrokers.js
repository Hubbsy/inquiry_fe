import Search from '../components/ProducingBrokers/Search';
import { SearchButton, SearchInput } from '@aeros-ui/components';
import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import Table from '../components/ProducingBrokers/Table';
import { useProducingBrokersData } from '../hooks/ProducingBrokers/useProducingBrokersData';
import { RemoveDoneRounded } from '@mui/icons-material';
import { connect } from 'react-redux';
import { getProducingBrokers} from '../store/actions/brokers';

class ProducingBrokers extends React.Component {

    state = {
        searchValue: "",
        rows: [],
        errorStyle: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    handleChange = (e) => {
        console.log(e.target);
        if (e.target.value.length < 3) {
            this.setState({
                searchValue: e.target.value,
                errorStyle: true
            })
        }
        else {
            this.setState({
                searchValue: e.target.value,
                errorStyle: false
            })
        }
    }

    showRows = () => {
        console.log("show rows");
        const data = {
            COMBOSEARCH: this.state.searchValue, 
            ACTIVEONLY: "TRUE",
            BROKERTYPE: "P"
        }

        if (this.state.searchValue.length >= 3) {
            this.props.getProducingBrokers(this.props.endpoint, this.props.token, data)
            .then(response => {
                if (this.props.data && this.props.data.length) {
                    const data = this.props.data.map((company) => ({
                        licenseNo: company.LICENSENO,
                        firstName: company.BROKERNAME1,
                        lastName: company.BROKERNAME2,
                        effectiveDate: company.EFFECTIVEDATE,
                        expDate: company.EXPIRATIONDATE
                    }));

                    this.setState({
                        rows: data
                    })
                }
                else {
                    this.setState({
                        rows: []
                    })
                }
            })
        }
    }

    // handleKeyPress = (e) => {
    //     console.log(e.target);
    //     if (e.charCode === 13 && e.target.value.length >= 3) {
    //         // showRows({searchValue});
    //         useProducingBrokersData({searchValue});
    //     }
    // };


    // const [searchValue, setSearchValue] = useState("");
    // const { showRows, rows } = useProducingBrokersData({searchValue});

    render() {
        return (
            <>
            {console.log(this.state)}
                <Search errorStyle={this.state.errorStyle} searchValue={this.state.searchValue} handleChange={this.handleChange} showRows={this.showRows}/>
                <Table rows={this.state.rows} />
            </>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        endpoint: state.session.endpoint,
        loading: state.brokers.producing.loading,
        data: state.brokers.producing.data, 
        error: state.brokers.producing.error, 
        token: state.session.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducingBrokers: (endpoint, token, data) => dispatch(getProducingBrokers(endpoint, token, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProducingBrokers);
