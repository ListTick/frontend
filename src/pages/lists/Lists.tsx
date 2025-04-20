import { apiService } from '../../api/apiService.ts';

const Lists = () => {


  return <div>
    <span className="landingPage__content--login" onClick={() => apiService.getData('/shopping-lists')}>
          Login / Register
        </span>
  </div>;
};

export default Lists;
