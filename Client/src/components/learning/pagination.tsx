import { useNavigate } from 'react-router-dom';
import '../../css/learning/learning.css';

function Pagination({
  clicked,
  leftName,
  rightName,
  leftLink,
  rightLink,
  children,
}: {
  clicked: boolean;
  leftName: string;
  rightName: string;
  leftLink: string;
  rightLink: string;
  children: any;
}) {
  const navigate = useNavigate();
  return (
    <div className="page-layout">
      <div className="pagination-left">
        <button
        disabled={clicked}
          className="scroll-learning"
          onClick={() => {
            navigate(`/${leftLink}`)
             }}
        >
          <h3 className='bounce bounce-left'>↓</h3>
          <h4>{leftName} </h4>
        </button>
      </div>
      {children}
      <div className="pagination-right">
        <button
          disabled={clicked}
          className={clicked ? "scroll-learning disabled" : "scroll-learning"}
          onClick={() => {
            navigate(`/${rightLink}`);
          }}
        >
          <h3 className='bounce bounce-right'>↓</h3>
          <h4>{rightName}</h4>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
