import SummaryApi from "../common/summaryAPI";
import Axios from "./axios";


const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUserDetails