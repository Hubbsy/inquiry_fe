import Typography from '@mui/material/Typography';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@aeros-ui/components';
import Button from '@mui/material/Button';

class Affidavits extends Component {
    state = {
        snackbarOpen: false
    };
    componentDidMount() {
        console.log('PROPS MOUNT:', this.props);
    }

    componentDidUpdate(prevProps) {
        // console.log("PREV PROPS:", prevProps)
        // console.log("PROPS:", this.props)
        console.log(
            'CONDITION:',
            prevProps.token !== this.props.token &&
                this.props.token !== null &&
                this.props.endpoint !== null
        );
        if (
            prevProps.token !== this.props.token &&
            this.props.token !== null &&
            this.props.endpoint !== null
        ) {
            // make initial load request if needed
            console.log('PROPS:', this.props);
        }

        if (prevProps.error !== this.props.error && this.props.error !== null) {
            this.setState({ snackbarOpen: true });
        }
    }

    handleClose = () => {
        this.setState({ snackbarOpen: false });
    };

    search = () => {
        // make axios request
    };

    render() {
        return (
            <>
                <Typography variant='h6'>Affidavit Inquiry Subpage</Typography>
                <Button onClick={() => this.search()}>Search</Button>
                {this.state.snackbarOpen ? (
                    <Snackbar
                        open={this.state.snackbarOpen}
                        handleClose={this.handleClose}
                        severity='error'
                        title='Something went wrong'
                        message={this.props.error}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />
                ) : null}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        endpoint: state.session.endpoint,
        token: state.session.auth.token,
        // change to the search error
        error: state.session.auth.error
    };
};

export default connect(mapStateToProps, null)(Affidavits);
