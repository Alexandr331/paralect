
import { Flex, Group, NumberFormatter, Table, Text, Image } from "@mantine/core";
import { IconStarFilled } from '@tabler/icons-react';
import RateBtn from "./RateBtn";
import { useEffect, useState } from "react";


const MovieCardDetail = ({movie}: any) => {

  const [durationFormt, setDurationFormat] = useState<string>()

    const genreArray: string[] = []

    movie.genres.forEach((genre: any) => {
      genreArray.push(genre.name)
    })
    
    const formatDuration = (mins: number) => {
      let hours = Math.trunc(mins/60)
      let minutes = mins%60
      let formatStr = `${hours}h ${minutes}m`
      setDurationFormat(formatStr)
    }
    
    useEffect(() => {
      formatDuration(movie.runtime)
    }, [movie])

    return (
      
        <Group mb={20} key={movie?.id} className="movie-card" p={24}>
          <Image h={375} w={250} src={movie?.poster_path === null ? "./assets/placeholder-post.jpg" : `http://media.themoviedb.org/t/p/original/${movie.poster_path}`} alt="poster" />
          <Flex 
            justify="space-between"
            direction="column"
            wrap="nowrap"
            style={{alignSelf: 'normal'}}
          >
            <Text c={'#9854F6'} fw={600} size="xl">{movie?.original_title}</Text>
            <Text mb={4} c={'#7B7C88'} fw={400} size="md">{movie?.release_date.slice(0, 4)}</Text>
            <Group gap={4} >
              <IconStarFilled color="#FAB005"/>
              <Text mr={4} c={'#000000'} fw={600} size="md">{parseFloat(movie?.vote_average).toFixed(1)}</Text>
              <Text c={'#7B7C88'} fw={400} size="md">{'(' + movie?.vote_count + ')'}</Text>
            </Group>
              <Table fz={16} withRowBorders={false}>
                <Table.Tbody>
                  <Table.Tr key='Duration'>
                    <Table.Td c={'grey'}>Duration</Table.Td>
                    <Table.Td>{durationFormt}</Table.Td>
                  </Table.Tr>
                  <Table.Tr key='Premiere'>
                    <Table.Td c={'grey'}>Premiere</Table.Td>
                    <Table.Td>{movie?.release_date.slice(0, 4)}</Table.Td>
                  </Table.Tr>
                  <Table.Tr key='Budget'>
                    <Table.Td c={'grey'}>Budget</Table.Td>
                    <Table.Td><NumberFormatter style={{color: '#000'}} prefix="$ " value={movie.budget} thousandSeparator /></Table.Td>
                  </Table.Tr>
                  <Table.Tr key='Gross worldwide'>
                    <Table.Td c={'grey'}>Gross worldwide</Table.Td>
                    <Table.Td><NumberFormatter style={{color: '#000'}} prefix="$ " value={movie.revenue} thousandSeparator /></Table.Td>
                  </Table.Tr>
                  <Table.Tr key='Genres'>
                    <Table.Td c={'grey'}>Genres:&nbsp;</Table.Td>
                    <Table.Td>{genreArray.join(', ')}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
          </Flex>
          
          <RateBtn movie={movie}/>
          
        </Group>

    )
}

export default MovieCardDetail