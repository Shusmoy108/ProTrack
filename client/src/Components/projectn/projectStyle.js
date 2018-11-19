const styles = theme => ({


    itemClass: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    topBorder: {
        width: '75%',
        display: 'flex',
        //justifyContent: 'center',
        alignItems: 'center',
        fontSize: "18px",
        margin: "2% 10%",
        borderBottom: 'ridge'
    },
    button: {
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    },
    print: {
        display: 'flex', margin: '1% 5%', flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'
    },
    stepStyle: {
        margin: "0 5%", display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
    },
    label: {
        margin: '2% 0%'
    },
    input: {
        margin: '2% 5%'
    },
    dektopColumn: {
        display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'flex-end'
    },
    dektopInput: {
        display: 'flex', flexDirection: 'column', flex: 1
    },
    mainStyle: {
        margin: "0% 30%",
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing.unit * 2
        }
    }, border: {
        display: 'flex', width: '50%', margin: '1% 20%', borderBottom: 'ridge', justifyContent: 'center', alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        }
    },
    borderMobile: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'flex', flexDirection: 'column', borderBottom: 'ridge', justifyContent: 'center', alignItems: 'center',
            margin: theme.spacing.unit * 1
        }
    }

});

export default styles;