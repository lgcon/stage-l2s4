import React from 'react';
import ReactDOM from 'react-dom';
import {translate} from './lang.jsx';
import * as F from './forms_utils.jsx';


export var Add_host = React.createClass({

 	contextTypes : {lang: React.PropTypes.string},

	render: function(){
		return (
			<F.Form id="Add_host">
				<F.Row>
					<F.InputAdrop label="Name" ddname="machines" />
					<F.Input label="TTL" dims="2+1"/>
				</F.Row>
				<F.Row>
					<F.Ainput label="Ip address" name="cidr" />
					<F.Dropdown label="View">
						<el>external</el>
						<el>internal</el>
					</F.Dropdown>
				</F.Row>
				<F.Row>
					<F.Input label="Mac address"/>
					<F.Space dims="2" />
					<F.Checkbox label="use SMTP" />
				</F.Row>
				<F.Row>
					<F.Adropdown label="Machine" name="machines" />
				</F.Row>
				<F.Row>
					<F.Input label="Comment"/>
				</F.Row>
				<F.Row>
					<F.Input label="Resp. name"/>
					<F.Input label="Resp. mail"/>
				</F.Row>
				<F.Row>
					<F.Space dims="5" />
					<F.Button dims="1" type="submit" >
						Add
					</F.Button>
				</F.Row>
					
			</F.Form>
		);
	}
});


ReactDOM.render(<Add_host />, document.getElementById('app'));



