import axios from "axios";

const fetchHerpetoQuestion = async (id) => {
  try {
    const resp = await axios.get("api/identifikasi/herpetofauna/" + id);
    console.log(resp);
    return resp.data.result;
  } catch (err) {
    return err.response.data.message;
  }
};

export default fetchHerpetoQuestion;
