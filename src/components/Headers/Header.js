/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useContext } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, Input } from "reactstrap";
import { AppContext } from "store";
import Tables from "views/examples/Tables";
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const Header = () => {
  const [appState, setAppState] = useContext(AppContext)
  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Meteran PLN awal - pusat
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          <Input defaultValue={appState.startKwh} onChange={e => setAppState({
                            type: 'updateStartKwh',
                            payload: e?.target?.value,
                          })} placeholder="0" type="number" />
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Meteran PLN akhir - pusat
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        <Input defaultValue={appState.endKwh} onChange={e => setAppState({
                            type: 'updateEndKwh',
                            payload: e?.target?.value,
                          })} placeholder="0" type="number" />
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total penggunaan listrik
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {(appState.startKwh - appState.endKwh).toFixed(1)} kwh Rp ({numberWithCommas(Math.round((appState.startKwh - appState.endKwh) * appState.pricePerKwh))})
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-bolt" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Harga token per Kwh
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                        <Input defaultValue={appState.pricePerKwh} onChange={e => setAppState({
                            type: 'updatePricePerKwh',
                            payload: e?.target?.value,
                          })} placeholder="0" type="number" />
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-coins" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Tables />
    </>
  );
};

export default Header;
