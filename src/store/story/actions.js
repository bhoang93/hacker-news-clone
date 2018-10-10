import HackerNewsApi from "services/HackerNewsApi";

const NS = "@hnClone/story";

export const actionTypes = {
  FETCH_STORY_IDS_REQUEST: `${NS}/FETCH_STORY_IDS_REQUEST`,
  FETCH_STORY_IDS_SUCCESS: `${NS}/FETCH_STORY_IDS_SUCCESS`,
  FETCH_STORY_IDS_FAILURE: `${NS}/FETCH_STORY_IDS_FAILURE`,
  FETCH_STORY_REQUEST: `${NS}/FETCH_STORY_REQUEST`,
  FETCH_STORY_SUCCESS: `${NS}/FETCH_STORY_SUCCESS`,
  FETCH_STORY_FAILURE: `${NS}/FETCH_STORY_FAILURE`,
};

const action = (type, payload) => ({type, payload});

const actions = {
  fetchStoryIds: (payload = {}) => {
    return dispatch => {
      dispatch(action(actionTypes.FETCH_STORY_IDS_REQUEST), payload);

      return HackerNewsApi.getTopStoryIds()
        .then(storyIds => {
          dispatch(action(actionTypes.FETCH_STORY_IDS_SUCCESS, { storyIds }));
          dispatch(actions.fetchStories({ storyIds, page: 0 }));
          return storyIds;
        })
        .catch(err => dispatch(action(actionTypes.FETCH_STORY_IDS_FAILURE, err)));
    }
  },
  fetchStories: (payload = {}) => {
    return dispatch => {
      dispatch(action(actionTypes.FETCH_STORY_REQUEST), payload);
      const { storyIds, page } = payload;

      return HackerNewsApi.getStoriesByPage(storyIds, page)
        .then(stories => dispatch(action(actionTypes.FETCH_STORY_SUCCESS, { stories })))
        .catch(err => dispatch(action(actionTypes.FETCH_STORY_FAILURE, err)));
    }
  }
};

export default actions;
