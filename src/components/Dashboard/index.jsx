import { React, useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {
  CardFrist,
  CardOne,
  CardTwo,
  ContainerTwo,
  DoughnutSize,
  MainBody,
  TabButtons,
  TabMain,
  ProductChartSize,
  StockBox,
  BorderDLinearProgress,
  BorderCLinearProgress,
  BorderBLinearProgress,
  BorderALinearProgress,
  ShowButton,
  ShowButtonText,
  OrderTrackingText,
  CardThree,
  IncomeCard,
  ExpensesCard,
  CardFour,
  TableCellA,
  TableCellB,
  TableCellC,
  TableCellD,
  ProductsText,
  CardFive,
  ScrollBox,
} from "./Dashboard.style";
import Box from "@mui/material/Box";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Avatar, Button, Skeleton } from "@mui/material";
import useToggle, {
  currencyFormat,
  ENDPOINTURLFORIMG,
  listBody,
  nFormatter,
  randomColor,
} from "../../utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardList,
  fetchOrderList,
  fetchProductList,
} from "../../js/actions";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels
);
export default function Dashboard() {
  const [value, setValue] = useState(0);
  const [productChartData, setProductChartData] = useState();
  const [customStatdate, setCustomStartDate] = useState(null);
  const [customEnddate, setCustomEndDate] = useState(null);
  const [customArea, setCustomArea] = useState(false);
  const [placeValue, setPlacedValue] = useState(0);
  const [disValue, setDisValue] = useState(0);
  const [canValue, setCanValue] = useState(0);
  const [recValue, setRecValue] = useState(0);
  const [orderValue, setOrderValue] = useState();
  const [loading, setLoading] = useState(true);
  const [orderTotalValue, setOrderTotalValue] = useState();
  const [isOn, toggleIsOn] = useToggle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [themeKey, setThemeKey] = useState(localStorage.getItem("themeKey"));
  console.log(themeKey);
  useEffect(() => {
    getDashboardData(
      moment().startOf("week").format("YYYY-MM-DD"),
      moment().endOf("week").format("YYYY-MM-DD"),
      0
    );
  }, []);
  useEffect(() => {
    const data = localStorage.getItem("themeKey");
    try {
      if (data === "true") {
        setThemeKey("White");
      } else if (data === "false") {
        setThemeKey("Black");
      } else {
        setThemeKey("Black");
      }
    } catch (error) {
      alert(error);
    }
  }, [localStorage.getItem("themeKey")]);
  const dashboardList = useSelector((state) => state?.dashboard.list);
  const productList = useSelector((state) => state.product.list);
  const orderList = useSelector((state) => state.order.list);

  useEffect(() => {
    getDashboardAllData(value);
  }, [dashboardList, value]);
  useEffect(() => {
    setRecValue(orderList.filter((data) => data.orderStatus === "RECEIVED"));
    setDisValue(orderList.filter((data) => data.orderStatus === "DISPATCHED"));
    setPlacedValue(orderList.filter((data) => data.orderStatus === "PLACED"));
    setCanValue(orderList.filter((data) => data.orderStatus === "CANCEL"));
    setOrderValue(orderList.length);
    setOrderTotalValue(orderList.reduce((a, b) => (a = a + b.totalPrice), 0));

    if (orderList.length > 0) {
      setLoading(false);
    }
  }, [orderList]);

  const handleChange = (event, newValue) => {
    setValue(newValue); // eslint-disable-next-line
    switch (newValue) {
      case 0:
        setCustomArea(false);
        getDashboardData(
          moment().startOf("week").format("YYYY-MM-DD"),
          moment().endOf("week").format("YYYY-MM-DD"),
          newValue
        );
        break;
      case 1:
        setCustomArea(false);
        getDashboardData(
          moment().startOf("month").format("YYYY-MM-DD"),
          moment().endOf("month").format("YYYY-MM-DD"),
          newValue
        );
        break;
      case 2:
        setCustomArea(false);
        getDashboardData(
          moment().startOf("year").format("YYYY-MM-DD"),
          moment().endOf("year").format("YYYY-MM-DD"),
          newValue
        );
        break;
      case 3:
        setCustomArea(true);

        break;
      default:
        setCustomArea(false);
        getDashboardData(
          moment().startOf("week").format("YYYY-MM-DD"),
          moment().endOf("week").format("YYYY-MM-DD"),
          newValue
        );
        break;
    }
  };
  const OrdersbyProducts = dashboardList?.orderedProducts.filter(
    (data) => data.quantity > 0
  );

  const data = {
    labels: OrdersbyProducts?.map((data) => data.name),
    datasets: [
      {
        data: OrdersbyProducts?.slice(0, 10).map((data) => data.quantity),
        backgroundColor: randomColor,
        borderColor: randomColor,
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return datasets[0].data.map((data, i) => ({
              text: `${chart.data.labels[i]} - ${data}`,
              fillStyle: datasets[0].backgroundColor[i],
            }));
          },
          color: `${themeKey}`,
        },

        color: `${themeKey}`,
        position: "right",
        font: {
          family: "Public Sans",
        },
      },
      datalabels: {
        anchor: "end",
        align: "start",
        font: {
          weight: "bold",
        },
        color: `${themeKey}`,
      },
    },
  };
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        anchor: "end",
        align: "top",
        font: {
          weight: "bold",
        },
        color: `${themeKey}`,
        formatter: function (value) {
          var num = nFormatter(value);
          return num;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: `${themeKey}`,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: `${themeKey}`,
        },
      },
    },

    elements: {
      line: {
        tension: 0.5,
      },
    },
    options: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var value = data.datasets[0].data[tooltipItem.index];
            value = value.toString();
            value = value.split(/(?=(?:...)*$)/);
            value = value.join(",");
            return value;
          },
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(",");
                return value;
              },
            },
          },
        ],
      },
    },
  };
  const datas = {
    labels: productChartData?.map((data) => data.createdAt),
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: productChartData?.map((data) => data.totalPrice),
        borderColor: "#00c353",
        backgroundColor: "#c4ffdd7a",
      },
    ],
  };
  const getDateHandler = () => {
    if (customEnddate !== null) {
      getDashboardData(
        moment(customStatdate).format("YYYY-MM-DD"),
        moment(customEnddate).format("YYYY-MM-DD"),
        3
      );
    }
  };

  const getDashboardData = async (startDate, endDate, newValue) => {
    try {
      dispatch(fetchDashboardList({ startDate: startDate, endDate: endDate }));
      dispatch(fetchProductList(listBody({ where: null, perPage: 1000 })));
      dispatch(fetchOrderList(listBody({ where: null, perPage: 10000 })));
      getDashboardAllData(newValue);
    } catch (err) {
      alert(err);
    }
  };

  const getDashboardAllData = async (newValue) => {
    switch (newValue) {
      case 0:
        getWeekData();
        break;
      case 1:
        getMonthsData();
        break;
        s;
      case 2:
        getYearData();
        break;
      case 3:
        customDateData();
        break;
      default:
        getWeekData();
        break;
    }

    // eslint-disable-next-line
  };
  const getWeekData = () => {
    var holder = {};
    let week = [];

    dashboardList?.orderData.forEach(function (d) {
      if (holder.hasOwnProperty(moment(d.createdAt).format("DD"))) {
        holder[moment(d.createdAt).format("DD")] =
          holder[moment(d.createdAt).format("DD")] + d.totalPrice;
      } else {
        holder[moment(d.createdAt).format("DD")] = d.totalPrice;
      }
    });

    for (var date in holder) {
      week.push({ createdAt: date, totalPrice: holder[date].toFixed(2) });
    }
    [...Array(7)].map((_, i) => {
      let first = new Date().getDate() - new Date().getDay() + i + 1;
      return week.push({ createdAt: first, totalPrice: 0 });
    });

    var weeks = Object.values(
      week.reduce((r, o) => {
        r[o.createdAt] = r[o.createdAt] || {
          createdAt: o.createdAt,
          totalPrice: 0,
        };
        r[o.createdAt].totalPrice += +o.totalPrice;
        return r;
      }, {})
    );

    setProductChartData(weeks);
  };

  const getYearData = () => {
    let year = [];
    var yearholder = {};
    dashboardList?.orderData.forEach(function (d) {
      if (yearholder.hasOwnProperty(moment(d.createdAt).format("MM"))) {
        yearholder[moment(d.createdAt).format("MM")] =
          yearholder[moment(d.createdAt).format("MM")] + d.totalPrice;
      } else {
        yearholder[moment(d.createdAt).format("MM")] = d.totalPrice;
      }
    });

    for (var date in yearholder) {
      year.push({ createdAt: date, totalPrice: yearholder[date] });
    }

    [...Array(12)].map((_, i) =>
      year.push({
        createdAt: `${String(i + 1).padStart(2, "0")}`,
        totalPrice: 0,
      })
    );
    var years = Object.values(
      year.reduce((r, o) => {
        r[o.createdAt] = r[o.createdAt] || {
          createdAt: o.createdAt,
          totalPrice: 0,
        };
        r[o.createdAt].totalPrice += +o.totalPrice;
        return r;
      }, {})
    );

    var newYear = years.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
    setProductChartData(newYear);
  };
  const customDateData = () => {
    let customDate = [];
    var customDateHolder = {};
    dashboardList?.orderData.forEach(function (d) {
      if (
        customDateHolder.hasOwnProperty(
          moment(d.createdAt).format("DD-MM-YYYY")
        )
      ) {
        customDateHolder[moment(d.createdAt).format("DD-MM-YYYY")] =
          customDateHolder[moment(d.createdAt).format("DD-MM-YYYY")] +
          d.totalPrice;
      } else {
        customDateHolder[moment(d.createdAt).format("DD-MM-YYYY")] =
          d.totalPrice;
      }
    });
    for (var date in customDateHolder) {
      customDate.push({
        createdAt: date,
        totalPrice: customDateHolder[date].toFixed(2),
      });
    }
    setProductChartData(customDate);
  };
  const getMonthsData = (data) => {
    let months = [];
    var monthsHolder = {};
    dashboardList?.orderData.forEach(function (d) {
      if (monthsHolder.hasOwnProperty(moment(d.createdAt).format("DD"))) {
        monthsHolder[moment(d.createdAt).format("DD")] =
          monthsHolder[moment(d.createdAt).format("DD")] + d.totalPrice;
      } else {
        monthsHolder[moment(d.createdAt).format("DD")] = d.totalPrice;
      }
    });
    for (var date in monthsHolder) {
      months.push({
        createdAt: date,
        totalPrice: monthsHolder[date].toFixed(2),
      });
    }
    [...Array(moment().daysInMonth())].map((_, i) =>
      months.push({
        createdAt: `${String(i + 1).padStart(2, "0")}`,
        totalPrice: 0,
      })
    );
    var monthss = Object.values(
      months.reduce((r, o) => {
        r[o.createdAt] = r[o.createdAt] || {
          createdAt: o.createdAt,
          totalPrice: 0,
        };
        r[o.createdAt].totalPrice += +o.totalPrice;
        return r;
      }, {})
    );

    var newMonths = monthss.sort((a, b) => {
      return a.createdAt - b.createdAt;
    });
    setProductChartData(newMonths);
  };

  return (
    <>
      {/* <Alert severity="error">Session token expired!</Alert> */}
      <MainBody>
        {loading ? (
          <>
            <Grid container>
              <Grid xs={3}>
                <Skeleton
                  width={280}
                  height={128}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
              <Grid xs={3}>
                <Skeleton
                  width={280}
                  height={128}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
              <Grid xs={3}>
                <Skeleton
                  width={280}
                  height={128}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
              <Grid xs={3}>
                <Skeleton
                  width={280}
                  height={128}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
            </Grid>
            <ContainerTwo container>
              <Grid xs={5} style={{ marginTop: "15px" }}>
                <Skeleton
                  width={480}
                  height={365}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
              <Grid xs={7} style={{ marginTop: "15px" }}>
                <Skeleton
                  width={675}
                  height={365}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
            </ContainerTwo>
            <ContainerTwo container>
              <Grid xs={4}>
                <Skeleton
                  style={{ marginTop: "15px" }}
                  width={380}
                  height={240}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
              <Grid xs={4}>
                <Skeleton
                  style={{ marginTop: "15px" }}
                  width={380}
                  height={240}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
              <Grid xs={4}>
                <Skeleton
                  style={{ marginTop: "15px" }}
                  width={380}
                  height={240}
                  variant="rounded"
                  animation="wave"
                />
              </Grid>
            </ContainerTwo>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid xs={3}>
                <CardFrist>
                  <Grid container>
                    <Grid container xs={10}>
                      <CardContent>
                        <CardTwo variant="h6" component="div">
                          Total Orders
                        </CardTwo>

                        <CardOne variant="h5" component="div">
                          {dashboardList?.totalOrder}{" "}
                        </CardOne>
                      </CardContent>
                    </Grid>
                  </Grid>
                </CardFrist>
              </Grid>
              <Grid xs={3}>
                <CardFrist>
                  <Grid container>
                    <Grid container xs={10}>
                      <CardContent>
                        <CardTwo variant="h6" component="div">
                          Total Products
                        </CardTwo>
                        <CardOne variant="h5" component="div">
                          {dashboardList?.totalProducts}
                        </CardOne>
                      </CardContent>
                    </Grid>
                  </Grid>
                </CardFrist>
              </Grid>
              <Grid xs={3}>
                <CardFrist>
                  <Grid container>
                    <Grid container xs={10}>
                      <CardContent>
                        <CardTwo variant="h6" component="div">
                          Total Customers
                        </CardTwo>
                        <CardOne variant="h5" component="div">
                          {dashboardList?.totalUser}
                        </CardOne>
                      </CardContent>
                    </Grid>
                  </Grid>
                </CardFrist>
              </Grid>
              <Grid xs={3}>
                <CardFrist>
                  <Grid container>
                    <Grid container xs={10}>
                      <CardContent>
                        <CardTwo variant="h6" component="div">
                          Total Category
                        </CardTwo>
                        <CardOne variant="h5" component="div">
                          {dashboardList?.totalCategory}
                        </CardOne>
                      </CardContent>
                    </Grid>
                  </Grid>
                </CardFrist>
              </Grid>
            </Grid>
            <ContainerTwo container spacing={2}>
              <Grid xs={5} style={{ maxHeight: 400 }}>
                <CardFrist>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      Orders by Products
                    </CardTwo>
                    <DoughnutSize options={doughnutOptions} data={data} />
                  </CardContent>
                </CardFrist>
              </Grid>
              <Grid xs={7} style={{ maxHeight: 400 }}>
                <CardFrist>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid xs={4}>
                        <CardContent>
                          <CardTwo variant="h6" component="div">
                            Sales Overview
                          </CardTwo>
                        </CardContent>
                      </Grid>
                      <Grid xs={8}>
                        <Box sx={{ width: "100%" }}>
                          <TabMain
                            value={value}
                            onChange={handleChange}
                            centered
                          >
                            <TabButtons label="This Week" />
                            <TabButtons label="This Months" />
                            <TabButtons label="This Year" />
                            <TabButtons label="Custom" />
                          </TabMain>
                        </Box>
                      </Grid>
                    </Grid>
                    {customArea ? (
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={2}></Grid>
                          <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="Start Date"
                                value={customStatdate}
                                onChange={(newValue) => {
                                  setCustomStartDate(newValue.$d);
                                }}
                                renderInput={(params) => (
                                  <TextField size="small" {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                label="End Date"
                                value={customEnddate}
                                onChange={(newValue) => {
                                  setCustomEndDate(newValue.$d);
                                }}
                                renderInput={(params) => (
                                  <TextField size="small" {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              onClick={() => getDateHandler()}
                            >
                              OK
                            </Button>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <></>
                    )}
                    <ProductChartSize options={options} data={datas} />
                  </CardContent>
                </CardFrist>
              </Grid>
            </ContainerTwo>
            <ContainerTwo container spacing={2}>
              <Grid xs={4}>
                <CardFrist>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      Out of Stock Products
                    </CardTwo>
                    <ScrollBox>
                      {productList
                        .filter((data) => data.quantity === 0)
                        .slice(0, 2)
                        .map((data) => (
                          <StockBox container>
                            <Grid item xs={2}>
                              <Avatar
                                src={ENDPOINTURLFORIMG + data.img}
                                variant="rounded"
                              ></Avatar>
                            </Grid>
                            <Grid item xs={7}>
                              {data.name}
                            </Grid>
                            <Grid item xs={3}>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  navigate(`/products/add?cid=${data._id}`)
                                }
                              >
                                Add
                              </Button>
                            </Grid>
                          </StockBox>
                        ))}

                      {isOn &&
                        productList
                          .filter((data) => data.quantity === 0)
                          .slice(3, 9999)
                          .map((data) => (
                            <StockBox container>
                              <Grid item xs={2}>
                                <Avatar
                                  src={ENDPOINTURLFORIMG + data.img}
                                  variant="rounded"
                                ></Avatar>
                              </Grid>
                              <Grid item xs={7}>
                                {data.name}
                              </Grid>
                              <Grid item xs={3}>
                                <Button
                                  variant="outlined"
                                  onClick={() =>
                                    navigate(`/products/add?cid=${data._id}`)
                                  }
                                >
                                  Add
                                </Button>
                              </Grid>
                            </StockBox>
                          ))}
                    </ScrollBox>

                    <ShowButton
                      variant="contained"
                      size="small"
                      onClick={toggleIsOn}
                    >
                      <ShowButtonText>
                        {isOn ? "View Less " : "View All "}
                      </ShowButtonText>
                    </ShowButton>
                  </CardContent>
                </CardFrist>
              </Grid>
              <Grid xs={4}>
                <CardFrist>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      Order Tracking
                    </CardTwo>
                    <OrderTrackingText>
                      Placed - {placeValue?.length}
                    </OrderTrackingText>
                    <BorderALinearProgress
                      variant="determinate"
                      value={(placeValue?.length * 100) / orderValue}
                    />
                    <OrderTrackingText>
                      Dispatched - {disValue?.length}
                    </OrderTrackingText>
                    <BorderBLinearProgress
                      variant="determinate"
                      value={(disValue?.length * 100) / orderValue}
                    />{" "}
                    <OrderTrackingText>
                      Received - {recValue?.length}
                    </OrderTrackingText>
                    <BorderCLinearProgress
                      variant="determinate"
                      value={(recValue?.length * 100) / orderValue}
                    />
                    <OrderTrackingText>
                      Cancel - {canValue?.length}
                    </OrderTrackingText>
                    <BorderDLinearProgress
                      variant="determinate"
                      value={(canValue?.length * 100) / orderValue}
                    />
                  </CardContent>
                </CardFrist>
              </Grid>
              <Grid xs={4}>
                <IncomeCard>
                  <CardContent>
                    <CardFive variant="h6" component="div">
                      Total Income
                    </CardFive>
                    <CardThree>
                      &#x20b9;{currencyFormat(orderTotalValue)}
                    </CardThree>
                  </CardContent>
                </IncomeCard>
                <ExpensesCard>
                  <CardContent>
                    <CardFive variant="h6" component="div">
                      Total Expenses
                    </CardFive>
                    <CardFour>
                      {/* &#x20b9; {currencyFormat(orderTotalValue)} */}
                      &#x20b9;{currencyFormat(235554)}
                    </CardFour>
                  </CardContent>
                </ExpensesCard>
              </Grid>
            </ContainerTwo>
            <ContainerTwo container spacing={2}>
              <Grid xs={8}>
                <CardFrist>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      New Orders
                    </CardTwo>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCellA>Invoice ID</TableCellA>
                          <TableCellB>Name</TableCellB>
                          <TableCellB>Price</TableCellB>
                          <TableCellB>Items</TableCellB>
                          <TableCellC>Status</TableCellC>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderList.slice(0, 4).map((row) => (
                          <TableRow key={row.name}>
                            <TableCellD component="th" scope="row">
                              {row.paymentId}
                            </TableCellD>
                            <TableCellD>
                              {row.userId.firstName + " " + row.userId.lastName}
                            </TableCellD>
                            <TableCellD>
                              &#x20b9;{currencyFormat(row.totalPrice)}
                            </TableCellD>
                            <TableCellD>{row.cartdetail.length}</TableCellD>
                            <TableCellD>{row.orderStatus}</TableCellD>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <ShowButton
                      variant="contained"
                      size="small"
                      onClick={() => navigate("/orders")}
                    >
                      <ShowButtonText>View All Orders</ShowButtonText>
                    </ShowButton>
                  </CardContent>
                </CardFrist>
              </Grid>
              <Grid xs={4}>
                <CardFrist>
                  <CardContent>
                    <CardTwo variant="h6" component="div">
                      Latest Products
                    </CardTwo>
                    {productList.slice(0, 4).map((data) => (
                      <StockBox container>
                        <Grid item xs={2}>
                          <Avatar
                            src={ENDPOINTURLFORIMG + data.img}
                            variant="rounded"
                          ></Avatar>
                        </Grid>
                        <Grid item xs={5}>
                          {data.name}
                        </Grid>
                        <Grid item xs={5}>
                          &#x20b9;{currencyFormat(data.discountPrice)}
                          {"/-"}
                          <br />
                          <ProductsText>
                            &#x20b9;{currencyFormat(data.price)}
                            {"/-"}
                          </ProductsText>
                        </Grid>
                      </StockBox>
                    ))}
                    <ShowButton
                      variant="contained"
                      size="small"
                      onClick={() => navigate("/products")}
                    >
                      <ShowButtonText>View Products</ShowButtonText>
                    </ShowButton>
                  </CardContent>
                </CardFrist>
              </Grid>
            </ContainerTwo>
          </>
        )}
      </MainBody>
    </>
  );
}
