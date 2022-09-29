const useProcNum = () => {
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return { numberWithCommas };
};

export default useProcNum;
