export const Cat = (props: any) => {
  return (
    <div>
      <h1>Cat</h1>
      <div>{props.str ? props.str : '..'}</div>
    </div>
  );
};
