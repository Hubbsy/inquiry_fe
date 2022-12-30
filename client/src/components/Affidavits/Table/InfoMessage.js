import {
    ThemeProvider,
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemText,
    createTheme
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const messageTheme = createTheme({
    palette: {
        primary: {
            main: '#0097FB',
            light: '#B8E3FF',
            dark: '#004B6E'
        }
    },
    typography: {
        h6: {
            fontSize: '15px'
        }
    },
    components: {
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    padding: '0.5em',
                    borderTopColor: 'transparent'
                },
                avatar: {
                    marginRight: '0.5em'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '0.25em',
                    backgroundColor: 'rgba(0, 226, 208, 0.08)',
                    '&:last-child': {
                        paddingBottom: '0.25em'
                    }
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    paddingBottom: '0.25em'
                }
            }
        },
        MuiList: {
            styleOverrides: {
                root: {
                    paddingTop: 0,
                    paddingBottom: 0
                }
            }
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    paddingTop: 0,
                    paddingBottom: 0
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                elevation: 4
            }
        }
    }
});

const InfoMessage = (props) => {
    return (
        <ThemeProvider theme={messageTheme}>
            <Card sx={{ borderRadius: '0px' }}>
                <CardHeader
                    title={props.title}
                    avatar={<InfoIcon color='info' fontSize='small' />}
                    titleTypographyProps={{ variant: 'h6', color: 'primary.dark' }}
                />
                <CardContent>
                    <List sx={{ width: '100%' }}>
                        {Array.isArray(props.data) ? (
                            props.data.map((d, i) => {
                                return (
                                    <ListItem key={`info-${i}`}>
                                        <ListItemText
                                            primary={d}
                                            primaryTypographyProps={{ color: 'primary.dark' }}
                                        />
                                    </ListItem>
                                );
                            })
                        ) : (
                            <ListItem>
                                <ListItemText
                                    primary={props.data}
                                    primaryTypographyProps={{ color: 'primary.dark' }}
                                />
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default InfoMessage;
