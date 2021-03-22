import React, { Component } from 'react'
import './App.css';
import requestJson from './RequestJson';
import HorizontalLayoutForInput from './HorizontalLayoutForInput';
import HorizontalLayoutForOutput from './HorizontalLayoutForOutput';

try {
  var json = requestJson();
  var newArr = (JSON.parse(json)).components;
} catch (err) {
  newArr = [{
    name: "error",
    type: "span",
    text: "ошибка получения Json"
  }]
}

export default class FormTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      output: ""
    }

    this.changeStateInput = this.changeStateInput.bind(this);
    this.translate = this.translate.bind(this);
    this.parsMyTemplate = this.parsMyTemplate.bind(this);
    this.gettingTranslation = this.gettingTranslation.bind(this);
  }

  translate(myStr) {
    const data = JSON.stringify([
      { "Text": myStr }
    ]);

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", () => this.gettingTranslation(xhr));

    xhr.open("POST", "https://microsoft-translator-text.p.rapidapi.com/translate?to=en&api-version=3.0&from=ru&profanityAction=NoAction&textType=plain");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-rapidapi-key", "ff47a2da40msh4579c0691227c26p1ce540jsn148858d17049");
    xhr.setRequestHeader("x-rapidapi-host", "microsoft-translator-text.p.rapidapi.com");

    xhr.send(data);
  }

  changeStateInput(str) {
    this.setState({
      input: str
    });

  }

  gettingTranslation(xhr) {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status == 200) {
        var tmp = JSON.parse(xhr.responseText);
        console.log(tmp[0].translations[0].text);
        this.setState({
          output: tmp[0].translations[0].text
        })
      }
      else {
        this.setState({
          output: "ошибка перевода, проверьте соединение с сетью!!!"
        })
      }
    }

  }

  parsMyTemplate(arrTemplates) {
    var arrComponents = new Array;
    arrComponents = arrTemplates.map((elem, index = 0) => {
      if (elem.type == "horizontalLayout" && elem.name == "КомпоновщикТекстаДляПеревода") {
        index++;
        return (
          <HorizontalLayoutForInput key={elem.name} name={elem.name} type={elem.type}
            components={elem.components} onChange={this.changeStateInput}></HorizontalLayoutForInput>
        )
      }
      else if (elem.type == "horizontalLayout" && elem.name == "КомпоновщикРезультатаПеревода") {
        index++;
        return (
          <HorizontalLayoutForOutput key={elem.name} name={elem.name} type={elem.type}
            components={elem.components} readonly="readonly" value={this.state.output} ></HorizontalLayoutForOutput>
        )
      }
      else if (elem.type == "button") {
        index++;
        return (
          <button className="buttonTranslator" key={elem.name} name={elem.name} type={elem.type} onClick={() => this.translate(this.state.input)} >{elem.text}</button>
        )
      }
      else return <span key={elem.name} name={elem.name} type={elem.type}>{elem.text}</span>;
    });
    return arrComponents;
  }

  render() {
    var arrayComp = this.parsMyTemplate(newArr);
    //console.log("kek", arrayComp)   
    return (
      <div>
        {arrayComp}
      </div>
    )
  }
}
