import axios from "axios";

const GetHerpetoDetail = async (mammals_id) => {
  try {
    const resp = await axios.get(
      "api/identifikasi/mammals/result/" + mammals_id
    );
    await console.log(resp);
    return resp.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export default GetHerpetoDetail;
