import classes from "./Button.module.css";

function BtnModule() {
  return (
    <div>
      <h2>Button Using CSS Module</h2>
      <button className={classes.btnModule}>Click me</button>
    </div>
  );
}

export default BtnModule;
