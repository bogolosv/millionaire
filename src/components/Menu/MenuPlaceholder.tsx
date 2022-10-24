import {FC} from "react";
import {OptionButton} from "../OptionButton";

export const MenuPlaceholder: FC = () => {
    const items = [...Array(12).keys()];

    return (
      <>
          {items.map((item, index) => {
              return (
                  <OptionButton key={`key${index}`} isLoading size='small'/>
              )
          })}
      </>
    );
}