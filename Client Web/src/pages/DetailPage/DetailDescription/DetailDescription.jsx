import { Button } from "react-bootstrap";
import classes from "./DetailDescription.module.css";

const DetailDescription = (props) => {
  const longDes = props.item.long_desc || "";
  // Convert long_desc to array
  const arr = longDes.split("\n");
  return (
    <div className={classes.description}>
      <Button variant="dark">DESCRIPTION</Button>
      <h4>PRODUCT DESCRIPTION</h4>
      {arr.map((x, index) => (
        <p key={index}>{x}</p>
      ))}
    </div>
  );
};
export default DetailDescription;
