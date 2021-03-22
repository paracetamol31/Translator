import React, { Component } from 'react'
import PropTypes from 'prop-types'

 class HorizontalLayoutForInput extends Component {
    constructor(props) {
        super(props);

        this.onChange = props.onChange.bind(this);
        this.parsArrComponents = this.parsArrComponents.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.onChange(event.target.value)
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
                    <textarea className="textFields" key={elem.name} name={elem.name}
                        type="text" onChange={this.handleChange}></textarea >
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

HorizontalLayoutForInput.propTypes={
    components: PropTypes.arrayOf(PropTypes.object).isRequired 
}

export default HorizontalLayoutForInput
