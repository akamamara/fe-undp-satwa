import axios from "axios";

const GetAvesResult = async (identificationValue) => {
  let formData = new FormData();
  formData.append("jenis_burung_ID", identificationValue[0]);
  formData.append("bentuk_paruh_ID", identificationValue[1]);
  formData.append("warna_ID", identificationValue[2]);
  formData.append("ukuran_tubuh_ID", identificationValue[3]);
  formData.append("tipe_cakar_ID", identificationValue[4]);
  try {
    const resp = await axios.post("identifikasi/aves/result", formData);
    await console.log(resp);
    // await alert(resp.data.message);
    return resp.data.result;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default GetAvesResult;
