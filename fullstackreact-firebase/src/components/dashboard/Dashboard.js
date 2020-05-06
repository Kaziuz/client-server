import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { Redirect } from 'react-router-dom'

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props
    //console.log('oe', this.props)
    //Si el suaurio no esta logueado lo redirecciono a crear cuenta 
    // if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1 ">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //console.log('notifications', state)
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([ // connect collection with document firestore
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ])
)(Dashboard)