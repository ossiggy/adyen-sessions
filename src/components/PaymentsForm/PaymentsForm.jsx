import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const PaymentsForm = props => {
  const [input, setInput] = useState({
    value: 25,
    currency: "EUR",
    countryCode: "NL"
  })

  const handleChange = e => {
    setInput(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Form onSubmit={e => props.handleSubmit(e, input)}>
      <FormGroup>
        <Label for="value">Amount Value</Label>
        <Input type="number" name="value" placeholder="25" onChange={e => handleChange(e)}></Input>
      </FormGroup>
      <FormGroup>
        <Label for="currency">Currency</Label>
        <Input type="select" name="currency" onChange={e => handleChange(e)}>
          <option value="EUR" defaultValue>EUR</option>
          <option value="USD">USD</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="countryCode">Country Code</Label>
        <Input name="countryCode" placeholder="NL" onChange={e => handleChange(e)}></Input>
      </FormGroup>
      <div style={{"marginTop": "10px", "textAlign": "right"}}>
        <Button type="submit" color="primary" >Submit</Button>
      </div>
    </Form>
  )
};

export default PaymentsForm;