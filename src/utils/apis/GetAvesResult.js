import axios from "axios";

const GetAvesResult = async (identificationValue) => {
  try {
    const resp = await axios.get(
      "identifikasi/aves/result",
      identificationValue
    );
    await console.log(resp);
    // await alert(resp.data.message);
    return resp.data.result;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default GetAvesResult;
