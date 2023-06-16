import { StyleSheet } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 50,
    },

    section: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottom: "1px solid gray"
    },
    mainHeader: {
        display: "flex",
        flexDirection: "row",
        // backgroundColor: "red",

    },
    qrCode: {
        width: 60,
        height: 60,
        marginLeft: "160px",
        alignItems: 'center',

    },
    heading: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
    },
    text: {
        fontSize: 10,
    },
    table: {
        marginTop: 10,
        display: 'table',
        width: '100%',
        borderColor: '#ffffff',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 3,
     
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
        width: '100%',

    },
    tableCell: {
        margin: 'auto',
        marginVertical: 10,
        marginHorizontal: 6,
        borderColor: '#ddd',
        fontSize: 11,
        textAlign: 'center',
        width: '25%',

    },
    totalBill: {
        fontSize: 14,
        marginLeft: 105,
        marginTop:3,
        fontWeight:700
    },
    bold: {
        fontWeight: '900',
        color: "blue"
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: "20px",
        marginTop: "10px"
    },

});

export default pdfStyles