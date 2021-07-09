import axios from "axios";

const GetAvesDetail = async (aves_id) => {
  try {
    const resp = await axios.get("api/identifikasi/aves/result/" + aves_id);
    await console.log(resp);
    // await alert(resp.data.message);
    return resp.data;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default GetAvesDetail;
