import HashLoader from "react-spinners/HashLoader";

function Loader() {
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-white">
      <HashLoader color="#F2E1D9" loading size={50} />
    </div>
  );
}

export default Loader;
