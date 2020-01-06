import { StyleSheet } from 'react-native';

import {LIGHT_BULE_COLOR} from '../../constants/color'
export default styles = StyleSheet.create({
    item: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	itemCurrent: {
		backgroundColor: LIGHT_BULE_COLOR
	},
	itemLeft: {
		marginHorizontal: 10,
		width: 25,
		alignItems: 'center'
	},
	itemCenter: {
		flex: 1
	},
	itemText: {
		marginVertical: 16,
		fontSize: 14,
    },
    headerContainer: {
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center'
    }
})