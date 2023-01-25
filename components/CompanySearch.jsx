import { Autocomplete, Group, Image, Text } from "@mantine/core";
import React, { useState, useEffect, forwardRef } from "react";
import { useClickOutside, useDebouncedValue } from "@mantine/hooks";

const AutoCompleteItem = forwardRef(
  ({ name, domain, logo, ...others }, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Image width={30} fit="contain" src={logo} />
          <div>
            <Text>{name}</Text>
            <Text size="xs" color="dimmed">
              {domain}
            </Text>
          </div>
        </Group>
      </div>
    );
  }
);

function CompanySearch({ form }) {
  const [data, setData] = useState([]);

  const [debounced] = useDebouncedValue(form.values.company, 500);

  useEffect(() => {
    if (!form.isTouched() || !form.values.company) {
      return;
    }
    fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${form.values.company}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLEAR_BIT_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          item.value = item.name;
        });
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [debounced]);

  return (
    <Autocomplete
      itemComponent={AutoCompleteItem}
      dropdownPosition="bottom"
      onItemSubmit={(item) => {
        form.setFieldValue("logo", item.logo);
        // form.setValues({
        //   logo: item.logo,
        //   // company: item.name,
        // });
      }}
      label="Company"
      placeholder="Search for company"
      data={data}
      {...form.getInputProps("company")}
    />
  );
}

export default CompanySearch;
