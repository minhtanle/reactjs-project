export default function Input({ label = "", type = "", id = "", value = ""}) {
  return <input id={id} label={label} type={type} value={value}></input>;
}
