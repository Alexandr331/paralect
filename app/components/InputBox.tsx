import { Flex, Input, Text } from "@mantine/core";
import { ReactElement } from "react";

const InputBox = ({
    children,
    label,
  }: Readonly<{
    children: React.ReactNode;
    label: string
  }>) => {
    return (
        <Input.Wrapper miw={150} label={label} size="lg" mb={24}>
            {children}
        </Input.Wrapper>
    )
  }

export default InputBox