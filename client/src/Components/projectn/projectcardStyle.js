const styles = theme => ({
    card: {
        minWidth: 400
    },

    actions: {
        display: "flex",
        margin: '0 5%'
    },
    labelRoot: {
        display: 'flex', flex: 1, flexDirection: 'column', margin: '0 1%'
    },
    gap: {
        margin: '3% 0'
    },
    gap1: {
        margin: '2% 0',
        minWidth: 200
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        }),
        marginLeft: "auto",
        [theme.breakpoints.up("sm")]: {
            marginRight: -8
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