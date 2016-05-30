/**
 * External dependencies
 */
var React = require( 'react' ),
	classNames = require( 'classnames' ),
	noop = require( 'lodash/noop' );

/**
 * Internal dependencies
 */
var Button = require( '../button' ),
	Gridicon = require( '../gridicon' ),
	i18n = require( 'mixins/translate'),
	ScreenReaderText = require( '../screen-reader-text' );

require( './style.scss' );

module.exports = React.createClass( {
	displayName: 'SimpleNotice',

	getDefaultProps: function() {
		return {
			status: 'is-info',
			showDismiss: true,
			className: '',
			onClick: noop
		};
	},

	propTypes: {
		// we should validate the allowed statuses
		status: React.PropTypes.string,
		showDismiss: React.PropTypes.bool,
		duration: React.PropTypes.number,
		isCompact: React.PropTypes.bool,
		text: React.PropTypes.oneOfType( [
			React.PropTypes.string,
			React.PropTypes.object
		] ),
		className: React.PropTypes.string
	},

	componentDidMount: function() {
		if ( this.props.duration > 0 ) {
			setTimeout( this.props.onClick, this.props.duration );
		}
	},

	renderChildren: function() {
		let content;

		if ( typeof this.props.children === 'string' ) {
			return <span className="dops-notice__text">{ this.props.children }</span>;
		}

		if ( this.props.text ) {
			content = [ this.props.children ];
			content.unshift( <span key="dops-notice_text" className="dops-notice__text">{ this.props.text }</span> );
		} else {
			content = <span key="dops-notice_text" className="dops-notice__text">{ this.props.children }</span>;
		}

		return content;
	},

	render: function() {
		var noticeClass, dismiss;

		// The class determines the nature of a notice
		// and its status.
		noticeClass = classNames( 'dops-notice', this.props.status );

		if ( this.props.isCompact ) {
			noticeClass = classNames( noticeClass, 'is-compact' );
		}

		// By default, a dismiss button is rendered to
		// allow the user to hide the notice
		if ( this.props.showDismiss ) {
			noticeClass = classNames( noticeClass, 'is-dismissable' );
			dismiss = (
				<Button className="dops-notice__dismiss" onClick={ this.props.onClick } >
					<Gridicon icon="cross" size={ 24 } />
					<ScreenReaderText>{ i18n.translate( 'Dismiss' ) }</ScreenReaderText>
				</Button>
				);
		}

		return (
			<div className={ classNames( this.props.className, noticeClass ) }>
				{ this.renderChildren() }
				{ dismiss }
			</div>
		);
	}

} );
