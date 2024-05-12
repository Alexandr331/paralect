
import { Button, Group, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Dispatch, SetStateAction, } from "react";
import { ISort } from "../interfaces";



const TitleSearch = (
  {title, setQueryStr, queryStr, search}: {title: string, setQueryStr: Dispatch<SetStateAction<{ original_title: string; }>>, queryStr: {}, search: (query: ISort) => void}
) => {

  return (
    <Group justify="space-between" mb={40}>
      <Title order={1}>{title}</Title>
      <Group id="search" className="search-form"  bg={'#fff'} p={'8px 12px'} w={490} display={'flex'} justify="space-between" style={{borderRadius: '8px'}}>
        <TextInput 
          leftSection={<IconSearch size={16}/>}
          variant="unstyled"
          placeholder="Search movie title" 
          type="text"  
          onChange={(e) => {
            setQueryStr({'original_title': e.target.value})
          }}
        />
        <Button 
          variant="filled" 
          color="grape" 
          onClick={() => {
            if (queryStr) { 
              search(queryStr)
            }
          }}
        >
          Search
        </Button>
      </Group>
    </Group>
  )
}

export default TitleSearch