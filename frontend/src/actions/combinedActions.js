import axios from "axios";
import { baseURL } from "../constants/appConstants.js";

const actionsCreator =
  (method, apiType, additionalParam = "", argData = undefined) =>
  () =>
  async (dispatch) => {
    try {
      dispatch({ type: `${method}_${apiType}_request`.toUpperCase() });

      console.log(`${baseURL}/api/${apiType}/${additionalParam}/`);
      const { data } = await axios({
        method: `${method}`,
        url: `${baseURL}/api/${apiType}/${additionalParam}/`,
        data: `${argData}`,
      });

      dispatch({
        type: `${method}_${apiType}_success`.toUpperCase(),
        payload: data,
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: `${method}_${apiType}_fail`.toUpperCase(),
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export default actionsCreator;
// axios({
//   method: "post",
//   url: `${apiType}`
// });

// axios({
//   method: "post",
//   url: `${apiType}`,
//   data: {
//     firstName: "Fred",
//     lastName: "Flintstone",
//   },
// });
