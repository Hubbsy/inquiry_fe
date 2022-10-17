const getAnchorPosition = (event) => {
    const elementDetailedPosition = event.currentTarget.getBoundingClientRect();
    const anchorPosition = {
        left: elementDetailedPosition.left + elementDetailedPosition.width / 2,
        top: elementDetailedPosition.top + elementDetailedPosition.height
    };
    return anchorPosition;
};

export default getAnchorPosition;
