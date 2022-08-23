import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { productHandlerData } from "../../service/Auth.Service";
import { listBody, ENDPOINTURLFORIMG } from "../../utils/Helper";
import { Container, TableGrid, ImageAvatar } from "./Products.style";
const Products = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProductData(); // eslint-disable-next-line
  }, [page]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const response = await productHandlerData(
        listBody({ where: null, perPage: 10, page: page })
      );
      if (response.success) {
        // console.log(response.list[7])
        if (totalCount === 0) {
          setTotalCount(response.count);
        }
        setProductData(response?.list);
      } else {
        setProductData([]);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(productData);

  const columns = [
    {
      field: "img",
      headerName: <Typography variant="h2">Image</Typography>,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <ImageAvatar
          variant="rounded"
          alt="Product image"
          src={ENDPOINTURLFORIMG + params.value}
          onClick={() => console.log(params)}
        />
      ),
    },
  ];

  return (
    <Container>
      <TableGrid // its material UI DataGrid to show the category information in a  table structure
        autoHeight={true}
        rows={productData}
        columns={columns}
        loading={loading}
        pageSize={10}
        rowCount={totalCount}
        rowsPerPageOptions={[10]}
        checkboxSelection={true}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        pagination
        paginationMode="server"
        onPageChange={(page, detail) => {
          setPage(page + 1);
        }}
        // onSelectionModelChange={(itm) => console.log(itm)}
        Property="RowHeaderWidth"
      />
    </Container>
  );
};

export default Products;
