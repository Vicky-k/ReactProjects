import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { connect } from 'react-redux';


 
 
const getSuggestionValue = suggestion => suggestion.login;


 
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div style={{backgroundColor:'#0000FF'}} id={suggestion.login}>
    {suggestion.login}
  </div>
);

class App extends React.Component {
constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.onSuggestionHighlighted = this.onSuggestionHighlighted.bind(this);
  }
 
  onChange(event, { newValue }){
      
    this.setState({
      value: newValue
    });
  };
 
  onSuggestionsFetchRequested({ value }) {
                    const inputValue = value.trim().toLowerCase();
               const inputLength = inputValue.length;
            axios.get('https://api.github.com/search/users?q='+inputValue+'&access_token=91bc72798934cac2d1ba19a1e902f72251845a90')
            .then((response) => {
                    let suggestions = inputLength === 0 ? [] : response.data.items.filter(lang =>
                        lang.login.toLowerCase().slice(0, inputLength) === inputValue);
                        this.setState({
                            suggestions: suggestions
                        });
            })
            .catch((err) => {
                
            });

  };
 
  onSuggestionsClearRequested(){
    this.setState({
      suggestions: []
    });
  };
    
  onSuggestionSelected(event, { suggestion}) {
      ReactDOM.findDOMNode(document.getElementById('ppp')).href= suggestion.html_url;
      ReactDOM.findDOMNode(document.getElementById('ppp')).click();
  };
onSuggestionHighlighted({ suggestion}) {
              for(var i=0;i<this.state.suggestions.length;i++) {
        ReactDOM.findDOMNode(document.getElementById(this.state.suggestions[i].login)).style.backgroundColor= '#0000FF';
    }
    if(suggestion != null) {
            ReactDOM.findDOMNode(document.getElementById(suggestion.login)).style.backgroundColor='#0FF0FF';
   }

};
    
  render() {
    const { value, suggestions } = this.state;
 
    const inputProps = {
      placeholder: 'Type a github id',
      value,
      onChange: this.onChange
    };
 
    // Finally, render it!
    return (
        <div>
                <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionHighlighted={this.onSuggestionHighlighted}
        highlightFirstSuggestion={true}
      />
        <a id='ppp'></a>
        </div>

    );
  }
}
export default App;