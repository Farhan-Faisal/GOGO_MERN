import Form from "react-bootstrap/Form";
import configData from "../config.json";
function InputForm({ formTitle }) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      <Form.Label>{formTitle}</Form.Label>
      <Form.Control as="textarea" rows={3} />
    </Form.Group>
  );
}

export default InputForm;
