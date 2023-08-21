import { isDateValid } from '../../functions/dates';

const useSearchValidation = (
    comboSearch,
    startDate,
    endDate,
    applicationErrors,
    handleErrorMessages,
    advancedSearch,
    setEndDate,
    setStartDate
) => {
    let subDate = null;

    const checkMultipleInputsActive = (params) => {
        let count = 0;
        for (const input in params) {
            if (params[input]) {
                count++;
            }
        }

        return count > 1;
    };

    const validateInputs = () => {
        let multipleInputsActive = checkMultipleInputsActive(advancedSearch);
        let blankInputs = 0;
        let errorInputs = [];
        for (let control in advancedSearch) {
            if (
                advancedSearch[control].length > 0 &&
                advancedSearch[control].length < 3 &&
                control !== 'PREMIUMFROM' &&
                control !== 'PREMIUMTO' &&
                !multipleInputsActive
            ) {
                errorInputs.push(control);
            }

            if (advancedSearch[control].length === 0 || advancedSearch[control] === '0') {
                blankInputs++;
            }
        }

        return {
            blankInputs,
            errorInputs
        };
    };

    const validatePremiumRange = () => {
        let fromAmount = advancedSearch.PREMIUMFROM
            ? parseFloat(advancedSearch.PREMIUMFROM.replace(/,/g, ''))
            : 0;
        let toAmount = advancedSearch.PREMIUMTO
            ? parseFloat(advancedSearch.PREMIUMTO.replace(/,/g, ''))
            : 0;
        let errorType = null;
        let el = null;

        if (fromAmount !== 0 && toAmount !== 0 && fromAmount > toAmount) {
            errorType = 'PREMIUMS';
            el = { pos: 'start', type: 'range' };
        } else if (fromAmount === 0 && toAmount > 0) {
            errorType = 'PREMIUMS';
            el = { pos: 'start', type: 'valid' };
        } else if (toAmount === 0 && fromAmount > 0) {
            errorType = 'PREMIUMS';
            el = { pos: 'end', type: 'valid' };
        }

        return {
            errorType,
            el
        };
    };

    const validateDateRange = () => {
        let errorType = null;
        let el = null;

        if (startDate && !isDateValid(startDate)) {
            errorType = 'DATES';
            el = { type: 'valid', pos: 'start' };
        } else if (startDate && isDateValid(startDate) && !endDate) {
            setEndDate(startDate);
            subDate = startDate;
        }

        if (endDate && !isDateValid(endDate)) {
            errorType = 'DATES';
            el = { type: 'valid', pos: 'end' };
        } else if (endDate && isDateValid(endDate) && !startDate) {
            setStartDate(endDate);
            subDate = endDate;
        }

        return {
            errorType,
            el,
            activeErrorInputs: []
        };
    };

    const validateAdvancedSearch = () => {
        let searchValid = {
            errorType: null,
            el: null,
            activeErrorInputs: []
        };

        if (applicationErrors.active) {
            searchValid.errorType = applicationErrors.type;
            searchValid.el = applicationErrors.el;
        } else {
            //  Validate Date range
            if (startDate !== null || endDate !== null) {
                searchValid = validateDateRange();
            }
            //  Validate Premium range
            if (
                (advancedSearch.PREMIUMFROM && !searchValid.errorType) ||
                (advancedSearch.PREMIUMTO && !searchValid.errorType)
            ) {
                searchValid = validatePremiumRange();
            }
            //  Validate Advanced inputs
            if (!searchValid.errorType) {
                let activeErrorInputs = validateInputs();

                if (activeErrorInputs.errorInputs.length > 0) {
                    searchValid.errorType = 'ADVANCED';
                    searchValid.el = { pos: null, type: 'single' };
                    searchValid.activeErrorInputs = activeErrorInputs.errorInputs;
                } else if (activeErrorInputs.blankInputs === 8 && !startDate && !endDate) {
                    searchValid.errorType = 'GENERAL';
                }
            }
        }

        if (searchValid.errorType) {
            handleErrorMessages(
                searchValid.errorType,
                searchValid.el,
                searchValid.activeErrorInputs
            );
        }

        return { success: searchValid.errorType === null, subDate };
    };

    const validateStandardSearch = () => {
        let searchValid = {
            errorType: null,
            el: null
        };

        if (applicationErrors.active) {
            searchValid.errorType = applicationErrors.type;
            searchValid.el = applicationErrors.el;
        } else {
            let multipleInputsActive = checkMultipleInputsActive({
                comboSearch,
                insuredName: advancedSearch.INSUREDNAME
            });

            //  Check all inputs blank
            if (
                comboSearch.length === 0 &&
                advancedSearch.INSUREDNAME.length === 0 &&
                searchValid.errorType === null
            ) {
                searchValid.errorType = 'GENERAL';
            }
            //  Validate date range
            // if (startDate !== null || endDate !== null) {
            //     searchValid = validateDateRange();
            // }

            // Validate main search input
            if (
                comboSearch.length < 3 &&
                comboSearch.length > 0 &&
                !multipleInputsActive &&
                searchValid.errorType === null
            ) {
                searchValid.errorType = 'COMBOSEARCH';
            }

            //  Validate insured name input
            if (
                advancedSearch.INSUREDNAME.length < 3 &&
                advancedSearch.INSUREDNAME.length > 0 &&
                !multipleInputsActive &&
                searchValid.errorType === null
            ) {
                let activeErrorInputs = validateInputs();

                if (activeErrorInputs.errorInputs.length > 0) {
                    searchValid.errorType = 'ADVANCED';
                    searchValid.el = { pos: null, type: 'single' };
                    searchValid.activeErrorInputs = activeErrorInputs.errorInputs;
                }
            }
        }

        if (searchValid.errorType) {
            handleErrorMessages(
                searchValid.errorType,
                searchValid.el,
                searchValid.activeErrorInputs
            );
        }

        return { success: searchValid.errorType === null, subDate };
    };

    return {
        validateStandardSearch,
        validateAdvancedSearch
    };
};

export { useSearchValidation };
