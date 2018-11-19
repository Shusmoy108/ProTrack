const styles = theme => ({


    card: {
        minWidth: 400
    },
    buttonStyle: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2% 0'
    },
    actions: {
        display: "flex",
        margin: '0 5%'
    },
    cardRoot: {
        flex: 4, display: 'flex', flexDirection: 'column', margin: '0 1%'
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
    rootDesktop: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
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
    label: {
        marginRight: '10px', marginTop: 6
    },
    gap: {
        display: 'flex',
        margin: '1% 0',
        justifyContent: 'center',
        //alignItems: 'center'
    },
    gap1: {
        display: 'flex',
        margin: '1% 0',
        //justifyContent: 'center',
        // margin: '2% 0',
        //maxWidth: 170
    },
    labelRoot: {
        display: 'flex', flex: 4, flexDirection: 'column', alignItems: 'center', margin: '0 1%'
    },

    vertical: {
        borderLeft: 'ridge',
        height: 500,
        flex: 1
    },
    button: {

        minWidth: 0,
        minHeight: 0,
        padding: '0 3px',
        margin: '0 10px'

    },
    deleteLabel: {
        flex: 4, display: 'flex', flexDirection: 'column', margin: '0 1%'
    },
    fontStyle: {
        fontSize: "20px"
    }

});

export default styles;