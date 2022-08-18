import { useLocation, useNavigate } from 'react-router';

const withRouter = (Child) => {
    return (props) => {
        const { search } = useLocation();
        const navigate = useNavigate();
        return <Child {...props} navigate={navigate} search={search} />;
    };
};

export default withRouter;
