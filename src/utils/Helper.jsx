export const ENDPOINTURL = "https://fea-backend.herokuapp.com/api/v1";

export const listBody = (data) => {
  return {
    where: data.where,
    pagination: {
      sortBy: data?.sortBy ? data.sortBy : "createdAt",
      descending: true,
      rowsPerPage: data?.perPage ? data.perPage : 10000,
      page: data?.page ? data.page : 1,
    },
  };
};

export const delBody = (data) => {
  return {
    data,
  };
};
