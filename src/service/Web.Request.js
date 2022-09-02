import axios from "axios";

export const get = async (url) => {
  const response = await axios
    .get(url)
    .then((res) => {
      if (res.status === 200) {
        if (res.data?.success) {
          return res.data?.data;
        }
      } else {
        return null;
      }
      // return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const remove = async (url, data) => {
  const response = await axios
    .delete(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

// export const patch = async (url, data) => {
//   const response = await axios
//     .patch(url, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   return response;
// };

export const patch = async (url, data) => {
  return await axios
    .patch(url, data)
    .then((res) => {
      if (res.status === 200) {
        if (res.data?.success) {
          return res.data?.data.list ? res.data?.data.list : res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      // return err?.response?.data;
    });
};

export function authHeader() {
  // return authorization header with basic auth credentials
  let user = localStorage.getItem("dataToken");
  console.log('user: ', user);

  if (user) {
    return { headers: {"Authorization" : `Bearer ${user}`} }
    // return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

export const post = async (url, data) => {
  return await axios
    .post(url, data, authHeader())
    .then((res) => {
      if (res.status === 200) {
        if (res.data?.success) {
          return res.data?.data.list ? res.data?.data : res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      return err?.response?.data;
    });
};

export const put = async (url, data) => {
  return await axios
    .put(url, data)
    .then((res) => {
      if (res.status === 200) {
        if (res.data?.success) {
          return res.data?.data.list ? res.data?.data.list : res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      return err?.response?.data;
    });
};
