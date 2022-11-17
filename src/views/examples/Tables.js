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
  Input
} from "reactstrap";
import { AppContext } from "store";
// core components

const data = [{
  no: 'D2',
  start: 220,
}, {
  no: 'D3',
  start: 44,
}, {
  no: 'D4',
  start: 200,
}, {
  no: 'D5',
  start: 307,
}, {
  no: 'D6',
  start: 65,
}]

const TableRow = ({ children, defStart }) => {
  const [start, setStart] = useState(defStart)
  const [end, setEnd] = useState(0)
  const [appState] = useContext(AppContext)
  const totalToPay = useMemo(() => {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    const totalUsage = (appState.endKwh - appState.startKwh)
    const totalPay = totalUsage * appState.pricePerKwh
    const usage = (end - start) / totalUsage
    const total = Math.max(0, Math.round(usage * totalPay))
    return !isNaN(total)
      ? numberWithCommas(total)
      : 0
  }, [
    appState.startKwh,
    appState.endKwh,
    appState.pricePerKwh,
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
          <Input defaultValue={start} onChange={e => setStart(e?.target?.value)} placeholder="0" type="number" />
        </td>
        <td>
          <Input defaultValue={end} onChange={e => setEnd(e?.target?.value)} placeholder="0" type="number" />
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
  return (
    <>
      {/* Page content */}
      <Container className="mt--7" fluid>
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
                    <th scope="col">Meteran awal</th>
                    <th scope="col">Meteran akhir</th>
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
