import { Box, Button, Grid, Group, NumberInput, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import TitleSearch from "./TitleSearch";
import InputBox from "./InputBox";
import { genres } from "../genres";
import { YearPickerInput } from "@mantine/dates";
import { Dispatch, SetStateAction, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { searchMovie } from "../actions";
import { IMovieDetail, ISort } from "../interfaces";

const Form = ({
  heading, setMovies, setPageTotal, setPageValue, setLoading,
}: {
  heading: string,
  setMovies: Dispatch<SetStateAction<IMovieDetail[] | undefined>>
  setPageTotal: Dispatch<SetStateAction<number | undefined>>
  setPageValue: Dispatch<SetStateAction<number>>
  setLoading: Dispatch<SetStateAction<boolean>>
}) => {

  const [rateFrom, setRateFrom] = useState<number | string>(0)
  const [rateTo, setRateTo] = useState<number | string>(0)

    const form = useForm<ISort>({
        mode: 'uncontrolled',
        initialValues: {
          'primary_release_year': undefined,
          'with_genres': undefined,
          'vote_averagegte': undefined,
          'vote_averagelte': undefined,
          'original_title': undefined,
        },
      });

      const search = async (values: typeof form.values, page?: number) => {
        await searchMovie(values, page ?? 1).then(data => {
          setMovies(data.results)
          setPageTotal(data.total_pages)
          setPageValue(data.page)
          setLoading(false)
        })
        console.log(values);
      }
    
      return (
        <form onSubmit={form.onSubmit((values) => search(values))}>
          <Group display={'flex'} w={'100%'}>
            <Group justify="space-between" mb={40}>
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
                    min={Number(rateFrom)}
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