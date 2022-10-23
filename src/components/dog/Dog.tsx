export const Dog = (props: any) => {
  return (
    <div>
      <h1>Dog</h1>
      <div>{props.str ? props.str : '..'}</div>
    </div>
  );
};
