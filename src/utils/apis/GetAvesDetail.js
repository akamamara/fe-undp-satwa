import axios from "axios";

const GetAvesDetail = async (aves_id) => {
  try {
    const resp = await axios.get("api/identifikasi/aves/result/" + aves_id);
    await console.log(resp);
    return resp.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export default GetAvesDetail;
