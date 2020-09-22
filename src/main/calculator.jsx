import React, { Component } from 'react';

import Display from '../components/display';
import Botao from '../components/button';
import './calculator.css';

const InitialState = {
    displayValue: '',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

class Calculator extends Component{
    state = {...InitialState};

    constructor(props){
        super(props)
        this.ClearMemory = this.ClearMemory.bind(this);
        this.SetOPeration = this.SetOPeration.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    ClearMemory = () =>{
        this.setState({ ...InitialState});
    }

    SetOPeration = operation =>{
       if(this.state.current === 0){
            this.setState({
                operation, current:1, clearDisplay:true
            })
       }else{
           const equals = operation === '=';
           const currentOperation = this.state.operation;

           const values = [...this.state.values];
           try{
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
           } catch(e){
               values[0] = this.state.values[0];
           }
           
           values[1] = 0;

           this.setState({
               displayValue: values[0],
               operation: equals ? null : operation,
               current:  equals ? 0 : 1,
               clearDisplay: !equals,
                values
           })
       }
    }

    addDigit = n =>{
        if(n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const CurrentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = CurrentValue + n
        this.setState({displayValue, clearDisplay: false})

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({values});
            console.log(values)
        } 
    }
    render(){
        return(
            <div className="Calculadora">
                <Display value={this.state.displayValue}/>
                <Botao label="AC" click={this.ClearMemory} triple/>
                <Botao label="/" click={this.SetOPeration} operation/>
                <Botao label="7" click={this.addDigit} />
                <Botao label="8" click={this.addDigit}/>
                <Botao label="9" click={this.addDigit}/>
                <Botao label="*" click={this.SetOPeration} operation/>
                <Botao label="4" click={this.addDigit}/>
                <Botao label="5" click={this.addDigit}/>
                <Botao label="6" click={this.addDigit}/>
                <Botao label="-" click={this.SetOPeration} operation/>
                <Botao label="1" click={this.addDigit}/>
                <Botao label="2" click={this.addDigit}/>
                <Botao label="3" click={this.addDigit}/>
                <Botao label="+" click={this.SetOPeration} operation/>
                <Botao label="0" double click={this.addDigit} double/>
                <Botao label="." click={this.addDigit}/>
                <Botao label="=" click={this.SetOPeration} operation/>
            </div>
        );
    }
}
export default Calculator;