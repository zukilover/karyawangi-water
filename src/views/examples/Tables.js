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
import { useContext, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Input,
  Col,
  CardBody,
  CardTitle
} from "reactstrap";
import { residences, AppContext } from "store";
// core components

const data = residences

const TableRow = ({ children, defStart }) => {
  const [start, setStart] = useState(defStart)
  const [end, setEnd] = useState(defStart)
  const [appState, setAppState] = useContext(AppContext)

  const onUpdateStart = async (value, no) => {
    setStart(value)
    await setAppState({
      type: 'updateInitialWaterUsage',
      start: value ? parseInt(value) : 0,
      no,
    })
  }

  const onUpdateEnd = async (value, no) => {
    setEnd(value)
    await setAppState({
      type: 'updateTotalWaterUsage',
      usage: value ? Math.max(start, parseInt(value)) : 0,
      no,
    })
  }
  const _totalWaterUsage = useMemo(() => {
    return Object.values(appState.totalWaterUsage).reduce((total, u) => total += u, 0)
  }, [appState.totalWaterUsage])
  const _totalInitialUsage = useMemo(() => {
    return Object.values(appState.initialWaterUsage).reduce((total, u) => total += u, 0)
  }, [appState.initialWaterUsage])
  const totalToPay = useMemo(() => {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const totalUsage = (appState.startKwh - appState.endKwh)
    const totalPay = totalUsage * appState.pricePerKwh
    const usage = (Math.max(end, start) - start) / (_totalWaterUsage - _totalInitialUsage)
    const total = Math.max(0, Math.round(usage * totalPay))
    return !isNaN(total)
      ? numberWithCommas(total)
      : 0
  }, [
    appState.startKwh,
    appState.endKwh,
    appState.pricePerKwh,
    _totalWaterUsage,
    _totalInitialUsage,
    start,
    end,
  ])

  return (
    <>
      <tr>
        <th scope="row">
          <Media className="align-items-center">
            <Media>
              <span className="mb-0 text-sm">
                { children }
              </span>
            </Media>
          </Media>
        </th>
        <td>
          <Input defaultValue={start} onChange={e => onUpdateStart(e?.target?.value, children)} placeholder="0" type="number" />
        </td>
        <td>
          <Input defaultValue={end} onChange={e => onUpdateEnd(e?.target?.value, children)} placeholder="0" type="number" />
        </td>
      </tr>
      <tr>
        <td colSpan={3}>
          <span className="h2 font-weight-bold mb-0">
            { children } : Rp {totalToPay}
          </span>
        </td>
      </tr>
    </>
  )
}

const Tables = () => {
  const [appState] = useContext(AppContext)
  const _totalWaterUsage = useMemo(() => {
    return Object.values(appState.totalWaterUsage).reduce((total, u) => total += u, 0)
  }, [appState.totalWaterUsage])
  const _totalInitialUsage = useMemo(() => {
    return Object.values(appState.initialWaterUsage).reduce((total, u) => total += u, 0)
  }, [appState.initialWaterUsage])
  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
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
                      Meteran air awal - total semua
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      {_totalInitialUsage}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      <i className="fas fa-hourglass" />
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
                      Total penggunaan air: <br />
                      <small>(untuk jadi acuan bulan berikutnya)</small>
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                      {_totalWaterUsage}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-hourglass-half" />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Rincian pembayaran</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Meteran air awal</th>
                    <th scope="col">Meteran air akhir</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((data) => {
                      return (
                        <TableRow defStart={data.start} key={data.no}>{data.no}</TableRow>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
