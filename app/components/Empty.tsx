import { Flex, Image, Text } from "@mantine/core"
import React from "react"



const Empty = ({text, src, children}: {text: string, src: string, children?: React.ReactNode}) => {
    return (
        <Flex
          justify={'center'}
          align={'center'}
          direction={'column'}
        >
          <Image h={252} w={310} src={src} alt="watchlist"/>
          <Text mb={16} size="lg" fw={600}>{text}</Text>
          {children}
        </Flex>
    )
}

export default Empty