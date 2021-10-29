import HashLoader from "react-spinners/HashLoader";

function Loader({ className, color }) {
  return (
    <div className={className}>
      <HashLoader color={color} loading size={50} />
    </div>
  );
}

export default Loader;
