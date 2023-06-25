
export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHOTO_SELECTED':
      return {
        ...state,
        modalVisible: [...state.modalVisible, action.payload],
      };
    case 'UPDATE_FAV_PHOTO_IDS':
      if (!state.likes.includes(action.payload)) {
        return {
          ...state,
          likes: [...state.likes, action.payload],
        };
      } else {
        return {
          ...state,
          likes: state.likes.filter(x => x !== action.payload),
        };
      }
    case 'LOAD_TOPIC':
      return {
        ...state,
        topic: [action.payload],
      };
    case 'CLOSE_PHOTO_DETAILS_MODAL':
      return {
        ...state,
        modalVisible: [],
      };
    case 'GET_PHOTO_BY_TOPICS':
      return {
        ...state,
        photos: action.payload,
      };
    case 'LOAD_PAGE':
      return {
        ...state,
        topics: action.payload[0].data,
        photos: action.payload[1].data,
      };
    case 'GET_TOPICS':
      return {
        ...state,
      };
    default:
      return state;
  }
};
