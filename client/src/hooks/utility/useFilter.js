import { useState } from 'react';

// moved filter in to its own custom hook to make it reusable through out the app
const useFilter = () => {
    const [showFilters, setFiltering] = useState(false);

    const handleFilter = () => {
        setFiltering(!showFilters);
    };
    return { showFilters, handleFilter };
};

export { useFilter };
