import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const withScrollData = (Component) => {
    return function WithScrollDataComponent({ ...props }) {
        const [clientHeight, setClientHeight] = React.useState(document.body.clientHeight);
        const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
        const [scrollY, setScrollY] = React.useState(window.scrollY);
        const [scrollX, setScrollX] = React.useState(window.scrollX);
        const [scrollActive, setScrollActive] = React.useState(false);

        const theme = useTheme();
        const matchesSM = useMediaQuery(theme.breakpoints.down('md'));

        React.useEffect(() => {
            window.addEventListener('resize', handleDocScroll);
            return () => window.removeEventListener('resize', handleDocScroll);
        });

        // React.useEffect(() => {
        //     window.addEventListener('scroll', updateScroll);
        //     return () => window.removeEventListener('scroll', updateScroll);
        // });

        React.useEffect(() => {
            setClientHeight(document.body.clientHeight);
            updateScroll();
        }, [document.body.clientHeight]);

        React.useEffect(() => {
            handleDocScroll();
            updateScroll();
        }, [clientHeight]);

        const updateClientDimensions = () => {
            setClientHeight(document.body.clientHeight);
            setWindowHeight(window.innerHeight);
        };

        const updateScroll = () => {
            setScrollY(window.scrollY);
            setScrollX(window.scrollX);
        };

        const setDocScroll = (activeScroll) => {
            setScrollActive(activeScroll);
        };

        const handleDocScroll = () => {
            let activeScroll = false;
            if (clientHeight > windowHeight) {
                console.log('!!!!!SCROLL BAR ACTIVE!!!!!');
                activeScroll = true;
            }

            setDocScroll(activeScroll);
            updateClientDimensions();
        };

        const handleScrollTo = () => {
            if (scrollY === 0) {
                window.scrollTo({ top: clientHeight, left: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }

            setTimeout(() => {
                updateScroll();
            }, 500);
        };

        return (
            <Component
                {...props}
                windowHeight={windowHeight}
                clientHeight={clientHeight}
                scrollY={scrollY}
                scrollX={scrollX}
                scrollActive={scrollActive}
                handleScrollTo={handleScrollTo}
                handleDocScroll={handleDocScroll}
                updateClientDimensions={updateClientDimensions}
                updateScroll={updateScroll}
            />
        );
    };
};

export default withScrollData;
