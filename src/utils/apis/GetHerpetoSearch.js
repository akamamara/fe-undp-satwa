import axios from "axios";

const GetAvesSearch = async (queryString, queryType) => {
  let formData = new FormData();

  formData.append("queryString", queryString);
  formData.append("queryType", queryType);

  try {
    const resp = await axios.post("api/herpetofauna/search", formData);
    await console.log(resp);
    return resp.data.result;
  } catch (err) {
    return err.response.data.message;
  }
};

export default GetAvesSearch;
