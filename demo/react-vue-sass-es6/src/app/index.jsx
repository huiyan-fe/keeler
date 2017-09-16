import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
    constructor(args) {
        super(args);
    }


    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                welcome to react.js App
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('content'));