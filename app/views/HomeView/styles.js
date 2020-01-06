import { StyleSheet } from 'react-native';
import { HEIGHT, WIDTH} from '../../utils/deviceInfo';
import {LIGHT_BULE_COLOR, DARK_BULE_COLOR} from '../../constants/color'
export default StyleSheet.create({
    drawerButton: {
        position: 'absolute',
		top: 10,
		left: 10
	},
	myLocationButton: {
		position: 'absolute',
		top: 10,
		right: 10
	},
	pickMenu: {
		padding: 16,
		backgroundColor: '#ffffff',
		position: 'absolute',
		top: HEIGHT - 185,
		width: WIDTH -20,
		height: 140,
		margin: 10,
		borderRadius: 20,
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 0.5,
		elevation: 4
	},
	pickItemContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	},
	pickSubtitle: {
		color: '#afafaf',
		fontSize: 11,
	},
	pickTitle: {
		fontWeight: "900",
		fontSize: 14,
	},
	map: {
		flex: 1
	},
	icon: {
		padding: 8,
		paddingHorizontal: 12,
		backgroundColor: LIGHT_BULE_COLOR,
		borderRadius: 10
	},
	selectionPin: {
		position: 'absolute',
		height: 30,
		width: 14,
		bottom: HEIGHT / 2 - 15,
		right: WIDTH / 2 - 7
	},
	findRouteButton: {
		position: 'absolute',
		bottom: 170,
		width: 90,
		height: 40,
		right: 10,
		padding: 10,
		borderRadius: 10,
		backgroundColor: DARK_BULE_COLOR,
		color: '#fff'
	}


})