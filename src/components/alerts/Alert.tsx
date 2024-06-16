import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { AlertType } from "../../types/types";

/**
 * Renders an alert component on the page.
 * This function returns a JSX element representing an alert, including an icon and a message area.
 * @returns A JSX element for displaying an alert.
 */

export default function Alert() {
  const alert: AlertType = useSelector(
    (state: RootState) => state.alert.value
  );

  return (
    <div className="alert">
      <div className="icon">
        <span className="material-symbols-outlined">{alert?.icon}</span>
      </div>
      <div className="message">{alert?.message}</div>
    </div>
  );
}
