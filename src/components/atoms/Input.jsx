import style from "../../styles/Input.module.css";

export default function Input({ children, ...props }) {
  return (
    <input className={style.input} {...props}/>
  );
}