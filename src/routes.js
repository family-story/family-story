import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home'
import StoryEditor from './Views/StoryEditor/StoryEditor'
import StoryViewModal from './Views/StoryViewModal/StoryViewModal'

import ImageCarousel from './Components/ImageCarousel/ImageCarousel'

export default (
  <Switch> 
    <Route exact path = '/' component = {Landing}/>
    <Route path = '/home' component = {Home}/>
    <Route path = '/createStory' component = {StoryEditor}/>
    <Route path = '/story/:id' component = {StoryViewModal}/>
    <Route path = '/carousel' component = {ImageCarousel}/>
    <Route path = '/storyModal' component = {StoryViewModal}/>
  </Switch>
)