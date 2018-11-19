const boxShadow = {
    boxShadow:
        "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
};

const styles = theme => ({
    logo: {
        //color: "#FFF",

        margin: '9px 0%',
        marginRight: '3%'
    },
    toolbar: {
        margin: "0 7%"
    },
    root: {
        display: 'flex',
        flex: 3,
        alignItems: 'center',
        height: 64
    },
    image: {
        width: "auto",
        height: 25
    },
    userModule: {
        display: 'flex', flex: 1, justifyContent: 'flex-end', height: 64
    },
    hiddenToolbar: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    },
    userRoot: {
        height: "100%"
    },
    buttonRoot: {
        height: "100%"
    },
    userName: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        display: "flex",
        flexDirection: 'column',
        height: "100%",
        //minHeight: 'inherit',
        borderRadius: "0", padding: "5px 16px",
        [theme.breakpoints.down("xs")]: {
            padding: "12px 8px"
        }
    },
});

export default styles;
