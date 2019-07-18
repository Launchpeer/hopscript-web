import Parse from 'parse';

const subscribeToClass = (props) => {
  const query = new Parse.Query(props.className);

  if (props.include) {
    props.include.forEach((inc) => {
      query.include(inc);
    });
  }

  if (props.columnName) query.equalTo(props.columnName, props.columnSelector);
  const subscription = query.subscribe();
  subscription.then(
    'open', (res) => {
      console.log("open");
      props.callback(res);
    },
    (err) => { console.log(err); }
  );
  subscription.then(
    'create', (res) => {
      console.log("create");
      props.callback(res);
    },
    (err) => { console.log(err); }
  );
  subscription.then(
    'update', (res) => {
      console.log("update" ,res);
      props.callback(res);
    },
    (err) => { console.log(err); }
  );
  subscription.then(
    'delete', (res) => {
      console.log("delete");
      props.callback(res);
    },
    (err) => { console.log(err); }
  );
  subscription.then(
    'enter', (res) => {
      console.log("enter");
      props.callback(res);
    },
    (err) => { console.log(err); }
  );
  subscription.then(
    'leave', (res) => {
      console.log("leave");
      props.callback(res);
    },
    (err) => { console.log(err); }
  );
};

export default subscribeToClass;
