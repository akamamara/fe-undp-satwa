import axios from "axios";

const fetchHerpetoQuestion = async (id) => {
  try {
    const resp = await axios.get("api/identifikasi/herpetofauna/" + id);
    // await console.log(resp);
    // await alert(resp.data.message);
    console.log(resp);
    return resp.data.result;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default fetchHerpetoQuestion;
