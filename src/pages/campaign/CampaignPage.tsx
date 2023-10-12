import "./CampaignPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect, useRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { TAdsType, TSubCampaignsType } from "../../common/CampainTypes";
import UUID from "../../common/Uuid";
import Modal from "react-bootstrap/Modal";

export function CampaignPage() {
  const [validated, setValidated] = useState(false);
  const [subCampaignValue, setSubCampaign] = useState<any>([]);
  const [listAds, setListAds] = useState<TAdsType[]>([]);

  const [subCampaignName, setSubCampaignName] = useState<string>("");
  const [subCampaignStatus, setSubCampaignStatus] = useState<boolean>();

  const [adsName, setAdsName] = useState<any>([]);
  const [adsQuantity, setAdsQuantity] = useState<any>([]);

  const [listAdsDelete, setListAdsDelete] = useState<any>([]);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const [listSubCampaign, setListSubCampaign] = useState<TSubCampaignsType[]>([
    {
      id: UUID(),
      name: "Chiến dịch con 1",
      status: true,
      ads: [
        {
          id: UUID(),
          name: "Quảng cáo 1",
          quantity: 0,
        },
      ],
    },
  ]);

  const [show, setShow] = useState(false);
  const [titleMess, setTitleMess] = useState<any>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelectSubCampaign = (data: TSubCampaignsType) => {
    if (data) {
      setSubCampaign(data);
      setListAds(data?.ads);
    }
    if (data?.id !== subCampaignValue?.id) {
      setSubCampaignName(data?.name);
      setSubCampaignStatus(data?.status);
    }
    setListAdsDelete([]);
  };

  const handleAddSubCampaign = () => {
    const newSubCampaign = {
      id: UUID(),
      name: `Chiến dịch con ${listSubCampaign?.length + 1}`,
      status: true,
      ads: [
        {
          id: UUID(),
          name: `Quảng cáo 1`,
          quantity: 0,
        },
      ],
    };
    setListSubCampaign([...listSubCampaign, newSubCampaign]);
  };

  const handleAddAds = (idSubCampaign: string) => {
    if (idSubCampaign) {
      const newAds = {
        id: UUID(),
        name: `Quảng cáo ${listAds?.length + 1}`,
        quantity: 0,
      };
      const _listAds = [...listAds, newAds];

      setListAds(_listAds);

      const _listSubCampaign = [...listSubCampaign]?.map((sub) =>
        sub?.id === subCampaignValue?.id
          ? {
              ...sub,
              ads: _listAds,
            }
          : sub
      );
      setListSubCampaign(_listSubCampaign);
    }
  };

  const handleSubCampaignNameChange = (e: any) => {
    const newSubCampaignName = e.target;
    setSubCampaignName(newSubCampaignName.value);
  };

  const handleSubCampaignStatusChange = (e: any) => {
    const _subCampaignStatus = e.target;
    setSubCampaignStatus(_subCampaignStatus.checked);
  };

  useEffect(() => {
    const _listSubCampaign = [...listSubCampaign]?.map((sub) =>
      sub.id === subCampaignValue.id
        ? {
            ...sub,
            name: subCampaignName,
            status: subCampaignStatus,
          }
        : sub
    );
    setListSubCampaign(_listSubCampaign);
  }, [subCampaignName, subCampaignStatus]);

  const handleAdsNameChange = (e: any, id: string) => {
    const element = e.target;
    setAdsName({
      id: id,
      name: element.value,
    });
  };

  const handleAdsQuantityChange = (e: any, id: string) => {
    const element = e.target;
    const re = /^[0]*[.,]?[a-z]*?$/;
    if (e.target.value === "" || !re.test(e.target.value)) {
      setAdsQuantity({
        id: id,
        quantity: element.value,
      });
    }
  };

  useEffect(() => {
    const _newAdsValue = listAds?.map((ads: any) =>
      ads?.id === adsName?.id
        ? {
            ...ads,
            name: adsName.name,
          }
        : ads
    );
    setListAds(_newAdsValue);

    const _listSubCampaign = [...listSubCampaign]?.map((sub) =>
      sub?.id === subCampaignValue?.id
        ? {
            ...sub,
            ads: listAds?.map((ads: any) =>
              ads?.id === adsName?.id
                ? {
                    ...ads,
                    name: adsName.name,
                  }
                : ads
            ),
          }
        : sub
    );
    setListSubCampaign(_listSubCampaign);
  }, [adsName]);

  useEffect(() => {
    const _newAdsValue = listAds?.map((ads: any) =>
      ads?.id === adsQuantity?.id
        ? {
            ...ads,
            quantity: adsQuantity.quantity,
          }
        : ads
    );
    setListAds(_newAdsValue);

    const _listSubCampaign = [...listSubCampaign]?.map((sub) =>
      sub?.id === subCampaignValue?.id
        ? {
            ...sub,
            ads: listAds?.map((ads: any) =>
              ads?.id === adsQuantity?.id
                ? {
                    ...ads,
                    quantity: adsQuantity.quantity,
                  }
                : ads
            ),
          }
        : sub
    );
    setListSubCampaign(_listSubCampaign);
  }, [adsQuantity]);

  const handleDeleteAds = (adsId: string) => {
    const _newAds = listAds.filter((ads: TAdsType) => ads.id !== adsId);
    setListAds(_newAds);

    const _listSubCampaign = [...listSubCampaign]?.map((sub) =>
      sub?.id === subCampaignValue?.id
        ? {
            ...sub,
            ads: _newAds,
          }
        : sub
    );
    setListSubCampaign(_listSubCampaign);
  };

  const handleSelectAllAdsDelete = () => {
    if (!isCheckedAll) {
      setIsCheckedAll(true);
      const listAdsId = listAds?.map((ads: TAdsType) => ads?.id);
      setListAdsDelete(listAdsId);
    } else {
      setIsCheckedAll(false);
      setListAdsDelete([]);
    }
  };

  const handleSelectAdsDelete = (adsId: string) => {
    setListAdsDelete((prev: any) => {
      const isChecked = listAdsDelete.includes(adsId);
      if (isChecked) {
        return listAdsDelete.filter((item: string) => item !== adsId);
      } else {
        return [...prev, adsId];
      }
    });
  };

  const handleDeleteAllAdsSelected = () => {
    const _newAds = listAds?.filter(
      (ads: TAdsType) => !listAdsDelete.includes(ads?.id)
    );
    setListAds(_newAds);
    setListAdsDelete([]);

    const _listSubCampaign = [...listSubCampaign]?.map((sub) =>
      sub?.id === subCampaignValue?.id
        ? {
            ...sub,
            ads: _newAds,
          }
        : sub
    );
    setListSubCampaign(_listSubCampaign);
  };

  useEffect(() => {
    if (listAdsDelete?.length === listAds?.length) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }

    if (!listAdsDelete?.length) {
      setIsCheckedAll(false);
    }
  }, [listAdsDelete]);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;

    const _newAdsValue = listAds?.map((ads: any) =>
      ads.quantity <= 0
        ? {
            ...ads,
            quantity: "",
          }
        : ads
    );
    setListAds(_newAdsValue);

    if (form.checkValidity() === false || !listSubCampaign) {
      setValidated(true);
      setTitleMess(
        "Vui lòng điền đúng và đầy đủ thông tin và thực hiện validation với các trường bắt buộc nhập"
      );
      handleShow();
    }

    if (form) {
      const _listSubCampaign = listSubCampaign.map((sub) => {
        return {
          id: sub.id,
          name: sub.name,
          status: sub.status,
          ads: sub.ads.map((ads) => {
            return {
              id: ads.id,
              name: ads.name,
              quantity: ads.quantity,
            };
          }),
        };
      });

      const value = {
        campaign: {
          information: {
            id: UUID(),
            name: form.information.value,
            describe: form.subCampaigns.value,
          },
          subCampaigns: _listSubCampaign,
        },
      };
      setTitleMess(`Thành công: ${JSON.stringify(value)}`);
      handleShow();
      console.log(value);
    }
    event.stopPropagation();
    event.preventDefault();
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
                        (subCampaign: TSubCampaignsType) => {
                          return (
                            <Col lg="2">
                              <div
                                className={`campaign-tab shadow-sm ${
                                  subCampaignValue?.id === subCampaign?.id
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleSelectSubCampaign(subCampaign)
                                }>
                                <div className="campaign-name pt-2">
                                  <div
                                    className={`${
                                      subCampaign?.ads?.reduce(
                                        (accu: any, curr: any) => {
                                          return accu + curr.quantity;
                                        },
                                        0
                                      ) <= 0
                                        ? "dangerAds"
                                        : "backAds"
                                    }`}>
                                    {subCampaign?.name}
                                    <span
                                      className={
                                        subCampaign?.status === true
                                          ? "checkmark"
                                          : "checkmark-disable"
                                      }>
                                      <div className="checkmark_stem"></div>
                                      <div className="checkmark_kick"></div>
                                    </span>
                                  </div>
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
                              value={subCampaignName}
                              onChange={(e) => handleSubCampaignNameChange(e)}
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
                            checked={subCampaignStatus}
                            type="checkbox"
                            onChange={(e) => handleSubCampaignStatusChange(e)}
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
                              <input
                                onClick={() => {
                                  handleSelectAllAdsDelete();
                                }}
                                checked={isCheckedAll}
                                type="checkbox"
                              />
                            </th>
                            {listAdsDelete?.length <= 0 ? (
                              <>
                                <th>
                                  Tên quảng cáo
                                  <span className="filed-require">*</span>
                                </th>
                                <th>
                                  Số lượng{" "}
                                  <span className="filed-require">*</span>
                                </th>
                                <th>Action</th>
                              </>
                            ) : (
                              <div className="p-0">
                                <Button
                                  onClick={() => handleDeleteAllAdsSelected()}
                                  variant="danger">
                                  Delete All
                                </Button>
                              </div>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {listAds?.map((ads: TAdsType) => {
                            return (
                              <tr>
                                <td>
                                  <input
                                    checked={listAdsDelete.includes(ads?.id)}
                                    onChange={() =>
                                      handleSelectAdsDelete(ads?.id)
                                    }
                                    type="checkbox"
                                  />
                                </td>
                                <td>
                                  <Form.Group controlId="adsName">
                                    <InputGroup hasValidation>
                                      <Form.Control
                                        type="text"
                                        aria-describedby="inputGroupPrepend"
                                        value={ads?.name}
                                        onChange={(e) =>
                                          handleAdsNameChange(e, ads?.id)
                                        }
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
                                        value={ads?.quantity}
                                        onChange={(e) =>
                                          handleAdsQuantityChange(e, ads?.id)
                                        }
                                        required
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Dữ liệu không hợp lệ
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                  </Form.Group>
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleDeleteAds(ads?.id)}>
                                    Delete
                                  </Button>
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
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>{titleMess}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
