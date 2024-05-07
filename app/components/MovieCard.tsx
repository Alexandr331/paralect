'use client'

import { Box, Flex, Group, Text } from "@mantine/core";
import { IconStarFilled } from '@tabler/icons-react';
import { genres } from "../genres";
import Link from "next/link";
import RateBtn from "./RateBtn";

const MovieCard = ({movie}: any) => {
  
    const genre: string[] = []
    genres.filter(el => movie.genre_ids?.forEach((gen: any) => {
        el.value == gen ? genre.push(el.label) : genre;
        
    }));
    
    return (
        <Group  h={226} key={movie?.id} className="movie-card" p={24}>
          <Link href={`/movie/${movie?.id}`} style={{display: 'flex', width: '100%', gap: '16px'}}>
            <img width={119} height={178.5} src={movie?.poster_path === null ? "./assets/placeholder-post.jpg" : `http://media.themoviedb.org/t/p/original/${movie.poster_path}`} alt="poster" />
            <Flex 
              w={"60%"}
              justify="flex-start"
              align="flex-start"
              direction="column"
              wrap="nowrap"
            >
              <Text c={'#9854F6'} fw={600} size="xl">{movie?.original_title}</Text>
              <Text mb={4} c={'#7B7C88'} fw={400} size="md">{movie?.release_date.slice(0, 4)}</Text>
              <Group gap={4} >
                <IconStarFilled color="#FAB005"/>
                <Text mr={4} c={'#000000'} fw={600} size="md">{parseFloat(movie?.vote_average).toFixed(1)}</Text>
                <Text c={'#7B7C88'} fw={400} size="md">{'(' + movie?.vote_count + ')'}</Text>
              </Group>
                <Box mt={'auto'} style={{display: 'flex', fontSize: '12px', color: 'grey'}}>
                  Genres:&nbsp; <Text size="xs" c={'#000000'}>{genre.join(', ')}</Text>
                </Box>
            </Flex>
          </Link>
          <RateBtn movie={movie}/>
        </Group>
    )
}


export default MovieCard