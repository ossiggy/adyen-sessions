const Results = ({ result, error }) => {
  let message;

  if(result) {
    message = result.resultCode;
  } else if (error) {
    message = error.message;
  }

  return <div>{message}</div>;
}

export default Results;