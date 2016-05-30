import React from 'react';
import ReactDOM from 'react-dom';
import {translate} from './lang.jsx';
import {F_input, F_ainput, F_checkbox,
	 F_fgroup, F_form, F_button,
	F_dropdown, F_inputdr} from './forms_utils.jsx';


export var Add_host = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){
		return (
			<F_form id="Add_host">
				<F_fgroup>
					<F_inputdr label="Name" >
						<el>example.org</el>
						<el>example.com</el>
					</F_inputdr>
				</F_fgroup>
				<F_fgroup>
					<F_ainput label="Ip address" name="cidr" />
					<F_input label="TTL"/>
				</F_fgroup>
				<F_fgroup>
					<F_input label="Mac address"/>
					<F_dropdown label="View">
						<el>external</el>
						<el>internal</el>
					</F_dropdown>
				</F_fgroup>
				<F_fgroup>
					<F_dropdown label="Host">
						<el>PC/Windows</el>
						<el>PC/Unix</el>
					</F_dropdown>
					<F_checkbox label="use SMTP" />
				</F_fgroup>
				<F_fgroup>
					<F_input label="Comment"/>
				</F_fgroup>
				<F_fgroup>
					<F_input label="Resp. name"/>
					<F_input label="Resp. mail"/>
				</F_fgroup>
				<F_fgroup>
					<F_button type="submit" >
						Add
					</F_button>
				</F_fgroup>
					
			</F_form>
		);
	}
});


ReactDOM.render(<Add_host />, document.getElementById('app'));



