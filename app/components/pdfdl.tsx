import { FaFilePdf } from 'react-icons/fa';

export default function Pdfdl() {
  return (
    <button className="btn">
      <FaFilePdf size={24} style={{display: "inline-block"}}/>
      as PDF
    </button>
  )
}