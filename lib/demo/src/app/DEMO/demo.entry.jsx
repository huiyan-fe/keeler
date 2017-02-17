import React from 'react';
import ReactDOM from 'react-dom';

class Demo extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                hello world
            </div>
        );
    }
}

ReactDOM.render(<Demo />, document.getElementById('content'));