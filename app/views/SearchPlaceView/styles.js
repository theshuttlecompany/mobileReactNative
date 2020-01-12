import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
	textInputContainer: {
		flexDirection: 'row',
		margin: 10,
		padding: 5,
		borderRadius: 5,
		borderColor: 'black',
		alignItems: 'center',
		shadowColor: 'rgba(0,0,0, .4)', // IOS
		shadowOffset: { height: 1, width: 1 }, // IOS
		shadowOpacity: 1, // IOS
		shadowRadius: 1, //IOS
		backgroundColor: '#fff',
		elevation: 2,
	},
	searchIconContainer: {
		marginHorizontal: 15,
	},
	itemContainer: {
		flexDirection: 'row',
		padding: 5,
	},
	itemTextContainer: {
		flex: 1,
		paddingVertical: 5,
	},
	itemText: {
		fontSize: 16,
	},
	subHeading: {
		fontSize: 14,
		color: '#aaa',
	},
	locationIconContainer: {
		marginHorizontal: 15,
		marginVertical: 10,
	},
})
