import React from "react";
export const ENDPOINTURL = "https://fea-backend.herokuapp.com/api/v1"; // "http://localhost:8080/api/v1";
export const ENDPOINTURLFORIMG = "https://fea-backend.herokuapp.com/"; //  "http://localhost:8080/";

export const listBody = (data) => {
  return {
    where: data.where,
    pagination: {
      sortBy: data.sortBy ? data.sortBy : "createdAt",
      descending: true,
      rowsPerPage: data.perPage ? data.perPage : 10000,
      page: data.page ? data.page : 1,
    },
  };
};

export const delBody = (data) => {
  return {
    data,
  };
};

export const capitalizeWord = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const nFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return num;
};

export const randomColor = [
  "rgba(255, 99, 132, 0.7)",
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
  "rgba(255, 159, 64, 0.7)",
  "rgba(255, 99, 132, 0.7)",
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
  "rgba(255, 159, 64, 0.7)",
  "rgba(255, 99, 132, 0.7)",
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
  "rgba(255, 159, 64, 0.7)",
];
export const currencyFormat = (num) => {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export default function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}
