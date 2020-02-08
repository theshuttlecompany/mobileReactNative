import { StyleSheet } from 'react-native'
import {MID_BULE_COLOR, BULE_COLOR} from '../../constants/color'

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
		color: MID_BULE_COLOR,
		fontFamily: 'odin_rounded',
		fontWeight: '600',
		fontSize: 40
	},
	icon: {
		justifyContent: 'center',
		alignContent: 'center',
	},
	container: {
		padding: 20,
		flex: 1,
		alignItems: 'center' 
	},
	description: {
		fontFamily: 'quicksand',
		fontWeight: '900',
		fontSize: 16,
		paddingVertical: 50,

	},
	info: {
		fontFamily: 'quicksand',
	},
	website: {
		fontFamily: 'quicksand',
		color: BULE_COLOR
	}
})

export default styles;