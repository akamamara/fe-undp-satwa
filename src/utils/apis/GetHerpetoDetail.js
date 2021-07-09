import axios from "axios";

const GetHerpetoDetail = async (herpeto_id) => {
  try {
    const resp = await axios.get(
      "api/identifikasi/herpetofauna/result/" + herpeto_id
    );
    await console.log(resp);
    // await alert(resp.data.message);
    return resp.data;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default GetHerpetoDetail;
