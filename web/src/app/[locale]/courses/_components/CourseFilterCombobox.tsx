"use client";

import { noData } from "@/constants/commons";
import { useScopedI18n } from "@/locales/client";
import {
  Combobox,
  Input,
  InputBase,
  ScrollAreaAutosize,
  useCombobox,
} from "@mantine/core";

export type CourseFilterCombobox<TValue> = {
  field: "country" | "state" | "city" | "sector";
  value?: TValue;
  options: TValue[];
  placeholder: string;
  getValueLabel?: (value: TValue) => string;
  onSubmit: (
    field: "country" | "state" | "city" | "sector",
    newValue: TValue
  ) => void;
};

export function CourseFilterCombobox<TValue>({
  field,
  value,
  options,
  placeholder,
  getValueLabel = (val: TValue) => String(val),
  onSubmit,
}: Readonly<CourseFilterCombobox<TValue>>) {
  const pageT = useScopedI18n("coursesPage");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(newValue) => {
        onSubmit(field, newValue as TValue);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
        >
          {value ? (
            value === noData ? (
              pageT("labels.noData")
            ) : (
              getValueLabel(value)
            )
          ) : (
            <Input.Placeholder>{placeholder}</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <ScrollAreaAutosize type="scroll" mah={200}>
          <Combobox.Options>
            <Combobox.Option value={""}>-</Combobox.Option>
            {options.map((item) => (
              <Combobox.Option
                value={item === "" ? noData : (item as string)}
                key={item as string}
              >
                {item === "" ? pageT("labels.noData") : getValueLabel(item)}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </ScrollAreaAutosize>
      </Combobox.Dropdown>
    </Combobox>
  );
}
