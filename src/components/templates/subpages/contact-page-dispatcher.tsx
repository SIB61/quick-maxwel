"use client";

import { TerminalContact } from "../terminal/terminal-contact";
import { SwissContact } from "../swiss/swiss-contact";
import { AuroraContact } from "../aurora/aurora-contact";
import { BentoContact } from "../bento/bento-contact";
import { FancyContact } from "../fancy/fancy-contact";
import { SimpleContact } from "../simple/simple-contact";

export default function ContactPageDispatcher({
  handle,
  templateId,
}: {
  handle: string;
  templateId: string;
}) {
  if (templateId === "developer_terminal") {
    return <TerminalContact handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissContact handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraContact handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoContact handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyContact handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleContact handle={handle} />;
  }

  return <SimpleContact handle={handle} />;
}
