// ? Template

import SummaryApi from "../common/summaryAPI";
import Axios from "./axios";

export const uploadImage = async (image) => {
  try {
    const formData = new FormData()
    formData.append('image', image)
    const response = await Axios({
        ...SummaryApi.uploadImage,
        data: formData
    })
    return response
  } catch (error) {
    console.log(error);
  }
};
