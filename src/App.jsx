import { useState } from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { Header, Initialize, PaymentsForm} from './components';

const App = () => {
  const [options, setOptions] = useState({
    value: 25,
    currency: "EUR",
    countryCode: "NL"
  });

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    setOptions(prevState => ({
      ...prevState,
      ...formData
    }));
  };
  
  let dropinUi;
  
  if (Object.keys(options).length) {
    dropinUi = <Col><Initialize options={options}/></Col>
  }

  return (
    <div id="app">
      <Header />
      <Container className="main">
        <Jumbotron><h1 className="display-4">Drop-in Sessions Demo</h1></Jumbotron>
        <Row>
          <Col>
            <PaymentsForm handleSubmit={handleSubmit}/>
          </Col>
          {dropinUi}
        </Row>
      </Container>
    </div>

  );
}

export default App;
