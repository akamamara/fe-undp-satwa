import axios from "axios";

const fetchAvesQuestion = async (id) => {
  try {
    const resp = await axios.get("api/identifikasi/aves/" + id);
    console.log(resp);
    return resp.data.result;
  } catch (err) {
    return err.response.data.message;
  }
};

export default fetchAvesQuestion;
