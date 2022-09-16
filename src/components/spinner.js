import "./spinner.css";

const Spinner = () => (
  <div class="lds-spinner">
    {[...Array(12)].map((_, i) => (
      <div key={i} />
    ))}
  </div>
);

export default Spinner;
