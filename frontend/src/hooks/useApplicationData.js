import { useReducer, useEffect } from "react";

import reducer from '../reducer/reducer';

import axios from 'axios';

const initialState = {
  modalVisible: [],
  likes: [],
  topics: [],
  photos: []
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPhotoSelected = (photo) => {
    dispatch({ type: 'SET_PHOTO_SELECTED', payload: photo });
  };

  const updateFavPhotoIds = (photoId) => {
    dispatch({ type: 'UPDATE_FAV_PHOTO_IDS', payload: photoId });
  };

  const onLoadTopic = (topic) => {
    dispatch({ type: 'LOAD_TOPIC', payload: topic });
  };

  const onClosePhotoDetailsModal = () => {
    dispatch({ type: 'CLOSE_PHOTO_DETAILS_MODAL' });
  };

  // retrieve photos
  useEffect(() => {
    axios
      .get('http://localhost:8001/api/photos')
      .then((response) => {
        dispatch({ type: 'GET_PHOTOS', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching photos', error);
      });
  }, []);

  // retrieve topics
  useEffect(() => {
    axios
      .get('http://localhost:8001/api/topics')
      .then((response) => {
        dispatch({ type: 'GET_TOPICS', payload: response.data });
      })
      .catch((error) => {
        console.error('Error fetching topics', error);
      });
  }, []);

  const getPhotoByTopic = (topic) => {
    axios
      .get('http://localhost:8001/api/topics/photos/' + topic.id)
      .then((response) => {
        dispatch({ type: 'GET_PHOTO_BY_TOPICS', payload: response.data})
      })
      .catch(error => {
        console.error("Error fetching data", error);
      });
  }

  return {
    state,
    updateFavPhotoIds,
    setPhotoSelected,
    onLoadTopic,
    onClosePhotoDetailsModal,
    getPhotoByTopic,
  };
}
