import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CampaignChild = () => {
  return (
    <>
      <div className="campaign-wrapper">
        <div className="">
          <Row className="campaign-child">
            <Col lg="1">
              <Button className="add-campaign">
                <div className="add-campaign-plus">+</div>
              </Button>
            </Col>
            <Col lg="2">
              <div className="campaign-tab shadow-sm active">
                <div className="campaign-name">
                  <div>Chiến dịch con 1</div>
                  <span className="checkmark">
                    <div className="checkmark_stem"></div>
                    <div className="checkmark_kick"></div>
                  </span>
                </div>
                <span>0</span>
              </div>
            </Col>
          </Row>
        </div>
        <div className="py-4">
          <Row>
            <Col lg="8">
              <Form.Group controlId="subCampaignsName">
                <Form.Label>
                  Tên chiến dịch con <span className="filed-require">*</span>
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    value="Chiến dịch con 1"
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
                <input type="checkbox" id="subCampaignsStatus" />
                <span>Đang hoạt động</span>
              </div>
            </Col>
          </Row>
        </div>
        <h4>DANH SÁCH QUẢNG CÁO</h4>
        <div>
          <div className="ads-group">
            <th className="ads-group-btn">
                <Button variant="outline-primary">+ THÊM</Button>
            </th>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>
                    Tên quảng cáo <span className="filed-require">*</span>
                  </th>
                  <th>
                    Số lượng <span className="filed-require">*</span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <Form.Group controlId="subCampaignsName">
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          value="Chiến dịch con 1"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Dữ liệu không hợp lệ
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="subCampaignsName">
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          aria-describedby="inputGroupPrepend"
                          value="0"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Dữ liệu không hợp lệ
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </td>
                  <td>Delete</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignChild;
