import React, { Component } from 'react'
import { View, Text, Keyboard } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { connect } from 'react-redux'

import EventEmitter from '../../utils/events'
import styles from './styles'
import WalkDetail from './WalkDetail'
import BusDetail from './BusDetail'
import { resetRoute } from '../../actions/route'

export const LISTENER = 'DETAILED_ROUTE'

class ActionSheet extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.modalRef = React.createRef()
	}

	componentDidMount() {
		EventEmitter.addEventListener(LISTENER, this.handleDisplay)
	}
	componentWillUnmount() {
		EventEmitter.removeListener(LISTENER)
	}

	handleDisplay = () => {
		Keyboard.dismiss()
		if (this.modalRef.current) {
			this.modalRef.current.open()
		}
	}

	handleClose = () => {}

	hideActionSheet = () => {
		this.modalRef.current.close()
	}

	renderInner = () => {
		const { route } = this.props
		return route.map(item => {
			switch (item.mode) {
				case 'WALK':
					return <WalkDetail item={item} />
					break
				case 'BUS':
					return <BusDetail item={item} />
					break
			}
			return <Text>{item.mode}</Text>
		})
	}

	render() {
		return (
			<Modalize ref={this.modalRef} modalHeight={400}>
				{this.renderInner()}
			</Modalize>
		)
	}
}

const mapStateToProps = state => ({
	route: state.route,
})

const mapDispatchToProps = dispatch => ({
	resetRoute: () => dispatch(resetRoute()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionSheet)
