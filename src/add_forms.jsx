import React from 'react';
import ReactDOM from 'react-dom';

export var Add_host = React.createClass({
	
	render: function(){
		return (
			<table>
			<tbody>
				<tr>
					<td align="LEFT">{translate('Name')}</td>
					<td align="LEFT">
						<input name="name" size="30" type="TEXT">
						</input>
						.
						<select size="1" name="domain">
							<option value="example.com">example.com</option>
							<option value="example.org">example.org</option>
						</select>
					</td>
					<td align="RIGHT">TTL</td>
					<td align="LEFT"><input name="ttl" size="6" maxlength="10" type="text"></input> (in seconds)</td>
				</tr>
				<tr>
					<td align="LEFT">IP address</td>
					<td align="LEFT">
						<input name="addr" size="45" value="" type="TEXT">
						</input>
					</td>
					<td align="RIGHT">View</td>
					<td align="LEFT">
						<select size="1" name="idview">
							<option value="3">external</option>
							<option value="2">internal</option>
						</select>
					</td>
				</tr>
				<tr>
					<td align="LEFT">MAC address</td>
					<td align="LEFT">
						<input name="mac" size="20" maxlength="17" type="TEXT">
						</input>
					</td>
					<td align="RIGHT"></td>
					<td align="LEFT"><input name="iddhcpprof" value="0" type="HIDDEN"></input></td>
				</tr>
				<tr>
					<td align="LEFT">Host type</td>
					<td align="LEFT">
						<select size="1" name="hinfo">
							<option value="PC/Windows" >PC/Windows</option>
							<option value="PC/Unix">PC/Unix</option>
							<option value="Macintosh/MacOS">Macintosh/MacOS</option>
							<option value="Other/Unix">Other/Unix</option>
							<option value="Printer">Printer</option>
							<option value="Network equipment">Network equipment</option>
						</select>
					</td>
					<td align="RIGHT">Use SMTP</td>
					<td align="LEFT"><input name="sendsmtp" value="1" type="CHECKBOX"></input></td>
				</tr>
				<tr>
					<td align="LEFT">Comment</td>
					<td colspan="3" align="LEFT">
						<input name="comment" size="50" type="TEXT">
						</input>
					</td>
				</tr>
				<tr>
					<td align="LEFT">Responsible (name)</td>
					<td colspan="3" align="LEFT">
						<input name="respname" size="50" type="TEXT">
						</input>
					</td>
				</tr>
				<tr>
					<td align="LEFT">Responsible (mail)</td>
					<td colspan="3" align="LEFT">
						<input name="respmail" size="50" type="TEXT">
						</input>
					</td>
				</tr>
				<tr>
					<td colspan="4" align="CENTER">
						<input value="Add" type="SUBMIT">
						</input>
					</td>
				</tr>
			</tbody>		
			</table>
		);
	}
});




