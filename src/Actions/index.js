import _ from 'lodash';
import jsonPlaceholder from '../APIs/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

    //this or chain method
   /* const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispatch(fetchUser(id))); */

    _.chain(getState().posts).map('userId').uniq().forEach(id => dispatch(fetchUser(id))).value();

};

export const fetchPosts = () => async dispatch  => {
        const response = await jsonPlaceholder.get('/posts');
        
        dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER' , payload: response.data});
};




//using memoization the issue is if data gets updated it will not hit & fetch it again
/*
export const fetchUser = id => dispatch => _fetchUser(id,dispatch);

const _fetchUser = _.memoize( async (id,dispatch) => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER' , payload: response.data});

});
*/