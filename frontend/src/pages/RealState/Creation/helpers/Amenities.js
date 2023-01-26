import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

const Amenities = ({
  pool,
  setPool,
  elevator,
  setElevator,
  airConditioning,
  setAirConditioning,
  parking,
  setParking,
  internet,
  setInternet,
  security,
  setSecurity,
  fireplace,
  setFireplace,
  garden,
  setGarden,
  guestWC,
  setGuestWC,
  storeRoom,
  setStoreRoom,
  pets,
  setPets,
  gym,
  setGym,
  laundry,
  setLaundry,
  other,
  setOther,
}) => {
  return (
    <Row className='overflow-scroll'>
      <Table striped bordered hover variant='light'>
        <tbody>
          <tr>
            <td>
              <Form.Check
                label='إمتلاك حيوانات أليفة'
                inline
                type='checkbox'
                checked={pets}
                onChange={(e) => setPets(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='أخرى'
                inline
                type='checkbox'
                checked={other}
                onChange={(e) => setOther(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='مدفأة'
                inline
                type='checkbox'
                checked={fireplace}
                onChange={(e) => setFireplace(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='حمام سباحة'
                inline
                type='checkbox'
                checked={pool}
                onChange={(e) => setPool(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='مكيف'
                inline
                type='checkbox'
                checked={airConditioning}
                onChange={(e) => setAirConditioning(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='موقف سيارات'
                inline
                type='checkbox'
                checked={parking}
                onChange={(e) => setParking(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='إنترنت'
                inline
                type='checkbox'
                checked={internet}
                onChange={(e) => setInternet(e.target.checked)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Form.Check
                label='حمام الضيوف'
                inline
                type='checkbox'
                checked={guestWC}
                onChange={(e) => setGuestWC(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='أمن وحراسة'
                inline
                type='checkbox'
                checked={security}
                onChange={(e) => setSecurity(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='حديقة'
                inline
                type='checkbox'
                checked={garden}
                onChange={(e) => setGarden(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='مصعد كهربائى'
                inline
                type='checkbox'
                checked={elevator}
                onChange={(e) => setElevator(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='غرفة تخزين'
                inline
                type='checkbox'
                checked={storeRoom}
                onChange={(e) => setStoreRoom(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='غرفة غسيل الملابس'
                inline
                type='checkbox'
                checked={laundry}
                onChange={(e) => setLaundry(e.target.checked)}
              />
            </td>
            <td>
              <Form.Check
                label='صالة ألعاب رياضية'
                inline
                type='checkbox'
                checked={gym}
                onChange={(e) => setGym(e.target.checked)}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};

export default Amenities;
