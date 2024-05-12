
import { Button, Group, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ISort } from "../lib/interfaces";
import { useForm } from "@mantine/form";



const WatchedSearch = (
  {heading, search}: {heading: string, search: (query: ISort) => void}
) => {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      'original_title': null,
    },
  });
  
  return (
    <form onSubmit={form.onSubmit((values) => search(values))}>
      <Group w={'100%'} justify="space-between" mb={40}>
              <Title order={1}>{heading}</Title>
                <Group id="search" className="search-form"  bg={'#fff'} p={'8px 12px'} w={490} display={'flex'} justify="space-between" style={{borderRadius: '8px'}}>
                  <TextInput 
                    leftSection={<IconSearch size={16}/>}
                    variant="unstyled"
                    placeholder="Search movie title" 
                    type="text"  
                    key={form.key('original_title')}
                    {...form.getInputProps('original_title')}
                  />
                  <Button 
                    variant="filled" 
                    color="grape" 
                    type="submit"
                  >
                    Search
                  </Button>
                </Group>
    </Group>
    </form>
  )
}

export default WatchedSearch