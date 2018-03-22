import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home'
import StoryEditor from './Views/StoryEditor/StoryEditor'
import StoryView from './Views/StoryView/StoryView'

import StoryEditorModal from './Components/StoryEditorModal/StoryEditorModal'


export default (
  <Switch> 
    <Route exact path = '/' component = {Landing}/>
    <Route path = '/home' component = {Home}/>
    <Route path = '/createStory' component = {StoryEditor}/>
    <Route path = '/story/:id' component = {StoryView}/>
    <Route path = '/modal' component = {StoryEditorModal}/>
  </Switch>
)