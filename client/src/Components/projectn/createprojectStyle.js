const styles = theme => ({


    card: {
        minWidth: 400
    },

    actions: {
        display: "flex",
        margin: '0 5%'
    },
    rootDesktop: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    stepDrop: {
        marginRight: '10px', marginTop: 6
    },
    label: {
        display: 'flex', flex: 4
    },
    buttonStyle: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2% 0'
    },
    labelInput: {
        display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'flex-start', margin: '0 1%'
    },
    rootMobile: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
            //           margin: '2% 2%'
        }
    },
    gap: {
        display: 'flex',
        margin: '5px 0',
        justifyContent: 'center',
        flexDirection: 'column'
        //alignItems: 'center'
    },
    task: {
        flex: 4, display: 'flex', flexDirection: 'column', margin: '0 1%',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    gap1: {
        display: 'flex',
        //margin: '5% 0',
        //justifyContent: 'center',
        margin: '20px 0',
        [theme.breakpoints.down("sm")]: {
            alignItems: 'center'
        }
        //maxWidth: 170
    },
    border: {
        width: '75%',
        display: 'flex',
        //justifyContent: 'center',
        alignItems: 'center',
        fontSize: "18px",
        margin: "2% 10%",
        borderBottom: 'ridge'
    },
    input: {
        display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'flex-end', margin: '0 1%',
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center'
        }
    },
    vertical: {
        borderLeft: 'ridge',
        height: 500,
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    button: {

        minWidth: 0,
        minHeight: 0,
        padding: '0 3px',
        margin: '0 10px'

    },

    fontStyle: {
        fontSize: "20px"
    }

});

export default styles;