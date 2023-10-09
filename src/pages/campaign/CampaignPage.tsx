import "./CampaignPage.css";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import CampaignInfo from "../../components/CampaginInfo";
import CampaignChild from "../../components/CampainChild";

function CampaignPage() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: any) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        setValidated(true);
      }
      if(form) {
        const value = {
          information: {
            name: '',
            describe: '',
          },
          subCampaigns:[{
            name: '',
            status: false,
          }],
          ads:[{
            name: '',
            quantity: ''
          }]
        }
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
            type="submit"
            >
                SUBMIT
            </Button>
          </div>
        </div>
        <div className="p-4">
          <Form id="campaign-form" noValidate validated={validated} onSubmit={handleSubmit}>
            <Tabs
                defaultActiveKey="info"
                className="mb-3">
                <Tab eventKey="info" title="THÔNG TIN">
                    <CampaignInfo/>
                </Tab>
                <Tab eventKey="campaign-child" title="CHIẾN DỊCH CON">
                    <CampaignChild/>
                </Tab>
                </Tabs>
            </Form>
        </div>
      </div>
    </>
  );
}

export default CampaignPage;
