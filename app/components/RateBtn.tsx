'use client'

import { ActionIcon, Button, Flex, Modal, Rating, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconStarFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { MovieDetail } from "../page";

const RateBtn =({movie}: {movie: MovieDetail}) => {
  const [watched, setWatched] = useState<MovieDetail | undefined>()
  const [rate, setRate] = useState<number>()
  const [ratedMovie, setRatedMovie] = useState<MovieDetail[] | undefined>()
  const [opened, { open, close }] = useDisclosure(false);

  const watchedMovie = () => {
    movie.user_rate = rate
    setRatedMovie([movie])
    localStorage.setItem('ratedMovies', JSON.stringify([...ratedMovie || [], movie]))
  }

  useEffect(() => {
    if (localStorage.getItem('ratedMovies')) {
      const ratedMoviesList = JSON.parse(localStorage.getItem('ratedMovies') || '')
      setRatedMovie(ratedMoviesList)
      const ratedMovie = ratedMoviesList.find((el: MovieDetail) => el.id === movie.id)
      setWatched(ratedMovie)
      setRate(ratedMovie?.user_rate)
    }
  }, [movie.id])
    

    return (
      <>
            <Modal.Root  opened={opened} onClose={close} size="auto" centered style={{borderRadius: '8px', fontWeight: '700'}}>
            <Modal.Overlay />
            <Modal.Content>
              <Modal.Header>
                <Modal.Title fw={700}>Your rating</Modal.Title>
                <Modal.CloseButton />
              </Modal.Header>
              <hr />
              
                <Modal.Body>
                  <Flex
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    wrap="nowrap"
                    bg={'#fff'}
                    style={{borderRadius: '8px'}}
                  >
                    <Text mb={16} size="md" fw={700}>{movie.original_title}</Text>
                    <Rating mb={16} size={"xl"} count={10} value={rate} onChange={setRate}/>
                    <Button onClick={watchedMovie} bg={"#9854F6"}>Save</Button>
                  </Flex>
                </Modal.Body>
              </Modal.Content>
          </Modal.Root>
        <ActionIcon onClick={open} size={"xl"} className="watched" variant="transparent" aria-label="Settings">
          <IconStarFilled color={rate ? '#9854F6' : '#D5D6DC'} width={28} />
          <Text size="16" fw={600} c={"#000"}>{rate ?? ''}</Text>
        </ActionIcon>
      </>
    )
}

export default RateBtn