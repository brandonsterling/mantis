import React from "react";

function AccordionItem(id, control, content) {
  return (
    <Accordion.Item value={id}>
      <Accordion.Control>{control}</Accordion.Control>
      <Accordion.Panel>{content}</Accordion.Panel>
    </Accordion.Item>
  );
}

export default AccordionItem;
