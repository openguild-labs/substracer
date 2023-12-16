import { useHistory } from 'react-router-dom';

import { Button, Result } from 'antd';

type Props = any;

const NotFoundScreen = (props: Props) => {
  const history = useHistory();

  return (
    <div>
      <Result
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => history.push('/')} type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundScreen;
