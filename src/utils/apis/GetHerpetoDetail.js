import axios from "axios";

const GetHerpetoDetail = async (herpeto_id) => {
  try {
    const resp = await axios.get(
      "api/identifikasi/herpetofauna/result/" + herpeto_id
    );
    await console.log(resp);
    return resp.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export default GetHerpetoDetail;
