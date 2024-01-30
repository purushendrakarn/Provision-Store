import axios from 'axios';
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const apiUrl = 'https://apiv2stg.promilo.com/user/oauth/token';
    var formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    formData.append('grant_type', 'password');

    axios({
      method: "post",
      url: apiUrl,
      data: formData,
      headers: {
        "Content-Type": "form-data",
        Authorization: 'Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg=='
      },
    })
      .then(function (data) {
        resolve({
          isSuccess: true,
          resposeCode: data.status,
          result: data.data // include the actual data in the result
        });
      })
      .catch(function (error) {
        console.log(error.response);
        resolve({
          isSuccess: false,
          resposeCode: error.response.status,
          result: ''
        });
      });
  });
};
