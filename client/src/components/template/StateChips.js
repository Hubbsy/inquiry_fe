import Chip from '@mui/material/Chip';
import { theme } from '@aeros-ui/themes';

const StateChips = ({ state }) => {
    const statusColors = {
        p: {
            background: theme.palette.primary.main,
            textColor: 'white',
            variant: 'filled',
            label: 'Processed'
        },
        u: {
            background: theme.palette.error.main,
            textColor: 'white',
            variant: 'filled',
            label: 'Unprocessed'
        },
        s: {
            background: theme.palette.warning.light,
            textColor: theme.palette.warning.dark,
            variant: 'filled',
            label: 'Suspended'
        }
    };

    const chipTheme = state ? statusColors[state.toLowerCase()] : 'p';
    {
        console.log(state.toLowerCase(), chipTheme);
    }
    return (
        <Chip
            size={'small'}
            label={chipTheme.label ? chipTheme.label : ''}
            variant={chipTheme.variant}
            sx={{ background: chipTheme.background, color: chipTheme.textColor }}
        />
    );
};

export default StateChips;
