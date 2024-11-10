import { useShallow } from "zustand/shallow";
import { BANK_ACCOUNT } from "../const";
import { useAppStore } from "../stores/appStore";
import { mitgliedsnummerGen } from "../utils/mitgliedsnummerGen";

export function BankAccountList() {
  const [formItems] = useAppStore(useShallow((state) => [state.formItems]));

  function getItems() {
    const items = [];

    const nachname = formItems.find((item) => item.key === "Nachname")?.value;
    const vorname = formItems.find((item) => item.key === "Vorname")?.value;

    for (const [key, value] of Object.entries(BANK_ACCOUNT)) {
      if (
        key === "Verwendungszweck" &&
        nachname &&
        nachname !== "" &&
        vorname &&
        vorname !== ""
      ) {
        items.push(
          <li key={key}>
            {key}: {mitgliedsnummerGen(vorname, nachname)}
          </li>
        );
      } else {
        items.push(
          <li key={key}>
            {key}: {value}
          </li>
        );
      }
    }

    return items;
  }

  return <ul>{getItems()}</ul>;
}
