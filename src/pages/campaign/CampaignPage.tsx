import "./CampaignPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TSubCampaignsType } from "../../common/CampainTypes";

function CampaignPage() {
  const [validated, setValidated] = useState(false);
  const [subCampaignValue, setSubCampaignValue] = useState<any>([]);
  const [listAds, setListAds] = useState<any>();
  const [listSubCampaign, setListSubCampaign] = useState<TSubCampaignsType[]>([
    {
      id: 1,
      name: "Chiến dịch con 1",
      status: true,
      ads: [
        {
          id: 1,
          name: "Quảng cáo 1",
          quantity: 0,
        },
      ],
    },
  ]);

  const handleSelectAds = (data: TSubCampaignsType) => {
    if (data) {
      setSubCampaignValue(data);
      setListAds(data?.ads);
    }
  };

  const handleAddSubCampaign = () => {
    const newSubCampaign = {
      id: listSubCampaign?.length + 1,
      name: `Chiến dịch con ${listSubCampaign?.length + 1}`,
      status: true,
      ads: [
        {
          id: 1,
          name: `Quảng cáo 1`,
          quantity: 0,
        },
      ],
    };
    setListSubCampaign([
      ...listSubCampaign,
      newSubCampaign,
    ]);
  };

  const handleAddAds = (idSubCampaign: number) => {
    if (idSubCampaign) {
      const newAds = {
        id: listAds?.length + 1,
        name: `Quảng cáo ${listAds?.length + 1}`,
        quantity: 0,
      };
      setListAds([...listAds, newAds]);

      const newListSubCampaign = listSubCampaign?.map(
        (data: any) => {
          if (data?.id === idSubCampaign) {
            return {
              ...data,
              ads: listAds,
            };
          }
          return data;
        }
      );
      setListSubCampaign(newListSubCampaign);
    }
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    }
    if (form) {
      const value = {
        information: {
          name: "",
          describe: "",
        },
        subCampaigns: [
          {
            name: "",
            status: false,
          },
        ],
        ads: [
          {
            name: "",
            quantity: "",
          },
        ],
      };
    }
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <div className="pt-4">
        <div className="border-b px-4">
          <div className="campaign-submit">
            <Button
              form="campaign-form"
              className="mx-0 my-2"
              variant="primary"
              type="submit">
              SUBMIT
            </Button>
          </div>
        </div>
        <div className="p-4">
          <Form
            id="campaign-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="info" className="mb-3">
              <Tab eventKey="info" title="THÔNG TIN">
                <Row className="mb-3">
                  <Form.Group controlId="information">
                    <Form.Label>
                      Tên chiến dịch <span className="filed-require">*</span>
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên chiến dịch"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Dữ liệu không hợp lệ
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Form.Group controlId="subCampaigns">
                  <Form.Label>Mô tả</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mô tả"
                      aria-describedby="inputGroupPrepend"
                    />
                  </InputGroup>
                </Form.Group>
              </Tab>
              <Tab eventKey="campaign-child" title="CHIẾN DỊCH CON">
                <div className="campaign-wrapper">
                  <div className="py-2">
                    <Row className="campaign-child">
                      <Col lg="1">
                        <Button
                          className="add-campaign"
                          onClick={() => handleAddSubCampaign()}>
                          <div className="add-campaign-plus">+</div>
                        </Button>
                      </Col>
                      {listSubCampaign?.map(
                        (subCampaign: any) => {
                          return (
                            <Col lg="2">
                              <div
                                className={`campaign-tab shadow-sm ${
                                  subCampaign?.id === subCampaignValue?.id
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() => handleSelectAds(subCampaign)}>
                                <div className="campaign-name">
                                  <div>{subCampaign?.name}</div>
                                  <span
                                    className={
                                      subCampaign.status === true
                                        ? "checkmark"
                                        : "checkmark-disable"
                                    }>
                                    <div className="checkmark_stem"></div>
                                    <div className="checkmark_kick"></div>
                                  </span>
                                </div>
                                <span>
                                  {subCampaign?.ads?.reduce(
                                    (accu: any, curr: any) => {
                                      return accu + curr.quantity;
                                    },
                                    0
                                  )}
                                </span>
                              </div>
                            </Col>
                          );
                        }
                      )}
                    </Row>
                  </div>
                  <div className="py-2">
                    <Row>
                      <Col lg="8">
                        <Form.Group controlId="subCampaignsName">
                          <Form.Label>
                            Tên chiến dịch con{" "}
                            <span className="filed-require">*</span>
                          </Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              aria-describedby="inputGroupPrepend"
                              value={subCampaignValue?.name}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Dữ liệu không hợp lệ
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                      <Col lg="4">
                        <div className="campaign-check">
                          <input
                            checked={subCampaignValue?.status}
                            type="checkbox"
                            id="subCampaignsStatus"
                          />
                          <span>Đang hoạt động</span>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <h4>DANH SÁCH QUẢNG CÁO</h4>
                  <div>
                    <div className="ads-group">
                      <div className="ads-group-btn">
                        <Button
                          onClick={() => handleAddAds(subCampaignValue?.id)}
                          variant="outline-primary">
                          + THÊM
                        </Button>
                      </div>
                      <Table responsive="sm">
                        <thead>
                          <tr>
                            <th>
                              <input type="checkbox" />
                            </th>
                            <th>
                              Tên quảng cáo{" "}
                              <span className="filed-require">*</span>
                            </th>
                            <th>
                              Số lượng <span className="filed-require">*</span>
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listAds?.map((elm: any) => {
                            return (
                              <tr>
                                <td>
                                  <input type="checkbox" />
                                </td>
                                <td>
                                  <Form.Group controlId="adsName">
                                    <InputGroup hasValidation>
                                      <Form.Control
                                        type="text"
                                        aria-describedby="inputGroupPrepend"
                                        value={elm?.name}
                                        required
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Dữ liệu không hợp lệ
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group controlId="adsQuantity">
                                    <InputGroup hasValidation>
                                      <Form.Control
                                        type="number"
                                        aria-describedby="inputGroupPrepend"
                                        value={elm?.quantity}
                                        required
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Dữ liệu không hợp lệ
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                  </Form.Group>
                                </td>
                                <td>
                                  <Button variant="danger">Delete</Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CampaignPage;
