import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
	routeContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	spinner: {
		justifyContent: 'flex-end', //Centered vertically
		alignItems: 'center', // Centered horizontally
		flex: 1,
		margin: 10,
	},
	busDetailHeader: {
		flex: 1,
		flexDirection: 'row',
		padding: 10
	},
	busDetailHeaderText: {
		fontSize: 16,
		flex: 1,
		textAlign: 'center',
	},
	walkDetailHeader: {
		flex: 1,
		flexDirection: 'row',
		padding: 10
	}
})
