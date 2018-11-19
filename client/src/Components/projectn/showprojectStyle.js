const styles = theme => ({

    border: {
        width: '75%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: "18px",
        margin: "2% 3%",
        borderBottom: 'ridge'
    },
    headerRoot: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    },
    addbutton: {
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', margin: '0 13%'
    },
    cards:{
        width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: "center" 
    }

});

export default styles;