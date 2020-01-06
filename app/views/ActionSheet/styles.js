import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    routeItemContainer: {
        flex: 1,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    seperator: {
        marginHorizontal: 5
    },
    timeText: {
        fontSize:   16,
        fontWeight: '700',
        color: '#111'
    },
    timerangeText: {
        paddingHorizontal: 10,
        fontSize: 13,
        color: '#555'
    },
    timeContainer: {
        alignItems: 'center',
        height: "100%",
        width: "20%",
        justifyContent: 'center'
    },
    recomText: {
        padding: 10,
        fontSize: 12,
        fontWeight: '700',
        color: '#555'
    },
    walkTimeText: {
        position: 'absolute',
        right: -5,
        bottom: 5,
        fontSize:12
    }
});