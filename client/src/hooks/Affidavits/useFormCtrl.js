import { useState } from 'react';
import { useSearchValidation } from './useSearchValidation';
import { formatDate } from '../../functions/dates';

const useFormCtrl = (
    advancedSearchActive,
    endpoint,
    token,
    getAffidavits,
    applicationErrors,
    handleErrorMessages,
    resetAppErrors
) => {
    const [comboSearch, setComboSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [emptyAdvSearch, setEmptyAdvSearch] = useState(false);

    const advSearchBase = {
        AFFIDAVITNUMBER: '',
        POLICYNUMBER: '',
        INSUREDNAME: '',
        CONTACTNAME: '',
        BROKERREFERENCE: '',
        BATCH: '',
        PREMIUMFROM: '',
        PREMIUMTO: ''
    };

    const [advancedSearch, setAdvancedSearch] = useState(advSearchBase);

    // -------BUTTON HANDLERS -------
    // clear button handler
    const handleClearAdvSearch = (clearDates = true) => {
        if (clearDates) {
            setStartDate(null);
            setEndDate(null);
        }

        resetAppErrors();
        setAdvancedSearch(advSearchBase);
    };

    const handleClearAdvSearchInput = (name) => {
        setAdvancedSearch({
            ...advancedSearch,
            [name]: ''
        });
    };

    const handleClearCombo = () => {
        setComboSearch('');
    };

    //------- SEARCH INPUT HANDLERS -------

    const handleSearchInput = (e) => {
        let { value, name } = e.target;

        if (name === 'COMBOSEARCH') {
            setComboSearch(value);
        } else if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        } else if (advancedSearch.hasOwnProperty(name)) {
            if (comboSearch.length > 0) {
                handleClearCombo();
            }

            setAdvancedSearch({
                ...advancedSearch,
                [name]: value
            });
        }
    };

    const handleSubmit = () => {
        let validSearch = false;
        const { validateStandardSearch, validateAdvancedSearch } = useSearchValidation(
            comboSearch,
            startDate,
            endDate,
            applicationErrors,
            handleErrorMessages,
            advancedSearch,
            setEndDate,
            setStartDate
        );

        if (advancedSearchActive) {
            handleClearCombo();
            validSearch = validateAdvancedSearch();
        } else {
            handleClearAdvSearch(false);
            validSearch = validateStandardSearch();
        }

        if (validSearch && validSearch.success) {
            let tempEndDate = validSearch.subDate !== null ? validSearch.subDate : endDate;
            let tempStartDate = validSearch.subDate !== null ? validSearch.subDate : startDate;
            let data = {
                COMBOSEARCH: advancedSearchActive ? '' : comboSearch,
                INCEPTIONFROM: tempStartDate !== null ? formatDate(tempStartDate) : '',
                INCEPTIONTO: tempEndDate !== null ? formatDate(tempEndDate) : '',
                ...advancedSearch
            };
            getAffidavits(endpoint, token, data);
        }
    };

    return {
        emptyAdvSearch,
        comboSearch,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        advancedSearch,
        handleSubmit,
        handleClearAdvSearch,
        handleClearAdvSearchInput,
        handleClearCombo,
        handleSearchInput,
        setEmptyAdvSearch
    };
};

export { useFormCtrl };
