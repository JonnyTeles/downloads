export default function Title(props: any) {
    return (
      <div className="flex flex-col justify-center">
        <h1 className="px-5 py-2 text-2xl font-bold text-purple-700">{props.children}</h1>
        <h3 className="px-5 py-2 text-purple-500">OBS: Por enquanto só está funcionando download de clipes da twitch...</h3>
        <hr className="border-2 border-purple-500" />
      </div>
    );
  }
  