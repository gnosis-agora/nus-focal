import todoListReducer from './TodoListReducers/todoListReducer';
import timeTrackerReducer from './TimeTrackerReducers/TimeTrackerReducer';
import eventsFeedReducer from './EventsFeedReducers/eventsFeedReducer';
import appStateReducer from './appStateReducers/appStateReducer';
import habitsTrackerReducer from './HabitsTrackerReducers/HabitsTrackerReducer';

const INITIAL_STATE = {
	todoList: {
	  todos: [],
	  visibilityFilter: "SHOW_ALL",
	},
	timeTracker: {
		URL:[],
	},
	eventsFeed: {
		events: [],
		userHasAuthenticated: false,
	},
	appState: {
		sidePanelsVisible: false,
		userName: "",
	},
	habitsTracker: {
		showAddSiteModal: false,
	}
}

export default function rootReducer(state = INITIAL_STATE, action) {
  return {
    todoList : todoListReducer(state.todoList, action),
    timeTracker : timeTrackerReducer(state.timeTracker, action),
    eventsFeed: eventsFeedReducer(state.eventsFeed, action),
    appState: appStateReducer(state.appState, action),
    habitsTracker: habitsTrackerReducer(state.habitsTracker, action),
  };
}


/*
State Tree

store = {
	todoList: {
	  todos: [
      id: NUMBER,
      completed: BOOLEAN,
      text: STRING
	  ],
	  visibilityFilter: STRING
	}
	timeTracker: {
		URL: []
	},
    eventsFeed: {
	  userHasAuthenticated: BOOLEAN
	  events: [{
		fullDayEvents: [],
		events: []
	  } * 7 days];
    },
    appState:
    	sidePanelsVisible: BOOLEAN
    	userName: STRING

		
    sidePanelsVisible: BOOLEAN
}
*/
