import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
 
const CampaignInfo = () => {
    return ( 
        <>
        <Row className="mb-3">
          <Form.Group controlId="information">
            <Form.Label>Tên chiến dịch <span className='filed-require'>*</span></Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder='Nhập tên chiến dịch'
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
                placeholder='Nhập mô tả'
                aria-describedby="inputGroupPrepend"
              />
            </InputGroup>
          </Form.Group>
        </>
     );
}

export default CampaignInfo;