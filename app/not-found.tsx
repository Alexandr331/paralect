'use client'

import { Button, Flex, Image, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function NotFound() {

    const router = useRouter()

    return (
        <Flex 
          h={'100%'}
          justify={'center'}
          align={'center'}
          direction={'column'}
        >
          <Image mb={48} width={656} src="./assets/404.svg" alt="not-found"/>
          <Text mb={16} size="lg" fw={600}>We can&rsquo;t find the page you are looking for</Text>
          <Button bg={'#9854F6'} onClick={() => router.push('/')}>Go Home</Button>
        </Flex>
    )
}
