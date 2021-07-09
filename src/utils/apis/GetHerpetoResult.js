import axios from "axios";

const GetHerpetoResult = async (identificationValue) => {
  var split = identificationValue.split(".");

  split = split.map(function (val) {
    return val === "0" ? null : val;
  });
  console.log(split);

  let formData = new FormData();
  if (split[0] !== null) {
    formData.append("jenis_herpeto_ID", split[0]);
  }
  if (split[1] !== null) {
    formData.append("jenis_sisik_ID", split[1]);
  }
  if (split[2] !== null) {
    formData.append("bentuk_kaki_ID", split[2]);
  }
  if (split[3] !== null) {
    formData.append("ukuran_tubuh_herpeto_ID", split[3]);
  }
  if (split[4] !== null) {
    formData.append("jenis_moncong_ID", split[4]);
  }
  if (split[5] !== null) {
    formData.append("jenis_tempurung_ID", split[5]);
  }
  if (split[6] !== null) {
    formData.append("jenis_ekor_ID", split[6]);
  }
  if (split[7] !== null) {
    formData.append("warna_herpeto_ID", split[7]);
  }
  if (split[8] !== null) {
    formData.append("keberadaan_kaki", split[8]);
  }

  try {
    const resp = await axios.post(
      "api/identifikasi/herpetofauna/result",
      formData
    );
    await console.log(resp);
    // await alert(resp.data.message);
    return resp.data.result;
  } catch (err) {
    alert(err.response.data.message);
    //goBack
  }
};

export default GetHerpetoResult;
