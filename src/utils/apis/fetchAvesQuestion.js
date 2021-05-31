import axios from "axios";

const fetchAvesQuestion = async (id) => {
  try {
    const resp = await axios.get("identifikasi/aves/" + id);
    // await console.log(resp);
    // await alert(resp.data.message);
    console.log(resp);
    return resp.data.result;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default fetchAvesQuestion;
