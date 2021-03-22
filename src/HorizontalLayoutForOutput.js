import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HorizontalLayoutForOutput extends Component {
    constructor(props) {
        super(props);

        this.parsArrComponents = this.parsArrComponents.bind(this);
    }

    parsArrComponents() {
        var arrComponents = new Array;
        arrComponents = this.props.components.map(elem => {
            if (elem.type == "label") {
                return (
                    <label className="labels" key={elem.name} name={elem.name} type={elem.type}>{elem.text}</label>
                )
            }
            else if (elem.type == "edit") {
                return (
                    <textarea className="textFields" key={elem.name} name={elem.name} type="text" value={this.props.value} readOnly></textarea >
                )
            }
            else return null;
        });
        return arrComponents;
    }

    render() {
        this.parsArrComponents();
        return (
            <div className="wrapperTextFields">
                {this.parsArrComponents()}
            </div>
        )
    }
}

HorizontalLayoutForOutput.propTypes={
    components: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default HorizontalLayoutForOutput
