"use client";

import { useCombobox, Combobox, InputBase, Input } from "@mantine/core";

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
}: CourseFilterCombobox<TValue>) {
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
            getValueLabel(value)
          ) : (
            <Input.Placeholder>{placeholder}</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Option value={""}>-</Combobox.Option>
          {options.map((item) => (
            <Combobox.Option value={item as string} key={item as string}>
              {getValueLabel(item)}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
