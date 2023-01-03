import { isValid } from 'date-fns';

export const formatDate = (date) => {
    return date.toLocaleDateString('en-GB').split('/').reverse().join('-');
};

export const isDateValid = (date) => {
    if (isValid(date)) {
        const formattedDate = formatDate(date);
        if (formattedDate.length === 10) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
