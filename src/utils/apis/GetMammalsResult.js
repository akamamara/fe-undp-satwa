import axios from "axios";

const GetMammalsResult = async (identificationValue) => {
  let formData = new FormData();
  formData.append("jenis_hewan_ID", identificationValue[0]);
  formData.append("jenis_sisik_ID", identificationValue[1]);
  formData.append("bentuk_kaki_ID", identificationValue[2]);
  formData.append("has_kaki_ID", identificationValue[3]);
  formData.append("jenis_moncong_ID", identificationValue[4]);
  formData.append("jenis_tempurung_ID", identificationValue[5]);
  formData.append("jenis_ekor_ID", identificationValue[6]);
  formData.append("ukuran_tubuh_ID", identificationValue[7]);
  formData.append("warna_ID", identificationValue[8]);

  try {
    const resp = await axios.post("identifikasi/herpeto/result", formData);
    await console.log(resp);
    // await alert(resp.data.message);
    return resp.data.result;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default GetMammalsResult;
