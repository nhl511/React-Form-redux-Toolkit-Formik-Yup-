import {
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Radio,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import {
  TextField,
  CheckboxWithLabel,
  Select,
  RadioGroup,
  Checkbox,
} from "formik-material-ui";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import { Field, Form, Formik } from "formik";

import createNumberMask from "text-mask-addons/dist/createNumberMask";

import React, { useState } from "react";
import ProductsData from "../data/ListOfProducts";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  updateProductName,
  updateProductPrice,
  updateProductNation,
  updateProductSex,
  updateProductStyle,
  updateProductImage,
} from "../features/Products";
import { object, number, string, boolean, array } from "yup";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MuiAlert from "@mui/material/Alert";

const defaultMaskOptions = {
  prefix: "",
  suffix: " VND",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};
const CurrencyInput = ({ maskOptions, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return <MaskedInput mask={currencyMask} {...inputProps} />;
};

CurrencyInput.defaultProps = {
  inputMode: "numeric",
  maskOptions: {},
};

CurrencyInput.propTypes = {
  inputmode: PropTypes.string,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
  }),
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = () => {
    onClose();
  };
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Product() {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [openModal5, setOpenModal5] = useState(false);
  const [openModal6, setOpenModal6] = useState(false);

  const handleClose = () => (
    setOpenModal2(false),
    setOpenModal1(false),
    setOpenModal3(false),
    setOpenModal4(false),
    setOpenModal5(false),
    setOpenModal6(false)
  );
  const [modalData, setModalData] = useState(null);
  const productList = useSelector((state) => state.products.value);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlert2, setOpenAlert2] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState("");

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
    setOpenAlert2(false);

  };
  const handleCloseDialog = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <TableContainer component={Paper}>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cập nhật thành công!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlert2}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Xóa nước hoa thành công!
        </Alert>
      </Snackbar>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Bạn có chắc chắn muốn xóa sản phẩm này không?</DialogTitle>
        <Grid container p={2}>
          <Button
            size="small"
            color="error"
            onClick={() => (
              setOpen(false),
              dispatch(deleteProduct({ id: modalData.id })),
              setOpenAlert2(true)
            )}
          >
            Có
          </Button>
          <Button size="small" onClick={() => setOpen(false)}>
            Không
          </Button>
        </Grid>
      </Dialog>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleCloseDialog}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Tên sản phẩm</TableCell>
            <TableCell align="right">Xuất xứ</TableCell>
            <TableCell align="right">Dành cho</TableCell>
            <TableCell align="right">Phong cách</TableCell>
            <TableCell align="right">Giá tiền</TableCell>
            <TableCell align="right">Hình ảnh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((product) => (
            <TableRow
              key={product.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.id}
              </TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="text"
                  size="medium"
                  onClick={() => {
                    setModalData(product);
                    setOpenModal1(true);
                  }}
                >
                  {product.name}
                </Button>{" "}
              </TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="text"
                  size="medium"
                  onClick={() => {
                    setModalData(product);
                    setOpenModal3(true);
                  }}
                >
                  {product.nation}
                </Button>{" "}
              </TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="text"
                  size="medium"
                  onClick={() => {
                    setModalData(product);
                    setOpenModal4(true);
                  }}
                >
                  {product.sex}
                </Button>{" "}
              </TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="text"
                  size="medium"
                  onClick={() => {
                    setModalData(product);
                    setOpenModal5(true);
                  }}
                >
                  {product.style}
                </Button>{" "}
              </TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="text"
                  size="medium"
                  onClick={() => {
                    setModalData(product);
                    setOpenModal2(true);
                  }}
                >
                  {product.price}
                </Button>{" "}
              </TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="text"
                  size="medium"
                  onClick={() => {
                    setModalData(product);
                    setOpenModal6(true);
                  }}
                >
                  <img width="120" src={product.img} />
                </Button>{" "}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="text"
                  size="large"
                  startIcon={<DeleteIcon />}
                  color="error"
                  // onClick={() => {
                  //   dispatch(deleteProduct({ id: product.id }));
                  // }}
                  onClick={() => {
                    setOpen(true);
                    setModalData(product);
                  }}
                ></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={openModal1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={
              {
                // productName: "",
                // price: modalData.price,
                // selection: modalData.nation,
                // sex: modalData.sex,
                // style: modalData.style,
              }
            }
            validationSchema={object({
              productName: string()
                .required("You need to provide a name")
                .min(2, "Your full name needs to be at lease 2 characters")
                .max(10, "Your name can not be bigger than 10 characters"),
            })}
            onSubmit={async (values) => {
              dispatch(
                updateProductName({
                  id: modalData.id,
                  name: values.productName,
                })
              );
              setOpenModal1(false);
              setOpenAlert(true);
            }}
          >
            {({ values, errors, isSubmitting, handleChange }) => (
              <Form autoComplete="off">
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Field
                      fullWidth
                      name="productName"
                      component={TextField}
                      label="Tên nước hoa"
                    />
                  </Grid>

                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        open={openModal2}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{}}
            validationSchema={object({
              price: string().required("You need to provide price"),
            })}
            onSubmit={async (values) => {
              dispatch(
                updateProductPrice({
                  id: modalData.id,
                  price: values.price,
                })
              );
              setOpenModal2(false);
              setOpenAlert(true);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form autoComplete="off">
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Field
                      fullWidth
                      name="price"
                      component={TextField}
                      InputProps={{
                        inputComponent: CurrencyInput,
                      }}
                      label="Giá bán"
                    />
                  </Grid>

                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        open={openModal3}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{}}
            validationSchema={object({
              selection: string().required("You need to provide na"),
            })}
            onSubmit={async (values) => {
              dispatch(
                updateProductNation({
                  id: modalData.id,
                  nation: values.selection,
                })
              );
              setOpenModal3(false);
              setOpenAlert(true);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form autoComplete="off">
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Field name="selection" component={Select} label="Xuất xứ">
                      {/* <MenuItem value="Chọn xuất xứ">
                      <em>Chọn xuất xứ</em>
                    </MenuItem> */}
                      <MenuItem value="Anh">Anh</MenuItem>
                      <MenuItem value="Ả Rập">Ả Rập</MenuItem>
                      <MenuItem value="Mỹ">Mỹ</MenuItem>
                      <MenuItem value="Pháp">Pháp</MenuItem>
                      <MenuItem value="Ý">Ý</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        open={openModal4}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{}}
            validationSchema={object({
              sex: string().required("You need to provide sex"),
            })}
            onSubmit={async (values) => {
              dispatch(
                updateProductSex({
                  id: modalData.id,
                  sex: values.sex,
                })
              );
              setOpenModal4(false);
              setOpenAlert(true);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form autoComplete="off">
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Dành cho
                    </FormLabel>
                    <Field name="sex" component={RadioGroup} row>
                      <FormControlLabel
                        control={<Radio />}
                        label="Nữ"
                        value="Nữ"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Nam"
                        value="Nam"
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label="Trung tính"
                        value="Trung tính"
                      />
                    </Field>
                  </Grid>

                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Modal
        open={openModal5}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{}}
            validationSchema={object({})}
            onSubmit={async (values) => {
              dispatch(
                updateProductStyle({
                  id: modalData.id,
                  style: values.style,
                })
              );
              setOpenModal5(false);
              setOpenAlert(true);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form autoComplete="off">
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Phong cách
                      </FormLabel>

                      <Field
                        fullWidth
                        name="style"
                        type="checkbox"
                        component={CheckboxWithLabel}
                        value="Sang trọng, "
                        Label={{ label: "Sang trọng" }}
                      />
                      <Field
                        fullWidth
                        name="style"
                        type="checkbox"
                        component={CheckboxWithLabel}
                        value="Quyến rũ, "
                        Label={{ label: "Quyến rũ" }}
                      />
                      <Field
                        fullWidth
                        name="style"
                        type="checkbox"
                        value="Ngọt ngào, "
                        component={CheckboxWithLabel}
                        Label={{ label: "Ngọt ngào" }}
                      />
                    </Box>
                  </Grid>

                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
      <Modal
        open={openModal6}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{}}
            validationSchema={object({})}
            onSubmit={async (values) => {
              dispatch(
                updateProductImage({
                  id: modalData.id,
                  img: URL.createObjectURL(selectedImage),
                })
              );
              setSelectedImage(null);
              setOpenAlert(true);
              setOpenModal6(false);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form autoComplete="off">
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    {selectedImage && (
                      <div>
                        <img
                          name="myimg"
                          alt="not fount"
                          width={"100px"}
                          src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        {/* <button onClick={()=>setSelectedImage(null)}>Remove</button> */}
                      </div>
                    )}
                    <br />

                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<AddPhotoAlternateIcon />}
                      size="small"
                    >
                      Chọn hình ảnh
                      <input
                        accept="image/*"
                        type="file"
                        name="img"
                        hidden
                        onChange={(event) => {
                          setSelectedImage(event.target.files[0]);
                        }}
                      />
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                    >
                      Cập nhật
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </TableContainer>
  );
}
