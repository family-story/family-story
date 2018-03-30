const axios = require("axios");

//Initial State
const initialState = {
  storiesArray: [],
  currentStoryOrig: [],
  currentStory: [],
  currentEventOrig: {},
  currentEvent: {},
  currentEventIndex: 0,
  importedMedia: [],
  user: {}
}

//Action Names
const GET_STORIES_ARRAY = 'GET_STORIES_ARRAY';
const GET_STORY = 'GET_STORY';
const CREATE_NEW_STORY = 'CREATE_NEW_STORY'; //test done
const SAVE_NEW_STORY = 'SAVE_NEW_STORY';
const UPDATE_STORY = 'UPDATE_STORY';
const UPDATE_STORY_DB = 'UPDATE_STORY_DB';
const DELETE_STORY = 'DELETE_STORY';
const CANCEL_CHANGES_STORY = 'CANCEL_CHANGES_STORY';
const GET_EVENT = 'GET_EVENT';
const CREATE_NEW_EVENT = 'CREATE_NEW_EVENT'; //test done
const UPDATE_EVENT = 'UPDATE_EVENT'; //test done
const SAVE_UPDATED_EVENT = 'SAVE_UPDATED_EVENT';
const UPDATE_EVENT_ORDER = 'UPDATE_EVENT_ORDER'; //test done
const DELETE_EVENT = 'DELETE_EVENT'; //test done
const CANCEL_CHANGES_EVENT = 'CANCEL_CHANGES_EVENT';
const ADD_IMPORTED_MEDIA = 'ADD_IMPORTED_MEDIA'; // no longer mvp
const ADD_UPLOADED_MEDIA = 'ADD_UPLOADED_MEDIA'; //test done
const CLEAR_IMPORTED_MEDIA = 'CLEAR_IMPORTED_MEDIA'; //test done
const CLEAR_STATE = 'CLEAR_STATE'; //test done
const GET_USER_INFO = 'GET_USER_INFO';

/*Here is a definitive guide on what each of these actions are and what they are meant for:

GET_STORIES_ARRAY: used to get the stories from the database for a particular user and populate storiesArray. It is meant to be called only after login and redirect to the home page since all other actions that will affect this array are defined elsewhere.

GET_STORY: used to get the full story from the db when the user clicks on a story to ether view it, or edit it.

CREATE_NEW_STORY: When a user hits the 'create a new story' button, this pre-populates state with an empty story. !!!!!!!NEEDS TO HAVE THE USER ID ADDED ONCE AUTH0 IS CONNECTED!!!!!!!

SAVE_NEW_STORY: saves a newly completed story to the database. Used when the save button is pushed on the create story view.

UPDATE_STORY: ran every time an edit is made in the edit/create story view so as to prevent any loss of data upon a refresh.

UPDATE_STORY_DB: ran any time someone hits the save button in the edit story view. similar to the SAVE_NEW_STORY action.

DELETE_STORY: deletes a story from the database. Used in the home or the edit story view.

CANCEL_CHANGES_STORY: Cancels all user edits to a story by setting everything back to their saved original values. Used on the cancel button of the edit/create story page.

GET_EVENT: When a user clicks on a pre-existing event in the create/edit story view, it pulls the event into state on 'currentEvent' so it can be rendered/edited.

CREATE_NEW_EVENT: When a user hits the 'create a new event' button, this pre-populates state with an empty event. Similar to the CREATE_NEW_STORY action.

UPDATE_EVENT: ran every time an edit is made in the edit event view so as to prevent any loss of data upon a refresh. Similar to the UPDATE_STORY action.

SAVE_UPDATED_EVENT: used when the save button is hit in the update event view. This places the updates into the proper place of the events array on the 'currentStory' in state. It then clears the 'currentEvent' and 'currentEventOrig' in state.

UPDATE_EVENT_ORDER: used when the order of events is swapped in a story. updates the 'currentStory' in state.

DELETE_EVENT: used to remove an event from the 'currentStory' on state. This will be hit when the delete event button is hit on the event editor or the story editor.

CANCEL_CHANGES_EVENT: Cancels all user edits to an event by setting everything back to their saved original values. Used on the cancel button of the edit event page. Similar to the CANCEL_CHANGES_STORY action.

ADD_IMPORTED_MEDIA: After a person is imported from FS, this stores all imported memories. !!!!!!!THIS IS STILL BROKEN. MUST WAIT UNTIL FS HOOKUP IS COMPLETE!!!!!!!

CLEAR_IMPORTED_MEDIA: Hit when done creating or editing a story to ensure prior media has been removed.

CLEAR_STATE: Hit upon logout to clear the state.
*/


module.exports = {
  //Action Creators
  getStoriesArray: function (user_id) {
    const returnedStoriesArray = axios.get(`/api/stories/${user_id}`).then(res => res.data);

    return {
      type: GET_STORIES_ARRAY,
      payload: returnedStoriesArray
    };
  },

  getStory: function (story_id) {
    const returnedStory = axios.get(`/api/story/${story_id}`).then(res => res.data);
    return {
      type: GET_STORY,
      payload: returnedStory
    };
  },

  createNewStory: function () {
    return {
      type: CREATE_NEW_STORY,
      payload: [{
        story_title: "",
        tags: [],
        events: []
      }]
    }
  },

  saveNewStory: function (body) {
    //The parameter 'body' will be the value of currentStory on the store, but it must be passed in by the component calling the action.
    const returnedStoriesArray = axios.post('/api/story', body).then(res => res.data);

    return {
      type: SAVE_NEW_STORY,
      payload: returnedStoriesArray
    };
  },

  updateStoryDB: function (body) {
    //The parameter 'body' will be the value of currentStory on the store, but it must be passed in by the component calling the action.
    const returnedStoriesArray = axios.put('/api/story', body).then(res => res.data);

    return {
      type: UPDATE_STORY_DB,
      payload: returnedStoriesArray
    };
  },

  updateStory: function (story) {
    return {
      type: UPDATE_STORY,
      payload: story
    };
  },

  deleteStory: function (story_id) {
    const returnedStoriesArray = axios.delete(`/api/story/${story_id}`).then(res => res.data);

    return {
      type: DELETE_STORY,
      payload: returnedStoriesArray
    };
  },

  cancelStoryChanges: function () {
    return { type: CANCEL_CHANGES_STORY };
  },

  getEvent: function (eventIndex) {
    return {
      type: GET_EVENT,
      payload: eventIndex
    };
  },

  createNewEvent: function (eventNum) {
    return {
      type: CREATE_NEW_EVENT,
      payload: {
        event_num: eventNum,
        event_title: "",
        date: "",
        location: "",
        event_txt: "",
        media: []
      }
    };
  },

  updateEvent: function (updatedEvent) {
    return {
      type: UPDATE_EVENT,
      payload: updatedEvent
    };
  },

  saveUpdatedEvent: function () {
    return { type: SAVE_UPDATED_EVENT }
  },

  updateEventOrder: function (index1, index2) {
    return {
      type: UPDATE_EVENT_ORDER,
      payload: [index1, index2]
    };
  },

  deleteEvent: function (index) {
    return {
      type: DELETE_EVENT,
      payload: index
    };
  },

  cancelEventChanges: function () {
    return { type: CANCEL_CHANGES_EVENT };
  },

  addImportedMedia: function () {
    const media = []; //Add axios request to get FS memories.

    return {
      type: ADD_IMPORTED_MEDIA,
      payload: media
    }
  },
  // example of media passed = {
  //     media_type: 'audio'/ 'pic',
  //     media_ref: cloudinary_url
  // }
  addUploadedMedia: function (media) {
    return {
      type: ADD_UPLOADED_MEDIA,
      payload: media
    }
  },

  clearImportedMedia: function () {
    return { type: CLEAR_IMPORTED_MEDIA };
  },

  clearState: function () {
    return { type: CLEAR_STATE };
  },

  getUserInfo: function () {
    const userInfo = axios.get('/auth/me').then(res => res.data)
    return { type: GET_USER_INFO, payload: userInfo }
  },

  //Reducer
  reducer: function (state = initialState, action) {
    switch (action.type) {
      case GET_USER_INFO + "_FULFILLED":
        return Object.assign({}, state, { user: action.payload });
      case GET_STORIES_ARRAY + "_FULFILLED":
      case SAVE_NEW_STORY + "_FULFILLED":
      case UPDATE_STORY_DB + "_FULFILLED":
      case DELETE_STORY + "_FULFILLED":
        return Object.assign({}, state, { storiesArray: action.payload });

      case GET_STORY + "_FULFILLED":
        return Object.assign({}, state, {
          currentStoryOrig: action.payload,
          currentStory: action.payload
        });

      case CREATE_NEW_STORY:
        return Object.assign({}, state, {
          currentStoryOrig: action.payload,
          currentStory: action.payload
        });

      case UPDATE_STORY:
        return Object.assign({}, state, { currentStory: action.payload });

      case CANCEL_CHANGES_STORY:
        let reset = state.currentStoryOrig.slice();
        return Object.assign({}, state, { currentStory: reset });

      case CREATE_NEW_EVENT:
        let changedStoryNE = state.currentStory.slice();
        changedStoryNE[0].events.push(action.payload);
        return Object.assign({}, state, {
          currentStory: changedStoryNE,
          currentEventOrig: action.payload,
          currentEvent: action.payload,
          currentEventIndex: action.payload.event_num
        });

      case UPDATE_EVENT:
        return Object.assign({}, state, { currentEvent: action.payload });

      case GET_EVENT:
        let eventHolderGE = Object.assign({}, state.currentStory[0].events[action.payload]);
        return Object.assign({}, state, {
          currentEventOrig: eventHolderGE,
          currentEvent: eventHolderGE
        });

      case SAVE_UPDATED_EVENT:
        let changedStorySUE = state.currentStory.slice();
        let eventHolderSUE = Object.assign({}, state.currentEvent);
        changedStorySUE[0].events.splice(state.currentEventIndex, 1, eventHolderSUE);
        return Object.assign({}, state, {
          currentStory: changedStorySUE,
          currentEventOrig: {},
          currentEvent: {},
          currentEventIndex: 0
        });

      case CANCEL_CHANGES_EVENT:
        return Object.assign({}, state, {
          currentEventOrig: {},
          currentEvent: {},
          currentEventIndex: 0
        });

      case UPDATE_EVENT_ORDER:
        let changedStoryUEO = state.currentStory.slice();
        let item1 = changedStoryUEO[0].events[action.payload[0]];
        let item2 = changedStoryUEO[0].events[action.payload[1]];
        item1.event_num = action.payload[1];
        item2.event_num = action.payload[0];
        changedStoryUEO[0].events[action.payload[0]] = item2;
        changedStoryUEO[0].events[action.payload[1]] = item1;
        return Object.assign({}, state, { currentStory: changedStoryUEO });

      case DELETE_EVENT:
        let changedStoryDE = state.currentStory.slice();
        changedStoryDE[0].events.splice(action.payload, 1);
        // console.log(changedStoryDE[0].events)
        return Object.assign({}, state, {
          currentStory: changedStoryDE,
          currentEventOrig: {},
          currentEvent: {},
          currentEventIndex: 0
        });

      case ADD_IMPORTED_MEDIA + "_FULFILLED":
        let arr = state.importedMedia.slice();
        arr.push(action.payload);
        console.log(action.payload)
        return Object.assign({}, state, { importedMedia: arr });

      case ADD_UPLOADED_MEDIA:
        let arr2 = state.importedMedia.slice();
        arr2.push(action.payload);
        console.log(action.payload)
        return Object.assign({}, state, { importedMedia: arr2 });

      case CLEAR_IMPORTED_MEDIA:
        return Object.assign({}, state, { importedMedia: [] });

      case CLEAR_STATE:
        return Object.assign({}, initialState);

      default:
        return state;
    }
  }
}