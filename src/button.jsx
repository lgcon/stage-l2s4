import React from "react";
import ReactDOM from "react-dom";



var Button = React.createClass({
  contextTypes: {
    color: React.PropTypes.string,
    toto: React.PropTypes.func
  },
  render: function() {
	this.context.toto("hello");
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
});

var Message = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
});


var asd = (message) => console.log(message);

var MessageList = React.createClass({
  childContextTypes: {
    color: React.PropTypes.string,
    toto: React.PropTypes.func
  },
  getChildContext: function() {
    return {color: "purple",
	    toto: asd
	};
  },
  render: function() {
    var children = (<Message text="ciaociao" />);
    return <div>{children}</div>;
  }
});


ReactDOM.render(<MessageList />, document.getElementById('app'));

