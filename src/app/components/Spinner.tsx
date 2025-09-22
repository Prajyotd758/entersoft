export function SmallSpinner() {
  return (
    <div className="absolute h-screen w-screen flex justify-center items-center">
      <div className={`spinner-container flex justify-evenly items-center`}>
        <div className={`small-spinner flex justify-evenly items-center`}></div>
      </div>
    </div>
  );
}
