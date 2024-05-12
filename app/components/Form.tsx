import { Button, Grid, Group, NumberInput, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import InputBox from "./InputBox";
import { genres } from "../genres";
import { YearPickerInput } from "@mantine/dates";
import { Dispatch, SetStateAction } from "react";
import { IconSearch } from "@tabler/icons-react";
import { ISort } from "../lib/interfaces";


const Form = ({
  heading, handleSearch, setLoading,
}: {
  heading: string,
  handleSearch: (query: ISort) => void,
  setLoading: Dispatch<SetStateAction<boolean>>
}) => {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          'primary_release_year': null,
          'with_genres': null,
          'vote_averagegte': null,
          'vote_averagelte': null,
          'original_title': null,
        },
      });
    
      return (
        <form onSubmit={form.onSubmit((values) => handleSearch(values))}>
          <Group display={'flex'} >
            <Group justify="space-between" w={'100%'} mb={40}>
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
          <Grid>
            <Grid.Col span={{base: 12, md: 3,  sm: 6}}>
              <InputBox label="Genres">
                <Select 
                  data={[...genres]}
                  placeholder="Select genre"
                  clearable
                  key={form.key('with_genres')}
                  {...form.getInputProps('with_genres')}
                  />
              </InputBox>
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 3,  sm: 6}}>
              <InputBox label="Release year">
                <YearPickerInput
                  clearable
                  placeholder="Select release year"
                  key={form.key('primary_release_year')}
                  {...form.getInputProps('primary_release_year')}
                />
              </InputBox>
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 3,  sm: 6}}>
              <InputBox label="Rating">
                <Group grow>
                  <NumberInput
                    placeholder="From"
                    min={0}
                    max={10}
                    key={form.key('vote_averagegte')}
                    {...form.getInputProps('vote_averagegte')}
                  />
                  <NumberInput
                    placeholder="To"
                    min={0}
                    max={10}
                    key={form.key('vote_averagelte')}
                    {...form.getInputProps('vote_averagelte')}
                  />
                </Group>
              </InputBox>
            </Grid.Col>
            <Grid.Col m={'auto'} ta={'center'} flex={'inline'} span={{base: 12, md: 3, sm: 6}}>
              <Button p={0} variant="transparent" c={'#7B7C88'} fz={'sm'}
                onClick={() => {
                  form.reset()
                }}
              >Reset filter</Button>
            </Grid.Col>
            </Grid>
          </Group>
        </form>
      );
}

export default Form