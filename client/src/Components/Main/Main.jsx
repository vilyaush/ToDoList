import React, {useEffect} from 'react'
import Todo from '../Todo/Todo'
import { useSelector, useDispatch } from 'react-redux';
import { getTodoThunk } from '../../redux/actions/doing';

function Main() {
  const doings = useSelector((state) => state.doings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoThunk());
  }, []);

  return (
    <div>
   <Todo/>
   {doings.map((el) => (
     <div className="doingList" key={el.id}>
       <p>{el.title} <input type='checkbox'/><button>Редактировать</button></p>
       </div>
      ))}
    </div>
  )
}

export default Main