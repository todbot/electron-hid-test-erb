import HID from 'node-hid';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';
import './App.css';

const devices = HID.devices();

devices.sort((a, b) => b.vendorId - a.vendorId || b.productId - a.productId);

/* eslint-disable */
function decimalToHex(decimal: number, chars: number) {
  return (decimal + Math.pow(16, chars)).toString(16).slice(-chars).toUpperCase();
}
/* eslint-enable */

const Hello = () => {
  const createDeviceLine = (device: HID.Device, index: number) => {
    return (
      <tr key={index}>
        <td>0x{decimalToHex(device.vendorId, 4)}</td>
        <td>0x{decimalToHex(device.productId, 4)}</td>
        <td>0x{decimalToHex(device.usagePage!, 4)}</td>
        <td>0x{decimalToHex(device.usage!, 4)}</td>
        <td>{device.manufacturer}</td>
        <td>{device.product}</td>
        <td>{device.serialNumber}</td>
        <td>{device.path}</td>
      </tr>
    );
  };

  return (
    <div>
      <h1>Hello from electron-hid-test-erb</h1>

      <div>
        We are using NodeJs {process.versions.node},
        Chrome {process.versions.chrome},
        and Electron {process.versions.electron}.
      </div>

      <h2> HID Device List </h2>

      <table>
        <thead>
          <tr>
            <th>vendorId</th>
            <th>productId</th>
            <th>usagePage</th>
            <th>usage</th>
            <th>manufacturer</th>
            <th>product</th>
            <th>serialNumber</th>
            <th>path</th>
          </tr>
        </thead>
        <tbody>{devices.map(createDeviceLine, this)}</tbody>
      </table>

      <h2> HID Device List (JSON) </h2>
      <pre>
      {JSON.stringify(HID.devices(), null, '  ')}
      </pre>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
