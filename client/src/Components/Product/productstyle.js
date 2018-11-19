const styles = theme => ({
    root: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        flexFlow: "column",
        flexWrap: "wrap",
        alignItems: "flex-start",
        padding: 24,
        overFlow: "auto"
    },
    print: {
        display: 'flex', margin: '1% 5%', flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end',
        [theme.breakpoints.down("sm")]: {
            display: 'none'
        }
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
    margin: {
        margin: theme.spacing.unit
    },
    productHeading: {
        fontFamily: "Helvetica Neue",
        fontSize: "20px"
    },
    gridStyle: {
        justifyContent: "center",
        alignContent: "center"
    },
    bootstrapRoot: {
        padding: 20,
        fontFamily: "Helvetica Neue",
        "label + &": {
            marginTop: theme.spacing.unit * 3,
            padding: "100"
        }
    },
    button: {
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    },
    button1: {
        position: "fixed",
        bottom: theme.spacing.unit * 2,
        right: 20
    },
    bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:focus": {
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
    },
    bootstrapFormLabel: {
        fontSize: 18
    },
    // root: {
    //     width: "100%",
    //     marginTop: theme.spacing.unit * 3,
    //     overflowX: "auto"
    // },
    table: {
        minWidth: 700
    },
    icon: {
        margin: theme.spacing.unit * 2
    }
});

export default styles;
