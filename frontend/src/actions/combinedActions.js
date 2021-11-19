import axios from "axios";

export const listDataCreator =
  (apiType, actionPrefix) => () => async (dispatch) => {
    try {
      dispatch({ type: `${actionPrefix}_list_request` });

      const { data } = await axios.get(`${apiType}`);

      dispatch({
        type: `${actionPrefix}_list_success`,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: `${actionPrefix}_list_fail`,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
