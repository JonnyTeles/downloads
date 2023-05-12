export default function Background(props: any) {

  return (
    <div
      className={`${props.className} 
      `}
    >
      {props.children}
    </div>
  );
}
