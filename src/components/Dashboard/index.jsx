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
import { Button } from "@mui/material";
import { nFormatter, randomColor } from "../../utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardList } from "../../js/actions";
import { dashboardDataHandler } from "../../service/Auth.Service";

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

  const dispatch = useDispatch();
  useEffect(() => {
    getDashboardData(
      moment().startOf("week").format("YYYY-MM-DD"),
      moment().endOf("week").format("YYYY-MM-DD"),
      0
    );
  }, []);
  const dashboardList = useSelector((state) => state?.dashboard.list);
  console.log("DASHBOARD", dashboardList);
  useEffect(() => {
    getDashboardAllData(value);
  }, [dashboardList, value]);

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
    labels: OrdersbyProducts?.slice(0, 10).map((data) => data.name),
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
        },
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
      },
      y: {
        grid: {
          display: false,
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
        borderColor: "rgb(26, 26, 64)",
        backgroundColor: "rgba(26, 26, 64,0.2)",
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
      // const response = await dashboardDataHandler({
      //   startDate: startDate,
      //   endDate: endDate,
      // });
      // console.log(response, newValue);
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
          <Grid xs={5}>
            <CardFrist>
              <CardContent>
                <CardTwo variant="h6" component="div">
                  Orders by Products
                </CardTwo>
                <DoughnutSize options={doughnutOptions} data={data} />
              </CardContent>
            </CardFrist>
          </Grid>
          <Grid xs={7}>
            <CardFrist>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid xs={4}>
                    <CardContent>
                      <CardTwo variant="h6" component="div">
                        Total Sales
                      </CardTwo>
                    </CardContent>
                  </Grid>
                  <Grid xs={8}>
                    <Box sx={{ width: "100%" }}>
                      <TabMain value={value} onChange={handleChange} centered>
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
      </MainBody>
    </>
  );
}
