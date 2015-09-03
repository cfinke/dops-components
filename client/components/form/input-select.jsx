/** External Dependencies **/
var React = require( 'react' ),
	classNames = require( 'classnames' ),
	Formsy = require( 'formsy-react' );

/** Internal Dependencies **/
var Label = require( './label' ),
	getUniqueId = require( './counter' ),
	FormInputValidation = require( '../form-input-validation' ),
	requiredFieldErrorFormatter = require( './required-error-label' );

module.exports = React.createClass( {
	displayName: 'SelectInput',

	mixins: [Formsy.Mixin],

	propTypes: {
		name: React.PropTypes.string.isRequired,
		className: React.PropTypes.any,
		style: React.PropTypes.any,
		label: React.PropTypes.any,
		floatingLabel: React.PropTypes.bool,
		inline: React.PropTypes.any,
		labelSuffix: React.PropTypes.any,
		required: React.PropTypes.any,
		validations: React.PropTypes.string,
		validationError: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			uniqueId: getUniqueId()
		};
	},

	changeValue: function( event ) {
		this.setValue( event.target.value );
	},

	render: function() {
		var errorMessage, labelClass;

		if ( !this.isPristine() ) {
			errorMessage = this.showError() ? this.getErrorMessage() : null;
			if ( !errorMessage ) {
				errorMessage = this.showRequired() ? requiredFieldErrorFormatter( this.props.label || this.props.placeholder || '' ) : null;
			}
		}

		if ( this.props.floatingLabel ) {
			// we fake out the post-floating state because the animation makes
			// no sense for a select input
			labelClass = 'floating floating--floated floating--floated-active';
		}

		let className = classNames( {
			'dops-form-select': true,
			'dops-field': true,
			'dops-form-error': errorMessage,
			'dops-form-inline': this.props.inline,
			'dops-floating-label-input': this.props.floatingLabel,
		}, this.props.className );

		return (
			<Label className={className} inline={this.props.inline} labelClassName={labelClass} label={this.props.label} labelSuffix={this.props.labelSuffix} htmlFor={this.state.uniqueId} required={this.props.required} style={this.props.style}>
				<div className="dops-form-select">
					<select ref="select" id={this.state.uniqueId} value={this.getValue()} onChange={this.changeValue}>
						{this.props.children}
					</select>
				</div>
				{errorMessage && ( <FormInputValidation text={errorMessage} isError={ true }/> )}
			</Label>
		);
	}
} );
