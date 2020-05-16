import React, { Component } from 'react'
import './App.css'
import Router from './components/Router/Router'
import NavigationBarBottom from './components/NavigationBar_Bottom/NavigationBarBottom.js'

/**
 * Class utama yang menampilkan hasil render dari semua komponen di bawahnya
 */
class App extends Component {
  state = {
    showScreen: 'title',
    loggedIn: false,
    authToken: ''
  }

  render () {
    // Di atas Fragment buatlah NavBar dahulu untuk pindah laman
    return (
      <React.Fragment>
        <div className='bg'>
          <Router/>
        </div>
        <NavigationBarBottom />
      </React.Fragment>
    )
  }
}


export default App
