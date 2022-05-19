import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ListGroup } from "react-bootstrap";
import { Context } from '..';

const BalanceBar = observer(() => {
  const { money } = useContext(Context);
  return (
    <>
      <ListGroup>
        {
          money.balance.map((el, index) => 
            <ListGroup.Item key={el.ID} variant={index % 2 === 0 ? 'primary' : 'light'}>{`${el.sum === null ? 0 : el.sum} ${el.currency}`}</ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
});

export default BalanceBar;