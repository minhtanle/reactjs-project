export default function Button({
  type,
  size = "",
  style = "",
  btnStyle = "default",
  className = "",
  children,
  isDisable,
  isOutline,
  onClick,
}) {
  const outline = isOutline ? "btn-outline" : "";
  const btnSize = size ? "btn-" + size : ""
  
  return (
    <button
      type={type}
      style={{ style }}
      disabled={isDisable}
      className={`btn btn-${btnStyle} ${outline} ${btnSize} ${className} py-1.5`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
