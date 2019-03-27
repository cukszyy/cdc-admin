import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';

class App extends Component {

  constructor() {
    super()
    
    this.state = {
      list:      [],
      name:     '',
      email:    '',
      password: '',
    } 

    this.submitForm   = this.submitForm.bind(this)
    this.setName      = this.setName.bind(this)
    this.setEmail     = this.setEmail.bind(this)
    this.setPassword  = this.setPassword.bind(this)
  }

  componentDidMount() {
    fetch('http://cdc-react.herokuapp.com/api/autores')
    .then(results =>
      results.json()
    )
    .then(data => {
      this.setState({list: data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  submitForm(event) {
    event.preventDefault()
    console.log('ok')

    fetch('http://cdc-react.herokuapp.com/api/autores', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome:   this.state.name,
          email:  this.state.email,
          senha:  this.state.password,
        })
      })
    .then(response => {
      return response.json();
    })
    .then(data => {
        this.setState({list: data})
        this.setState({
          name:     '',
          email:    '',
          password: '',
        })
    })
    .catch(err => {
      console.error('Failed retrieving information', err);
    })
  }

  setName(event) {
    this.setState({ name: event.target.value })
  }

  setEmail(event) {
    this.setState({ email: event.target.value }) 
  }

  setPassword(event) {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
          </a>

          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>

                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Author</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                  </ul>
              </div>
          </div>

          <div id="main">
              <div className="header">
                  <h1>Cadastro de Autores</h1>
              </div>

              <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" method="post" onSubmit={this.submitForm}>
                  <CustomInput
                    id        = "name" 
                    type      = "text" 
                    name      = "name" 
                    value     = {this.state.name} 
                    onChange  = {this.setName}
                    label     = 'Name'
                  />

                  <CustomInput
                    id        = "email" 
                    type      = "email" 
                    name      = "email" 
                    value     = {this.state.email} 
                    onChange  = {this.setEmail}
                    label     = 'Email'
                  />

                  <CustomInput
                    id        = "password" 
                    type      = "password" 
                    name      = "password" 
                    value     = {this.state.password} 
                    onChange  = {this.setPassword}
                    label     = 'Password'
                  />

                  <CustomButton
                    type      = "submit" 
                    label     = 'Submit'
                  />
                </form>             

              </div>  
              <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.list.map(function (author) {
                        return (
                          <tr key={ author.id }>
                            <td>{ author.nome }</td>
                            <td>{ author.email }</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table> 
              </div>             
            </div>
          </div>
      </div>
    );
  }
}

export default App;
