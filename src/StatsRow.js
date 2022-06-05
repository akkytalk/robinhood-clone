import React, { useState } from "react";
import StockChart from "./stock.svg";
import { db } from "./firebase";
// import * as Yup from "yup";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Row,
//   Col,
//   InputGroup,
// } from "reactstrap";
// import { Form, Formik } from "formik";
// import { TextField } from "@material-ui/core";

function StatsRow(props) {
  //   console.log(props, "what is in props here?");
  // (currentPrice - openPrice)/openPrice
  const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;

  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);

  // const handleSubmit = (values, { setSubmitting }) => {
  //   console.log("values in Group:", values);
  //   setSubmitting(true);

  //   let user = {
  //     group_name: values.group_name,
  //     shares: values.shares,
  //   };

  //   return;
  // };

  const buyStock = () => {
    db.collection("myStocks")
      .where("ticker", "==", props.name)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            db.collection("myStocks")
              .doc(doc.id)
              .update({
                shares: doc.data().shares + 1,
              });
          });
        } else {
          db.collection("myStocks").add({
            ticker: props.name,
            shares: 1,
          });
        }
      });
  };
  return (
    <>
      <div className="row" onClick={buyStock}>
        <div className="row__intro">
          <h1>{props?.name}</h1>
          <p>{props.volume && props.volume + " shares"}</p>
        </div>
        <div className="row__chart">
          <img src={StockChart} height={16} alt="" />
        </div>
        <div className="row__numbers">
          <p className="row__price">{props.price}</p>
          <p
            className={`${
              Number(percentage) > 0
                ? "row__percentage_success"
                : "row__percentage_danger"
            }`}
          >
            {" "}
            {Number(percentage).toFixed(2)}%
          </p>
        </div>
      </div>
      {/* <Modal className="modal-md" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="d-flex align-items-center">
          Add New Share of {props.name}
        </ModalHeader>
        <ModalBody className="">
          <Formik
            initialValues={{
              group_name: props.name ?? "",
              shares: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object().shape({
              shares: Yup.string().required("required"),
            })}
          >
            {(formProps) => (
              <Form>
                <Row className="form-group">
                  <Col md={12}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="group_name"
                        label="Ticker"
                        name="group_name"
                        disabled
                        value={formProps.values.group_name}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.group_name &&
                          Boolean(formProps.errors.group_name)
                        }
                        helperText={
                          formProps.touched.group_name &&
                          formProps.errors.group_name
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col md={12}>
                    <InputGroup>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="shares"
                        label="shares"
                        name="shares"
                        type="number"
                        value={formProps.values.shares}
                        onChange={formProps.handleChange}
                        error={
                          formProps.touched.shares &&
                          Boolean(formProps.errors.shares)
                        }
                        helperText={
                          formProps.touched.shares && formProps.errors.shares
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <Col md={4}>
                    <Button type="reset" color="danger" block>
                      <b>Reset</b>
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button
                      type="submit"
                      disabled={formProps.isSubmitting}
                      color="primary"
                      block
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal> */}
    </>
  );
}

export default StatsRow;
